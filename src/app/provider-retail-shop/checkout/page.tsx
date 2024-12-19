"use client";
import React, { useState } from 'react'
import RetailNavbar from '../retailNavbar'
import InputField from '@/components/InputField';
import Image from 'next/image';
import { useElements, CardElement, Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Button from '@/components/Button';
const stripePromise = loadStripe("pk_test_51JbgKqLKjg8KTb9YmocDRtSQcUGvx76ZbKFRiJTrPVpe2vMASGPn4MgNVxnn74a9jxOhJ8SmcAj5y1ZAqXWymU3O00oho504CZ");



const CheckOut: React.FC  = ({}) => {
  const stripe = useStripe();
  const router = useRouter();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { data: session }: any = useSession();
    const [formData, setFormData] = useState({
        full_name: '',
        company_name: '',
        address: '',
        aptflour: '',
        city: '',
        state: '',
        zip_code: '',
        email: '',
        ph_no: '',
        subscribe: false,
        acceptTerms: false,
    })

    const handleCheckboxChange = (e:any) => {
        setFormData({
            ...formData,
            subscribe: e.target.checked,
        });
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const products = [
        {
          id: 1011,
          name: 'ChewAble Tablets',
          image: '/myImages/GlassBottle.svg',
          qty: 2,
          price: 1234.90,
        },
        {
          id: 1012,
          name: 'Vitamin D Capsules',
          image: '/myImages/GlassBottle.svg',
          qty: 1,
          price: 456.75,
        },
        {
          id: 1013,
          name: 'Omega 3 Fish Oil',
          image: '/myImages/GlassBottle.svg',
          qty: 3,
          price: 789.00,
        },
    ];
      
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
        toast.success(response.data.message);
        router.push('/list-provider');
    } catch (error: any) {
        toast.error(error.response.data.message)
    } finally {
        setLoading(false);
    }
    };

  return (
    <div>
        <RetailNavbar />
        <div className='max-w-[90%] mx-auto'>
            <div className='text-2xl text-[#000000] mt-[56px] mb-[40px] font-semibold'>Check Out</div>
                <div className='grid grid-cols-12 gap-5'>
                    <div className='md:col-span-7 col-span-12'>
                        <div className='bg-[#ffffff] rounded-[16px] p-5 border border-[#0000001A]'>
                            <span className='text-[20px] font-semibold text-[#000000]'>Delivery Address</span>
                            <form action="">
                                <div className='mt-4'>
                                    <InputField
                                        name='full_name'
                                        label='Full Name'
                                        placeholder='Type Full Name'
                                        required={true}
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className='outline-none w-full border border-[#0000001A] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                    />
                                    <InputField
                                        name='company_name'
                                        label='Company Name'
                                        placeholder='Type Company Name'
                                        required={true}
                                        value={formData.company_name}
                                        onChange={handleChange}
                                        className='outline-none w-full border border-[#0000001A] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                    />
                                    <InputField
                                        name='address'
                                        label='Address'
                                        placeholder='Type address'
                                        required={true}
                                        value={formData.address}
                                        onChange={handleChange}
                                        className='outline-none w-full border border-[#0000001A] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                    />
                                    <InputField
                                        name='aptflour'
                                        label='Apt/Suite/Floor (Optional)'
                                        placeholder='Type apt/suite/floor'
                                        required={false}
                                        value={formData.aptflour}
                                        onChange={handleChange}
                                        className='outline-none w-full border border-[#0000001A] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                    />
                                    <InputField
                                        name='city'
                                        label='City'
                                        placeholder='Type City'
                                        required={true}
                                        value={formData.city}
                                        onChange={handleChange}
                                        className='outline-none w-full border border-[#0000001A] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                    />
                                    <div className='grid grid-cols-12 gap-4'>
                                        <div className='md:col-span-6 col-span-12'>
                                        <InputField
                                            name='state'
                                            label='State'
                                            placeholder='Type your State'
                                            required={true}
                                            value={formData.state}
                                            onChange={handleChange}
                                            className='outline-none w-full border border-[#0000001A] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                        />
                                        </div>
                                        <div className='md:col-span-6 col-span-12'>
                                        <InputField
                                            name='zip_code'
                                            label='Zip Code'
                                            placeholder='Type your zip code'
                                            required={true}
                                            value={formData.zip_code}
                                            onChange={handleChange}
                                            className='outline-none w-full border border-[#0000001A] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                        />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='mt-6 bg-[#ffffff] rounded-[16px] p-5 border border-[#0000001A] mb-5 md:mb-[100px]'>
                            <span className='text-[20px] font-semibold text-[#000000]'>Contact Info</span>
                            <div className='mt-4'>
                                <InputField
                                name='email'
                                label='Email'
                                type='email'
                                placeholder='Type email for order tracking'
                                required={true}
                                value={formData.email}
                                onChange={handleChange}
                                className='outline-none w-full border border-[#0000001A] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                />
                                <InputField
                                name='ph_no'
                                label='Phone Number'
                                placeholder='Type phone for delivery contact'
                                required={true}
                                value={formData.ph_no}
                                onChange={handleChange}
                                className='outline-none w-full border border-[#0000001A] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                />
                                <div className='flex items-center mb-6'>
                                <input
                                    type='checkbox'
                                    id='subscribe'
                                    name='subscribe'
                                    className='h-4 w-4 border border-[#5F6368] rounded focus:ring-2 focus:ring-[#721A97] text-[#721A97]'
                                    onChange={handleCheckboxChange} // Optional: handle checkbox state
                                />
                                <label htmlFor='subscribe' className='ml-2 text-sm text-[#5F6368] font-normal'>
                                    Sign me up to receive email updates and news
                                </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='md:col-span-5 col-span-12 bg-[#ffffff] rounded-[16px] border border-[#0000001A] mb-[100px]'>
                        <div className='p-5 mb-5 md:mb-[100px]'>
                            <span className='text-[20px] font-semibold text-[#000000]'>Your Order</span>
                            {products.map((product) => (
                            <div
                                key={product.id}
                                className='flex justify-between items-center border-b-2 border-b-[#00000033] mt-6 pb-4'
                            >
                                <div className='flex'>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    className='w-[60px] h-[60px]'
                                    height={60}
                                    width={60}
                                />
                                <div className='flex flex-col justify-center ml-2'>
                                    <span className='font-semibold'>{product.name}</span>
                                    <p className='mt-2 text-sm'>ID: #{product.id}</p>
                                </div>
                                </div>
                                <div className='flex flex-col'>
                                <span className='text-sm font-normal text-[#000000]'>QTY: {product.qty.toString().padStart(2, '0')}</span>
                                <span className='text-[#5F6368] text-base font-normal'>${product.price.toFixed(2)}</span>
                                </div>
                            </div>
                            ))}
                            <div className='flex justify-between items-center mt-5'>
                            <span className='text-[#000000] text-[20px] font-medium'>Grand Total</span>
                            <span className='text-[#000000] text-[20px] font-medium'>$1234,90</span>
                            </div>
                            
                            {/* Move form content to a standalone form block */}
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
                            <div className='flex items-center pt-5 pb-[32px]'>
                                <input
                                    type='checkbox'
                                    id='acceptTerms'
                                    name='acceptTerms'
                                    className='h-4 w-4 border border-[#5F6368] rounded focus:ring-2 focus:ring-[#721A97] text-[#721A97]'
                                    onChange={handleCheckboxChange} // Optional: handle checkbox state
                                />
                                <label htmlFor='acceptTerms' className='ml-2 text-sm text-[#5F6368] font-normal'>
                                You agree terms and conditions.
                                </label>
                                </div>
                            {/* <div className="bg-white p-6 mb-5 border-2 border-dotted border-gray-400">
                                <div className="flex flex-col w-full">
                                <p className="font-bold text-gray-700 mb-2">Disclaimer:</p>
                                <p className="text-gray-600">
                                    This is a disclaimer text that provides important information about file uploads.
                                </p>
                                </div>
                            </div> */}
                            <div className="flex justify-center mt-8 gap-4 w-full">
                                <Button type="submit" className="bg-[#631681] text-white px-4 py-2 font-semibold rounded w-full" disabled={loading}>
                                {loading ? 'Processing...' : 'Place Order'}
                                </Button>
                            </div>
                            </form>
                        </div>
                    </div>

                </div>
        </div>
    </div>
  )
}

const PaymentComWithStripe = () => (
    <Elements stripe={stripePromise}>
      <CheckOut />
    </Elements>
  );
  
  export default PaymentComWithStripe;