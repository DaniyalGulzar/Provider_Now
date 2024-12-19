"use client"
import AuthWrapper from '@/components/AuthWrapper'
import Button from '@/components/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function AllProducts() {
    const router = useRouter();

    const dummyData = [
        {
            id: 1,
            rank: 1,
            products: [{ name: "chewtablets", id: '1011' }],
            total_buyer: "320",
            price: '1200',
            Stock: 28,
            rating: '4.5',
            status: 'Active'
        },
        {
            id: 2,
            rank: 4,
            products: [{ name: "chewtablets", id: '1011' }],
            total_buyer: "320",
            price: '1200',
            Stock: 28,
            rating: '4.5',
            status: 'Active'
        },
    ];
    
    const headers = [
        { title: 'Rank' },
        { title: 'Product' },
        { title: 'Total Buyers' },
        { title: 'Price' },
        { title: 'Stock' },
        { title: 'Rating' },
        { title: 'Status' },
    ];


  return (
    <div>
        <AuthWrapper>
            <div className='mx-3 lg:mx-10'>
                <div className='my-6 flex justify-between items-center flex-col md:flex-row '>
                    <span className='text-[28px] font-semibold text-[#000000]'>All Products</span>
                    <div className='flex md:flex-row flex-col gap-4'>
                        <Button className='border border-[#D9D9D9] rounded-lg h-[48px] p-4'>
                        <Image src="/myImages/filter.svg" alt='..,' height={14} width={14}/>&nbsp;    
                            Filter
                        </Button>
                        <Button className='border border-[#D9D9D9] rounded-lg h-[48px] p-4'>
                        <Image src="/myImages/share.svg" alt='..,' height={14} width={14}/>&nbsp;    
                            Share
                        </Button>
                        <Button onClick={()=>router.push('add-new-product')} className='bg-[#491161] text-white hover:bg-blue-700 rounded-lg h-[48px] p-4'>
                        + Add Product
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto mb-[50px] rounded-[16px] border border-gray-200 shadow-md">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-[#F8F9FB] rounded-[12px]">
                                {headers.map((header, index) => (
                                    <th key={index} className="py-3 px-6 text-left text-lg text-[#000000] font-normal">
                                        {header.title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-base text-[#5F6368] font-normal">
                            {dummyData.map((item) => (
                                <tr key={item.id} className="border-b border-gray-200">
                                    <td className="py-5 px-6">{item.rank}</td>
                                    <td className="py-5 px-6 flex items-center">
                                        <div className="flex items-center">
                                            <Image
                                                src="/myImages/GlassBottle.svg"
                                                alt={item.products[0].name}
                                                height={40}
                                                width={40}
                                                className="mr-3"
                                            />
                                            <div className='flex flex-col'>
                                                <span>{item.products[0].name}</span>
                                                <span>{item.products[0].id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">{item.total_buyer}</td>
                                    <td className="py-5 px-6">{item.price}</td>
                                    <td className="py-5 px-6">{item.Stock}</td> 
                                    <td className="py-5 px-6">{item.rating}</td>
                                    <td className="py-5 px-6">{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthWrapper>
    </div>
  )
}

export default AllProducts