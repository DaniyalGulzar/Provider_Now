"use client";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import Button from "../Button";
import { useSession } from "next-auth/react";
import axios from "axios";
import InputField from "../InputField";
import { useStripe, useElements, CardElement, Elements } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { Circles } from "react-loader-spinner";
import withAuth from '@/app/auth/auth/authHOC'

const stripePromise = loadStripe("pk_test_51Q4k3tA3UuIWAPiNhvNZ18C2ORa5YfhtRVN34mhWwp81gywCfpMGzcoCHoklIn6g7BodtMValoLccaBGiVhTy3Jc00vbBCez6l");

const Paymentoption: React.FC = ({
}) => {
  const [stepper, setStepper] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentCheck, setPaymentCheck] = useState(true);
  const [stepperInternal, setStepperInternal] = useState(1);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { data: session }: any = useSession();

  const [formData, setFormData] = useState(
    {
      reason: "",
      issue_time: "",
      support_before: "",
      package_name: "",
      amount: 2000,
      fnf: [
        { first_name: "", last_name: "", email: "" }
      ]
    }
  );

  const removeFNF = (index: any) => {
    setFormData((prevData) => {
      const updatedFNF = [...prevData.fnf];
      updatedFNF.splice(index, 1);
      return {
        ...prevData,
        fnf: updatedFNF,
      };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStepper(3);
  };

  const handleGetStartedClick = (name: any) => {
    setFormData({
      ...formData,
      package_name: name,
    });
    if (name == 'FNF')
      setStepperInternal(2)
    else
      setStepper(2);
  };

  const handleSubmit = (name: any) => {
    setStepper(2);
  };

  const handleBack = () => {
    if (stepperInternal === 2)
      setStepperInternal(1)
    else
      setStepper(1);
  }

  useEffect(() => {
    if (!session) return;

    const fetchData = async () => {
      try {
        const token = session.token;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/user/list?type=provider`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session]);

  useEffect(() => {
    if (!session) return;

    const fetchCheck = async () => {
      try {
        const token = session.token;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/user/has-subscription`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.result === 1) {
          setPaymentCheck(false)
          setStepper(2);

        }
        else {
          setPaymentCheck(true)
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchCheck();
  }, [session]);

  const handleSubmitStripe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("Card element not found");
      setLoading(false);
      return;
    }

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
    } else {
      handleSubmitFinal(token.id);
    }

    setLoading(false);
  };

  const handleChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const newFNF = [...formData.fnf];
    newFNF[index] = {
      ...newFNF[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      fnf: newFNF,
    });
  };

  const handleSubmitFinal = async (stripeToken: string) => {
    setLoading(true);

    try {
      const token = session.token;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/virtual-request/store`,
        { ...formData, stripe_token: stripeToken },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.setItem('submissionTime', new Date().toISOString());
      toast.success(response.data.message);
      router.push(`/provider-invitation/${response.data.result.id}`);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };  

  const addFNF = () => {
    setFormData({
      ...formData,
      fnf: [...formData.fnf, { first_name: "", last_name: "", email: "" }],
    });
  };

  return (
    <div>
      <Circles
        height="80"
        width="80"
        color="#491161 "
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass="loading-spinner-overlay"
        visible={loading}
      />
      <h2 className="text-2xl xl:mx-8 lg:mx-8 md:mx-8 mx-3 font-bold mb-4 mt-5"> {(stepperInternal === 2 && stepper == 1) ? <span>Add Friends and Family(FnF)</span> : <span>Request a Provider Now</span>}</h2>
      <div className="shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] rounded-md xl:mx-8 lg:mx-8 md:mx-8 mx-3 bg-white">
        {stepper == 1 && (
          <>
            {
              stepperInternal == 1 ?
                <div className="rounded-md p-5">
                  <h3 className="flex justify-center text-2xl font-bold text-left mb-3">
                    {"Select your payment option"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                    <div className="flex justify-center">
                      <div className="border shadow-md p-4 rounded-lg bg-gray-100 w-full text-left">
                        <h4 className="font-bold text-xl mb-2">One Time Consultation</h4>
                        <span className="font-bold text-3xl mb-4">
                          $99<span className="text-gray-500 text-sm">/month</span>
                        </span>
                        <hr className="border-gray-300 mt-2" />
                        <h5 className="font-semibold text-lg mt-1">Features:</h5>
                        <ul className="pl-0">
                          <li className="flex items-center">
                            <FaCheck className="text-black font-bold mr-2" />
                            Lorem ipsum sun ediot
                          </li>
                          <li className="flex items-center">
                            <FaCheck className="text-black font-bold mr-2" />
                            Lorem ipsum sun ediot
                          </li>
                          <li className="flex items-center">
                            <FaCheck className="text-black font-bold mr-2" />
                            Lorem ipsum sun ediot
                          </li>
                        </ul>
                        <Button
                          onClick={() => handleGetStartedClick("OTP")}
                          className="bg-[#631681] border border-[#631681] text-white font-semibold px-8 py-2 rounded w-full"
                        >
                          Get Started
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="border shadow-md p-4 rounded-lg bg-gray-100 w-full text-left">
                        <h4 className="font-bold text-xl mb-2">Subscription 4 months</h4>
                        <span className="font-bold text-3xl mb-4">
                          $149<span className="text-gray-500 text-sm">/month</span>

                        </span>
                        <hr className="border-gray-300 mt-2" />
                        <h5 className="font-semibold text-lg mt-1">Features:</h5>
                        <ul className="pl-0">
                          <li className="flex items-center">
                            <FaCheck className="text-black font-bold mr-2" />
                            Lorem ipsum sun ediot
                          </li>
                          <li className="flex items-center">
                            <FaCheck className="text-black font-bold mr-2" />
                            Lorem ipsum sun ediot
                          </li>
                          <li className="flex items-center">
                            <FaCheck className="text-black font-bold mr-2" />
                            Lorem ipsum sun ediot
                          </li>
                        </ul>
                        <Button
                          onClick={() => handleGetStartedClick("4MS")}
                          className="bg-[#631681] border border-[#631681] text-white font-semibold py-2 rounded w-full"
                        >
                          Get Started
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="border shadow-md p-4 rounded-lg bg-gray-100 w-full text-left">
                        <h4 className="font-bold text-xl mb-2">Subscription 12 months</h4>
                        <span className="font-bold text-3xl mb-4">
                          $149<span className="text-gray-500 text-sm">/month</span>

                        </span>
                        <hr className="border-gray-300 mt-2" />
                        <h5 className="font-semibold text-lg mt-1">Features:</h5>
                        <ul className="pl-0">
                          <li className="flex items-center">
                            <FaCheck className="text-black font-bold mr-2" />
                            Lorem ipsum sun ediot
                          </li>
                          <li className="flex items-center">
                            <FaCheck className="text-black font-bold mr-2" />
                            Lorem ipsum sun ediot
                          </li>
                          <li className="flex items-center">
                            <FaCheck className="text-black font-bold mr-2" />
                            Lorem ipsum sun ediot
                          </li>
                        </ul>
                        <Button
                          onClick={() => handleGetStartedClick("12MS")}
                          className="bg-[#631681] border border-[#631681] text-white font-semibold py-2 rounded w-full"
                        >
                          Get Started
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="border shadow-md p-4 rounded-lg bg-gray-100 w-full text-left">
                        <h4 className="font-bold text-xl mb-2">Friends & Family Consultation</h4>
                        <span className="font-bold text-3xl mb-4">
                          $199<span className="text-gray-500 text-sm">/month</span>

                        </span>
                        <hr className="border-gray-300 mt-2" />
                        <h5 className="font-semibold text-lg mt-1">Features:</h5>
                        <ul className="pl-0">
                          <li className="flex items-center">
                            <FaCheck className="text-black font-bold mr-2" />
                            Lorem ipsum sun ediot
                          </li>
                          <li className="flex items-center">
                            <FaCheck className="text-black font-bold mr-2" />
                            Lorem ipsum sun ediot
                          </li>
                          <li className="flex items-center">
                            <FaCheck className="text-black font-bold mr-2" />
                            Lorem ipsum sun ediot
                          </li>
                        </ul>
                        <Button
                          onClick={() => handleGetStartedClick("FNF")}
                          className="bg-[#631681] border border-[#631681] text-white font-semibold px-8 py-2 rounded w-full"
                        >
                          Get Started
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <>
                  <form onSubmit={handleSubmit} className="w-full p-4">
                    {formData.fnf.map((fnf, index) => (
                      <div key={index} className="w-full mb-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                          <InputField
                            onChange={(e) => handleChange(e, index)}
                            required={true}
                            name="first_name"
                            placeholder="First Name"
                            value={fnf.first_name}
                            label={`First Name`}
                          />
                          <InputField
                            onChange={(e) => handleChange(e, index)}
                            required={true}
                            name="last_name"
                            placeholder="Last Name"
                            value={fnf.last_name}
                            label={`Last Name`}
                          />
                          <InputField
                            onChange={(e) => handleChange(e, index)}
                            required={true}
                            name="email"
                            placeholder="Email"
                            value={fnf.email}
                            label={` Email`}
                          />
                          {formData.fnf.length > 1 &&
                            <button
                              type="button"
                              onClick={() => removeFNF(index)}
                              className="text-red-500 hover:text-red-700 text-lg font-bold absolute right-0"
                            >
                              ✕
                            </button>}
                        </div>
                      </div>
                    ))}

                    {formData.fnf.length < 4 && (
                      <Button
                        type="button"
                        onClick={addFNF}
                        className="flex ml-auto bg-[#751A9B] text-white h-12 font-semibold hover:bg-purple-700 text-base w-30 py-2 px-4 rounded-md"
                      >
                        Add
                      </Button>
                    )}
                    <div className="flex flex-col md:flex-row justify-center my-4 gap-4 w-full  px-4 md:px-8 lg:px-16"> <Button
                      type="button"
                      onClick={handleBack}
                      className="bg-transparent h-12 border-2 border-[#751A9B] font-bold text-[#751A9B] hover:bg-purple-700 hover:text-white px-4 py-2 rounded w-full md:w-40"
                    >
                      Back
                    </Button>
                      <Button
                        type="submit"
                        className="bg-[#751A9B] text-white h-12 font-semibold hover:bg-purple-700 text-base py-2 px-4 rounded w-full md:w-40"
                      >
                        Next
                      </Button>
                    </div>
                  </form>
                </>
            }
          </>
        )}

        {stepper == 2 && (
          <form
            className="flex flex-col p-5 lg:mx-auto items-center justify-center my-5"
            onSubmit={handleFormSubmit}
          >
            <div className="w-full my-10">
              <h3 className="font-bold text-center mb-2">
                What are your reasons for requesting a virtual consultation?
              </h3>
              <textarea
                id="reason"
                rows={4}
                required={true}
                maxLength={500}
                name="reason"
                className="block p-2.5 w-full text-sm text-black bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type your reason (500 Max Characters)"
                value={formData.reason}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <hr className="w-full" />

            <div className="w-full my-10">
              <h3 className="font-bold text-center mb-2">
                How long have you been experiencing this issue?
              </h3>
              <textarea
                id="issue_time"
                rows={4}
                maxLength={500}
                required={true}
                name="issue_time"
                className="block p-2.5 w-full text-sm text-black bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type your response (500 Max Characters)"
                value={formData.issue_time}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="w-full my-10">
              <h3 className="font-bold text-center mb-2">
                Have you sought support for this issue before?
              </h3>
              <textarea
                id="support_before"
                rows={4}
                required={true}
                maxLength={500}
                name="support_before"
                className="block p-2.5 w-full text-sm text-black bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type your response (500 Max Characters)"
                value={formData.support_before}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <hr className="w-full" />

            <div className="flex flex-col md:flex-row justify-center my-8 gap-4 w-full max-w-4xl px-4 md:px-8 lg:px-16">
              {paymentCheck &&
                <Button
                  type="button"
                  onClick={handleBack}
                  className="bg-transparent h-12 border-2 border-[#751A9B] font-bold text-[#751A9B] hover:bg-purple-700 hover:text-white px-4 py-2 rounded w-full md:w-40"
                >
                  Back
                </Button>
              }

              <Button
                type="submit"
                className="bg-[#751A9B] text-white h-12 font-semibold hover:bg-purple-700 text-base py-2 px-4 rounded w-full md:w-40"
              >
                Next
              </Button>
            </div>
          </form>
        )}
        {stepper == 3 && (
          <div className="p-5 mb-5">
            <div className="rounded-md">
              <h3 className="flex justify-center text-2xl font-bold text-left mt-5 mb-3">
                Pay Now
              </h3>

              <div className="bg-white shadow-lg mb-10 p-5">
                <h2 className="text-xl font-bold mb-4">Price Detail</h2>
                <hr className="my-4 border-gray-300" />
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium text-gray-500">Subtotal</span>
                    <span>$100.00</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium text-gray-500">Tax</span>
                    <span>$10.00</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium text-gray-500">Discount</span>
                    <span>-$5.00</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span className="font-bold">Total Price</span>
                    <span>$105.00</span>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmitStripe} className="space-y-2 mt-5">
                <div className="space-y-2">
                  <InputField
                    name="name"
                    placeholder="Type Your Name"
                    label="Card Holder Name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="card-element" className="block font-bold mb-2">Card Details</label>
                  <div className="border rounded-md p-4 border-gray-300">
                    <CardElement
                      id="card-element"
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="bg-white p-6 mb-5 border-2 border-dotted border-gray-400">
                  <div className="flex flex-col w-full">
                    <p className="font-bold text-gray-700 mb-2">Disclaimer:</p>
                    <p className="text-gray-600">
                      This is a disclaimer text that provides important information about file uploads.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center py-8  gap-4 w-full">
                  <Button onClick={handleBack} className="bg-white border border-[#631681] text-[#631681] font-semibold px-4 py-2 rounded w-40">
                    Back
                  </Button>
                  <Button type="submit" className="bg-[#631681] text-white px-4 py-2 font-semibold rounded w-40" disabled={loading}>
                    {loading ? 'Processing...' : 'Pay Now'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PaymentComWithStripe = () => (
  <Elements stripe={stripePromise}>
    <Paymentoption />
  </Elements>
);

export default withAuth(PaymentComWithStripe,  ['Provider','Member']);