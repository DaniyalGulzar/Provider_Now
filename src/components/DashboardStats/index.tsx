import React from "react";
import Image from "next/image";

interface StatsBoxProps {
  icon: string;
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

interface DashboardStatsProps {
  stats1: StatsBoxProps;
  stats2: StatsBoxProps;
  stats3: StatsBoxProps;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  stats1,
  stats2,
  stats3,
}) => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-between mt-8 xl:mx-8 lg:mx-8 md:mx-8 mx-3 gap-4">
      <StatsBox
        icon={stats1.icon}
        number={stats1.number}
        description={stats1.description}
      />
      <StatsBox
        icon={stats2.icon}
        number={stats2.number}
        description={stats2.description}
      />
      <StatsBox
        icon={stats3.icon}
        number={stats3.number}
        description={stats3.description}
      />
    </div>
  );
};

export default DashboardStats;
