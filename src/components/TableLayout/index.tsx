"use client";
import React, { useState } from "react";
import DropdownButton from "../Dropdown";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

interface TableProps {
  columns: Array<{
    header: string;
    accessor: string;
    Cell?: (props: { value: any; row: any }) => JSX.Element;
    renderImage?: (props: { value: any; row: any }) => JSX.Element;
  }>;
  data: any[];
  title?: string;
  viewalllink?: { href: string; text: string };
  isHrVisible?: boolean;
  showSearch?: boolean;
  button?: JSX.Element;
  dropdown?: {
    label: string;
    options: { label: string; href: string }[];
  };
  boxShadow?: boolean;
}

const TableLayout: React.FC<TableProps> = ({
  columns,
  data,
  title,
  viewalllink,
  dropdown,
  showSearch = false,
  isHrVisible = true,
  boxShadow = false,
  button,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div
        className={` xl:mx-8 lg:mx-8 md:mx-8 mx-3 p-5 bg-white rounded-lg my-10 mt-2 ${boxShadow
          ? "shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)]"
          : ""
          }`}
      >
        <div className="flex items-center lg:flex-row md:flex-row justify-between flex-col mb-4">
          <h2 className="text-xl lg:text-2xl md:text-2xl sm:text-left md:text-left lg:text-left">
            {title}
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            {showSearch && (
              <div className="flex items-center space-x-2 flex-col md:flex-row">
                <div className="flex items-center border border-gray-300 rounded-3xl w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 pl-4 w-full sm:w-48 md:w-64 border-0 rounded-3xl md:h-[42px] focus:outline-none text-sm sm:h-[20px]"
                  />
                  <button className="p-2 rounded-r-lg text-gray-600">
                    <FaSearch />
                  </button>
                </div>
                <div className="mt-3 md:mt-0">{button}</div>
              </div>
            )}
          </div>

          {viewalllink && (
            <Link
              href={viewalllink.href}
              className="text-[#631681] font-semibold underline px-2 py-1 cursor-pointer rounded hover:text-blue-800 lg:ml-auto lg:text-right"
            >
              View All
            </Link>
          )}
          {dropdown && (
            <DropdownButton label={dropdown.label} options={dropdown.options} />
          )}
        </div>
        {isHrVisible && <hr className="my-4 border-gray-300" />}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white !overflow-y-clip">
            <thead className="bg-white text-black font-bold">
              <tr>
                {columns.map((col, colIndex) => (
                  <th
                    key={col.header}
                    className={`${colIndex === 0 ? "pl-2" : ""
                      } py-3 px-3 text-left text-xs uppercase tracking-wider first:rounded-tl-lg last:rounded-tr-lg border-b border-gray-300`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-100 text-gray-800">
              {data?.length === 0 ? (
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
                  <tr key={rowIndex} className="hover:bg-gray-200">
                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className="py-3 px-3">
                        {col.renderImage
                          ? col.renderImage({ value: row[col.accessor], row })
                          : col.Cell
                            ? col.Cell({ value: row[col.accessor], row })
                            : row[col.accessor]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableLayout;
