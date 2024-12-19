import Image from "next/image";
import React from "react";

// Define the interface for the props
interface DashboardCardProps {
  title: string;
  title2: string;
  count: string | number;
  image: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  count,
  image,
  title2,
}) => {
  return (
    <div className="flex items-center p-4 bg-white border rounded-lg shadow-md w-full">
      <div className="flex-grow flex flex-col"> {/* Use flex-grow to allow full width */}
        <div className="text-base font-normal text-[#5F6368] mb-2">{title}</div>
        <div className="font-semibold text-[26px] text-[#0A0A0A] mb-6">{count}</div>

        <div className="flex justify-between items-end">
          <span className="text-base font-normal text-[#5F6368] underline">{title2}</span>
          <div className="flex-shrink-0">
            <Image src={image} alt={title} height={40} width={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
