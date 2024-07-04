/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useGetInventoryChartDataQuery } from "../../../redux/features/chart/chartApi";
// import { useGetAllProductsQuery } from '../../redux/features/product/productApi';

const colors = [
  "#b8d2ea",

  "#b4b4de",

  "#5c024b",
  "#b4b4de",
  "#eb6060",

  "#20eb4f",
  "#1fdbd8",
];

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  } ${x + width / 2}, ${y} C${x + width / 2},${y + height / 3} ${
    x + (2 * width) / 3
  },${y + height} ${x + width}, ${y + height} Z`;
};

const TriangleBar = (props: {
  fill?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}) => {
  const { fill, x = 0, y = 0, width = 0, height = 0 } = props;

  if (width <= 0 || height <= 0) {
    // Return null or any fallback JSX when width or height is not valid
    return null;
  }

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function InventoryStock() {
  const { data: data2 } = useGetInventoryChartDataQuery("", {
    pollingInterval: 150000000,
  });
  // console.log(data2.data)

  // Assuming 'productName', 'productPrice', and 'brand' are properties in your data
  const mappedData =
    (data2?.data as { category: string; count: number }[] | undefined)?.map(
      (d) => ({
        name: d.category,
        price: d.count,
      })
    ) || [];

  return (
    <div
      className=" w-full lg:w-1/2 bg-white rounded-2xl"
      style={{ width: "100%", maxWidth: "xl", height: "480px" }}
    >
      <p className="text-slate-600 font-semibold text-base ps-10 mb-8">INVENTORY STOCK</p>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={mappedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="price"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {mappedData.map((_entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
