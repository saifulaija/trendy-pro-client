/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useGetEarningDataQuery } from "../../../redux/features/chart/chartApi";

export interface TDataItems {
  _id: number;
  total: number;
}


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieYearlyEarnings = () => {
  const { data: earningData } = useGetEarningDataQuery("");
  const yearlyData = earningData?.data?.yearlyResult;

  const data = yearlyData
    ? yearlyData.map((earning:TDataItems) => ({
        name: earning._id.toString(),
        value: earning.total,
      }))
    : [];



  const [chartDimensions, setChartDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 200, height: 200 });

  useEffect(() => {
    const handleResize = () => {
      const containerWidth =
        document.getElementById("pie-chart-container")?.offsetWidth ?? 200;
      const newWidth = containerWidth < 200 ? containerWidth : 200; // Limit width to 200
      const newHeight = newWidth; // Make it a square chart

      setChartDimensions({ width: newWidth, height: newHeight });
    };

    handleResize(); // Initial resize

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="pie-chart-container"
      className="flex rounded-2xl px-8 py-5  bg-[#47a5a570] mt-8"
    >
      <div className="flex justify-between items-center gap-6">
        <p className="text-xl font-sans text-gray-900 font-semibold mt-8">
          <span>৳</span>
          {data[0]?.value}
          <br />
          <span className="text-gray-500 text-sm"> Yearly Sales</span>
        </p>
      </div>
      <PieChart width={chartDimensions.width} height={chartDimensions.height}>
        <Pie
          data={data}
          cx={chartDimensions.width / 2}
          cy={chartDimensions.height / 2}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={chartDimensions.width / 2 - 20}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_entry: any, index: any) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default PieYearlyEarnings;
