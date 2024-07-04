/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { BarChart, Bar, Tooltip } from 'recharts';
import { useGetEarningDataQuery } from '../../../redux/features/chart/chartApi';
interface TDataItem {
  fill?: string;
  dataKey: string;
  unit?: string;
  formatter?: string;
  name: string;
  color?: string;
  value?: number;
  type?: string;
  payload: {
    name: string;
    uv: number;
    year: number;
  };
  chartType?: string;
  hide?: boolean;
}
interface TEarningData {
  _id: {
    year: number;
    month: number;
  };
  total: number;
}


export default function MonthlyEarning() {
  const [chartDimensions, setChartDimensions] = useState({ width: 350, height: 100 });

  const { data: earningData } = useGetEarningDataQuery("");
  const monthlyData = earningData?.data?.monthlyResult;
  
  const getMonthName = (month:number) => {
    switch (month) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "Invalid Month";
    }
  };
  
  const yearData = monthlyData
    ? monthlyData.map((earning:TEarningData) => ({
        name: getMonthName(earning._id.month),
        uv: earning.total,
        year: earning._id.year,
      }))
    : [];
  
  console.log(yearData);
  

const CustomTooltip = ({  payload }:{payload:TDataItem[]}) => {
  
  if ( payload && payload?.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`৳${payload[0]?.value}` }</p>
        <p className="intro">{`${payload[0]?.payload?.name}`}</p>
       
      </div>
    );
  }

  return null;
};

  const currentMonthData = yearData.find(
    (data:any) => data.name === getMonthName(new Date().getMonth() + 1)
  );

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = document.getElementById('bar-chart-container')?.offsetWidth ?? 350;
      const newWidth = containerWidth < 350 ? containerWidth : 350; // Limit width to 350
      const newHeight = newWidth < 350 ? newWidth / 3.5 : 100; // Limit height to 1/3.5 of width or 100

      setChartDimensions({ width: newWidth, height: newHeight });
    };

    handleResize(); 

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div
        id="bar-chart-container"
        className="rounded-2xl px-5 py-5 bg-[#03C9D7]"
      >
        <div className="flex justify-between items-center gap-6">
          <p className="font-semibold text-white text-lg">Earnings</p>
          <p className="text-xl font-sans text-white font-semibold mt-8">
            <span>৳</span> {currentMonthData ? currentMonthData.uv : 0}
            <br />
            <span className="text-gray-200 text-sm">Monthly revenue</span>
          </p>
        </div>
        <BarChart
          width={chartDimensions.width}
          height={chartDimensions.height}
          data={yearData}
        >
          <Bar dataKey="uv" fill="#8884d8" />
          <Tooltip content={<CustomTooltip payload={[]} />} />
        </BarChart>
      </div>
    </>
  );
}
