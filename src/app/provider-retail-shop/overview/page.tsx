"use client"
import AuthWrapper from "@/components/AuthWrapper";
import React from "react";
import DashboardCard from "@/components/DashboardCards";
import { ApexOptions } from 'apexcharts';
import Chart from "@/components/DataCharts";
import { FaEllipsis } from "react-icons/fa6";
import Image from "next/image";

const Overview = () => {
  const lineChartData = {
    series: [{
      name: 'Sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }],
    options: {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      title: {
        text: 'Sales Details',
        align: 'left'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      },
      stroke: {
        curve: 'smooth' // Removed 'as "smooth"' to prevent type issues
      }
    } as ApexOptions
  };

  // Dummy data for Bar Chart
  const barChartData = {
    series: [{
      name: 'Revenue',
      data: [23, 45, 67, 12, 34, 54, 65]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false }
      },
      title: {
        text: 'Total Earnings',
        align: 'left'
      },
      xaxis: {
        categories: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F', 'Product G']
      },
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      }
    } as ApexOptions
  };

  const cardData = [
    {
      title: "New Orders",
      count: "10,120",
      title2: "See Details",
      image: "/myImages/shop-suitcase.svg",
    },
    {
      title: "Successful Delivery",
      count: "2,000",
      title2: "See Details",
      image: "/myImages/delivery.svg",
    },
    {
      title: "Total Earning",
      count: "8,120",
      title2: "See Details",
      image: "/myImages/payment.svg",
    },
    {
      title: "Pending Orders",
      count: "1,250",
      title2: "See Details",
      image: "/myImages/shop-suitcase.svg",
    },
  ];

  const dummyData = [
    {id:1, products: "chewtablets", date:"22-01-2003", name: 'John Doe', amount: 2800, status: 'Paid' },
    {id:2, products: "chewtablets", date:"22-01-2003", name: 'John Doe2', amount: 800, status: 'Paid' },
  ];

  const headers = [
    { title: 'Products' },
    { title: 'Date' },
    { title: 'Name' },
    { title: 'Amount' },
    { title: 'Status' },
    { title: 'More' },
  ];

  return (
    <AuthWrapper>
      <div className="mx-3 lg:mx-10">
        <p className="font-bold text-3xl my-6">Overview</p>
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-4 md:grid-cols-2">
          {cardData.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              count={card.count}
              title2={card.title2}
              image={card.image}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          <div className="border border-[#00000033] rounded-[16px] p-5 bg-[#FFFFFF]">
            <Chart type="line" series={lineChartData.series} options={lineChartData.options} />
          </div>
          <div className="border border-[#00000033] rounded-[16px] p-5 bg-[#FFFFFF]">
            <Chart type="bar" series={barChartData.series} options={barChartData.options} />
          </div>
        </div>

        <div className="overflow-x-auto mb-[50px] rounded-[16px] border border-gray-200 shadow-md p-5">
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
                <td className="py-5 px-6 flex items-center">
                  <div className="flex items-center">
                    <Image 
                      // src={images[item.products]} 
                      src="/myImages/GlassBottle.svg"
                      alt={item.products} 
                      height={40} width={40}
                      className="mr-3"
                    />
                    <span className="text-lg font-medium">{item.products}</span>
                  </div>
                </td>
                <td className="py-5 px-6">{item.date}</td>
                <td className="py-5 px-6">{item.name}</td>
                <td className="py-5 px-6">{item.amount}</td>
                <td className="py-5 px-6">{item.status}</td>
                <td className="py-5 px-6"><FaEllipsis className="text-2xl cursor-pointer" /></td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

      </div>
    </AuthWrapper>
  );
};

export default Overview;
