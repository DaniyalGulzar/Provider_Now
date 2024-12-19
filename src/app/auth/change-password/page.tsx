"use client";
import AuthWrapper from "@/components/AuthWrapper";
import InputField from "@/components/InputField";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const { data: session }: any = useSession(); // Access session data
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirmNewPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!session) {
      console.error("User is not authenticated");
      setLoading(false);
      return;
    }

    if (formData.new_password !== formData.confirmNewPassword) {
      toast.error("New password and Confirm New Password is not matched");
    }
    try {
      const token = session.token;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/password/change`,
        {
          old_password: formData.old_password,
          new_password: formData.new_password,
          confirmNewPassword: formData.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Password changed!");
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthWrapper>
        {loading && (
          <div className="flex justify-center items-center h-full">
            <Circles
              height="80"
              width="80"
              color="#491161"
              ariaLabel="bars-loading"
              visible={loading}
            />
          </div>
        )}
        {!loading && (
          <div className="mx-3 lg:mx-10">
            <div className="my-[40px]">
              <span className="text-[28px] font-bold">Change Password</span>
            </div>
            <div className="shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] px-6 lg:px-[90px] md:px-[60px] sm:px-[30px] py-[50px] rounded-[22px]">
              <form onSubmit={handleChangePassword}>
                <InputField
                  label="Old Password"
                  name="old_password"
                  type="password"
                  value={formData.old_password}
                  placeholder="Enter Password"
                  onChange={handleChange}
                />
                <InputField
                  label="New Password"
                  name="new_password"
                  type="password"
                  value={formData.new_password}
                  placeholder="Enter New Password"
                  onChange={handleChange}
                />
                <InputField
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  type="password"
                  value={formData.confirmNewPassword}
                  placeholder="Enter Password"
                  onChange={handleChange}
                />
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="mt-4 bg-[#751A9B] hover:bg-[#6B84FE] text-white py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AuthWrapper>
    </div>
  );
}

export default ChangePassword;
