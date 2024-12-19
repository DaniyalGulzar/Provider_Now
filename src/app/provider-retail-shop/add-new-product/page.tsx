"use client"
import AuthWrapper from '@/components/AuthWrapper'
import Button from '@/components/Button'
import InputField from '@/components/InputField'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

function AddNewProduct() {
    const [formData, setFormData] = useState({
        product_name: '',
        desc: '',
        basic_price: '',
        discount: '',
        discount_price: '',
        product_tags: '',
        product_category: '',
        Status: '',
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const states = [
        "cat1", "cat2",
    ]
    const status = [
        "active",
        "inActive",
    ]

    // const images = [
    //     { src: "/myImages/glass-bottle-white.svg", alt: "Glass Bottle White" },
    //     { src: "/myImages/glass-bottle-white.svg" , alt: "Another Image" },
    //     { src: "/myImages/glass-bottle-white.svg" , alt: "Some Other Image" },
    //     { src: "/myImages/glass-bottle-white.svg" , alt: "Some Other Image" },
    //     { src: "/myImages/glass-bottle-white.svg" , alt: "Some Other Image" },
    //     { src: "/myImages/glass-bottle-white.svg" , alt: "Some Other Image" },
    //     { src: "/myImages/glass-bottle-white.svg" , alt: "Some Other Image" },
    //     { src: "/myImages/glass-bottle-white.svg" , alt: "Some Other Image" },
    // ];
    
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the file input
    const [images, setImages] = useState<{ src: string; alt: string }[]>([]); // State to hold selected images

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => {
                const imageUrl = URL.createObjectURL(file); // Create a URL for the selected file
                return { src: imageUrl, alt: file.name }; // Store the image URL and file name
            });
            setImages(prevImages => [...prevImages, ...newImages]); // Update the state with new images
        }
    };

  return (
    <div>
        <AuthWrapper>
            <div className='mx-3 md:mx-10'>
                <div className='text-[28px] font-semibold #000000 my-7'>
                    Add New Product
                </div>

                <form action="">
                    <div className='grid grid-cols-12 gap-5'>
                        <div className='md:col-span-7 col-span-12'>
                            <div className='bg-[#ffffff] rounded-[16px] p-5 border border-[#0000001A]'>
                                <span className='text-[20px] font-semibold text-[#000000]'>General Information</span>
                                <div className='mt-4'>
                                    <InputField
                                        name='product_name'
                                        label='Product Name'
                                        placeholder='Type Product Name'
                                        required={true}
                                        value={formData.product_name}
                                        onChange={handleChange}
                                        className='outline-none w-full border border-[#0000001A] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                    />
                                    <InputField
                                        name='desc'
                                        type='textarea'
                                        label='Description'
                                        placeholder='Write description'
                                        required={true}
                                        value={formData.desc}
                                        onChange={handleChange}
                                        className='outline-none w-full border border-[#0000001A] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                    />
                                </div>
                            </div>
                            <div className='mt-6 bg-[#ffffff] rounded-[16px] p-5 border border-[#0000001A] mb-5'>
                                <span className='text-[20px] font-semibold text-[#000000]'>Pricing</span>
                                <div className='mt-4'>
                                    <InputField
                                    name='basic_price'
                                    label='Basic Price'
                                    type='text'
                                    placeholder='Type Basic Price'
                                    required={true}
                                    value={formData.basic_price}
                                    onChange={handleChange}
                                    className='outline-none w-full border border-[#0000001A] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                    />
                                    <div className='grid grid-cols-12 gap-4'>
                                        <div className='md:col-span-6 col-span-12'>
                                        <InputField
                                            name='discount'
                                            label='Discount'
                                            placeholder='Type Discount'
                                            required={true}
                                            value={formData.discount}
                                            onChange={handleChange}
                                            className='outline-none w-full border border-[#0000001A] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                        />
                                        </div>
                                        <div className='md:col-span-6 col-span-12'>
                                        <InputField
                                            name='discount_price'
                                            label='Discount Price'
                                            placeholder='Type Discount Price'
                                            required={true}
                                            value={formData.discount_price}
                                            onChange={handleChange}
                                            className='outline-none w-full border border-[#0000001A] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-6 bg-[#ffffff] rounded-[16px] p-5 border border-[#0000001A] mb-5 md:mb-[100px]'>
                                <span className='text-[20px] font-semibold text-[#000000]'>Category</span>
                                <div className='mt-4'>
                                    <div className="w-full mb-4">
                                        <label className="block text-xl font-semibold">
                                            Product Category
                                        </label>
                                        <div className="">
                                            <select
                                            name="product_category"
                                            value={formData.product_category}
                                            onChange={handleChange}
                                            required
                                            className='outline-none w-full border border-[#cccccc] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                            >
                                            <option value="">Select Product Category</option>
                                            {states.map((state) => (
                                                <option key={state} value={state}>
                                                {state}
                                                </option>
                                            ))}
                                            </select>
                                        </div>
                                    </div>
                                    <InputField
                                    name='product_tags'
                                    label='Product Tags'
                                    type='text'
                                    placeholder='Type Product Tags'
                                    required={true}
                                    value={formData.product_tags}
                                    onChange={handleChange}
                                    className='outline-none w-full border border-[#0000001A] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='md:col-span-5 col-span-12'>
                            <div className='mt-6 bg-[#ffffff] rounded-[16px] p-5 border border-[#0000001A] mb-5'>
                                <span className='text-[20px] font-semibold text-[#000000]'>Product Images</span>
                                <div className='bg-[#F8F9FB] p-4 my-4 rounded-xl border border-[#0000001A]'>
                                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
                                        {images.length === 0 ? (
                                            <div className='flex justify-center items-center'>
                                                <Image
                                                    src="/myImages/glass-bottle-white.svg"
                                                    alt="Default Image"
                                                    height={90}
                                                    width={90}
                                                    className='object-contain'
                                                />
                                            </div>
                                        ) : (
                                            images.map((image, index) => (
                                                <div key={index} className='flex justify-center items-center'>
                                                    <Image
                                                        src={image.src}
                                                        alt={image.alt}
                                                        height={90}
                                                        width={90}
                                                        className='object-contain'
                                                    />
                                                </div>
                                            ))
                                        )}
                                    </div>

                                </div>
                                <div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className='hidden'
                                        multiple
                                    />
                                    <Button
                                        onClick={handleButtonClick}
                                        className='border border-[#491161] hover:bg-[#491161] hover:text-white rounded-lg w-full h-[48px] mt-[18px] text-[#491161] text-base font-medium'
                                    >
                                        Add More Image
                                    </Button>
                                </div>
                            </div>

                            <div className='mt-6 bg-[#ffffff] rounded-[16px] p-5 border border-[#0000001A] mb-5 md:mb-[100px]'>
                                <span className='text-[20px] font-semibold text-[#000000]'>Product Status</span>
                                <div className='mt-4'>
                                    <div className="w-full mb-4">
                                        <label className="block text-xl font-semibold">
                                        Status  
                                        </label>
                                        <div className="">
                                            <select
                                            name="Status"
                                            value={formData.Status}
                                            onChange={handleChange}
                                            required
                                            className='outline-none w-full border border-[#cccccc] rounded-xl my-4 bg-[#F8F9FB] p-5 text-sm font-normal text-[#00000066]'
                                            >
                                            {status.map((state) => (
                                                <option key={state} value={state}>
                                                {state}
                                                </option>
                                            ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    </div>
  )
}

export default AddNewProduct