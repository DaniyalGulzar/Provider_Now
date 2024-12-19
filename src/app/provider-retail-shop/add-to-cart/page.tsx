"use client";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import RetailNavbar from "../retailNavbar";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

const AddToCart: React.FC = () => {
  const initialCount = Array(10).fill(0);
  const [counts, setCounts] = useState(initialCount);
  const router = useRouter();

  const handleCheckOut = () =>{
    router.push("checkout");
  }

  const increment = (index: number) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
  };

  const decrement = (index: number) => {
    const newCounts = [...counts];
    if (newCounts[index] > 0) {
      newCounts[index] -= 1;
      setCounts(newCounts);
    }
  };

  const columns = [
    { header: "Item", accessor: "item" },
    { header: "Price", accessor: "price" },
    { header: "Quantity", accessor: "quantity" },
    { header: "Total", accessor: "total" },
  ];

  const data = [
    {
      item: { name: "Apple", imageUrl: "/myImages/GlassBottle.svg" },
      price: "$1.00",
      quantity: counts[0],
      total: `$${(counts[0] * 1.0).toFixed(2)}`,
    },
    {
      item: { name: "Banana", imageUrl: "/myImages/GlassBottle.svg" },
      price: "$0.50",
      quantity: counts[1],
      total: `$${(counts[1] * 0.5).toFixed(2)}`,
    },
    {
      item: { name: "Orange", imageUrl: "/myImages/GlassBottle.svg" },
      price: "$1.20",
      quantity: counts[2],
      total: `$${(counts[2] * 1.2).toFixed(2)}`,
    },
    {
      item: { name: "Ananas", imageUrl: "/myImages/GlassBottle.svg" },
      price: "$5.20",
      quantity: counts[3],
      total: `$${(counts[3] * 5.2).toFixed(2)}`,
    },
  ];

  // Calculate total items in the cart
  const totalItems = data.length;

  return (
    <>
      <RetailNavbar />
      <div className="mt-5 p-4 sm:p-6 md:p-8 max-w-full lg:max-w-[90%] lg:mx-5">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl mb-4 text-left">
          Your Cart ({totalItems} items)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-white text-center text-black font-bold w-full">
              <tr className="flex justify-between items-center">
                {columns.map((col, colIndex) => (
                  <th
                    key={colIndex}
                    className="py-3 text-center text-xs sm:text-sm uppercase tracking-wider first:rounded-tl-lg last:rounded-tr-lg border-b border-gray-300"
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-3 px-6 bg-white"
                  >
                    No Data Available
                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <React.Fragment key={rowIndex}>
                    <tr className="hover:bg-gray-50 flex flex-wrap lg:flex-nowrap justify-between items-center">
                      <td className="py-2 whitespace-nowrap text-sm sm:text-base text-gray-700 flex items-center justify-center">
                        <img
                          src={row.item.imageUrl}
                          alt={row.item.name}
                          className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] lg:w-[60px] lg:h-[60px]"
                        />
                        <div className="flex flex-col justify-center ml-2">
                          <span className="font-semibold">{row.item.name}</span>
                          <p className="mt-2 text-sm">ID: #1011</p>
                        </div>
                      </td>
                      <td className="py-2 whitespace-nowrap text-sm sm:text-base text-gray-700 text-center mx-2 lg:mr-[25px] lg:ml-[-60px]">
                        <span className="font-semibold">{row.price}</span>
                      </td>
                      <td className="py-2 whitespace-nowrap text-sm sm:text-base text-gray-700 text-center">
                        <div className="flex items-center justify-center border rounded-lg w-[80px] sm:w-[90px] lg:w-[100px] h-[36px]">
                          <button
                            className="text-black text-lg font-semibold mx-1"
                            onClick={() => decrement(rowIndex)}
                          >
                            -
                          </button>
                          <span className="text-base font-semibold mx-1">
                            {counts[rowIndex]}
                          </span>
                          <button
                            className="text-black text-lg font-semibold mx-1"
                            onClick={() => increment(rowIndex)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-2 whitespace-nowrap text-sm sm:text-base text-gray-700 text-center flex items-center justify-center">
                        {row.total}&nbsp;&nbsp;
                        <FaTrash className="text-red-400 cursor-pointer" />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={columns.length}>
                        <hr className="my-2 border-gray-300" />
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col w-full md:w-[450px] lg:w-[522px] my-2 ml-auto">
          <div className="flex justify-between w-full">
            <span className="font-bold">Subtotal:</span>
            <span className="font-bold">$XX.XX</span>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="flex justify-between w-full">
            <span className="font-bold">Sales Tax:</span>
            <span className="font-bold">$XX.XX</span>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="flex justify-between w-full">
            <span className="font-bold">Grand Total:</span>
            <span className="font-bold">$XX.XX</span>
          </div>
          <Button
            onClick={handleCheckOut}
            className="bg-[#631681] ml-auto border border-[#631681] mt-6 text-white text-sm lg:text-base font-semibold px-4 py-2 rounded-lg w-[140px] lg:w-[161px] hover:bg-[#631681] hover:text-white"
          >
            Checkout
          </Button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AddToCart;
