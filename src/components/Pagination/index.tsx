import React from "react";
import { FaArrowLeft } from "react-icons/fa";

interface PaginatedLinksProps {
  data: { total: number; per_page: number } | null;
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

const PaginatedLinks: React.FC<PaginatedLinksProps> = ({
  data,
  currentPage,
  lastPage,
  onPageChange,
}) => {
  if (!data || lastPage <= 1) {
    return null; // Don't render pagination for a single page or when data is not available
  }

  // Calculate the total number of pages based on the total number of items and items per page
  const totalPages = Math.ceil(data.total / data.per_page);
  const maxVisiblePages = 5;

  // Function to generate the page numbers
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const halfWindow = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= halfWindow + 1) {
      for (let i = 1; i <= maxVisiblePages - 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    } else if (currentPage > totalPages - halfWindow) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = currentPage - halfWindow; i <= currentPage + halfWindow; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4 max-w-[120px] mx-auto rounded-lg">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`px-4 h-[48px] bg-gray-300 text-lg text-gray-700 rounded-3xl ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Previous
      </button>

      <div className="flex items-center">
        {getPageNumbers().map((number, index) =>
          typeof number === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(number)}
              className={`mx-1 w-10 h-10 flex items-center justify-center rounded-full ${
                number === currentPage
                  ? "bg-[#751A9B] text-white"
                  : "bg-white border border-common-grey_light text-gray-700 hover:bg-primary-default hover:text-white"
              }`}
            >
              {number}
            </button>
          ) : (
            <span key={index} className="mx-1 text-gray-700">...</span>
          )
        )}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`mx-3 px-4 h-[48px] ${currentPage === totalPages ? "bg-gray-300 text-gray-700 opacity-50" : " bg-[#751A9B] text-white"} text-lg rounded-3xl`}
      >
        Next
      </button>

      {/* <p className="ml-4">
        Showing {data ? (currentPage - 1) * data.per_page + 1 : 0} to{" "}
        {Math.min(currentPage * (data?.per_page || 0), data?.total || 0)} of {data?.total} entries
      </p> */}
    </div>
  );
};

export default PaginatedLinks;
