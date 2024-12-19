import Image from 'next/image';
import React from 'react';

interface StatsBoxProps {
  icon: any;
  number: number | string;
  description: string;
}

const StatsBox: React.FC<StatsBoxProps> = ({ icon, number, description }) => {
  return (
    <div className="flex items-center p-4 bg-white mb-4 border rounded-lg shadow-md w-full lg:w-1/3">
      <div className="text-4xl text-blue-500 mr-4">
        <div className="w-[60px] h-[60px]">
          <Image
            src={icon}
            alt="Icon"
            width={60}
            height={60}
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col pl-2">
        <div className="text-2xl font-bold mb-1">{number}</div>
        <div className="text-gray-600">{description}</div>
      </div>
    </div>
  );
};

export default StatsBox;
