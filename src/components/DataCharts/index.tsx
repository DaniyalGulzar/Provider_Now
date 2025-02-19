import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

interface ChartProps {
  type: 'line' | 'bar' | 'area' | 'scatter';
  series: { name: string; data: number[] }[];
  options: ApexOptions;
}

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const Chart: React.FC<ChartProps> = ({ type, series, options }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }

  return (
    <div>
      <ApexCharts
        type={type}
        series={series}
        options={options}
        height={350}
      />
    </div>
  );
};

export default Chart;
