"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Banner from "@/components/Banner/page";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import NavbarOther from "@/components/NavbarOther/page";
import Image from "next/image";
import { toast } from "react-hot-toast";
import InputField from "@/components/InputField";
import { Circles } from "react-loader-spinner";

interface Category {
  id: string;
  title: string;
}

export default function ContactUs() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category_id: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/contact/category/list`
      );
      setCategories(response.data.result); // Adjust based on actual response structure
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    console.log("sad");
    fetchCategories();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/contact/store`,
        formData
      );
      toast.success("Message sent successfully!");
      // Clear the form fields
      setFormData({
        name: "",
        email: "",
        phone: "",
        category_id: "",
        message: "",
      });
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="text-center">
      <Circles
        height="80"
        width="80"
        color="#491161 "
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass="loading-spinner-overlay"
        visible={isSubmitting}
      />
      <NavbarOther />
      <Banner title="Contact us" />
      <div className="mt-[80px]">
        <span className="text-[40px] font-semibold">Get in touch</span>
        <div className="max-w-[455px] mx-auto mt-4">
          <span className="text-xl font-bold text-FF1F9D">
            Have questions? We’re here for you. Drop us a line, write us an
            email, or send us a text.
          </span>
        </div>
      </div>
      <div className="max-w-[95%] md:max-w-[85%] rounded-[22px] mb-[80px] mt-[48px] mx-auto p-6 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center">
        <div className="mb-4 md:mb-0 md:w-1/3 bg-751A9B rounded-xl h-[454px] flex justify-center items-end px-3">
          <Image
            src="/myImages/image-3.png"
            width={319}
            height={417}
            alt="Contact"
            className="rounded-md w-[319px] h-[417px] object-cover"
          />
        </div>
        <div className="md:w-2/3 w-full">
          <form className="space-y-4 ml-0 md:ml-[31px]" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
              <div className="w-full md:w-1/2 px-2 text-left">
                <InputField
                  type="text"
                  id="name"
                  placeholder="Type your full name"
                  label="Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-2 text-left">
                <InputField
                  type="email"
                  id="email"
                  label="Email"
                  required
                  placeholder="Type your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full text-left md:w-1/2 px-2">
                <InputField
                  type="number"
                  id="phone"
                  label="Phone Number"
                  required
                  placeholder="Type your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full text-left md:w-1/2 px-2 items-end">
                <label htmlFor="category" className="text-lg font-semibold">
                  Category
                </label>
                <select
                  id="category_id"
                  required
                  className="w-full border border-[#ccc] rounded-lg h-[48px] p-2 mt-3"
                  value={formData.category_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group text-left space-y-2">
              <label htmlFor="message" className="text-lg font-semibold">
                Message
              </label>
              <textarea
                id="message"
                required
                placeholder="Type your message"
                className="w-full text-sm font-normal p-4 mt-2 h-[123px] rounded-lg border border-gray-300"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <Button
              type="submit"
              className="w-[161px] h-[48px] bg-751A9B hover:bg-purple-700 text-white text-base font-semibold rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}