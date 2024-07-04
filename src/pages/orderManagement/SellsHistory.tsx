import { useGetAllSuccessfulOrdersQuery } from "../../redux/features/order/orderApi";
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
import moment from "moment";
import CustomeDivider from "../../components/customeDivider/CustomeDivider";
import {Table } from "antd";
const SellsHistory = () => {
  const {
    data: orders,
    isLoading,
    isFetching,
  } = useGetAllSuccessfulOrdersQuery("");


  const columns = [
    {
      title: "Buyer Name",
      key: "buyerName",
      dataIndex: "buyerName",
    },
    {
      title: "Order Serial",
      key: "orderNumber",
      dataIndex: "orderNumber",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text: string) => moment(text).format("MMMM Do YYYY"),
    },
    {
      title: "Delivery Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: string) => moment(text).format("MMMM Do YYYY"),
    },
    {
      title: "Order Amount (৳)",
      key: "totalPrice",
      dataIndex: "totalPrice",
      render: (price: number) => `৳${price}`,
    },
    
    // {
    //   title: "Action",
    //   key: "details",
    //   render: (_: any, record: any) => (
    //     // <p>Download PDF</p>
    //     <Button type="text"  >
    //    Download PDF
    //   </Button>
    //     // <Link to={`/superAdmin/order-details/${record.key}`}>
    //     //   <Button>Details</Button>
    //     // </Link>
    //   ),
    // },
  ];

  const tableData = orders?.data?.map(
    ({
      _id,
      buyerName,
      mobile,
      orderDate,
      deliveryStatus,
      orderNumber,
      totalPrice,
      updatedAt,
    }: any) => ({
      key: _id,
      buyerName,
      mobile,
      orderDate,
      deliveryStatus,
      orderNumber,
      totalPrice,
      updatedAt,
    })
  );


  return (
    <div className="p-10">
      <CustomeDivider title="Sells History" />
      <Table
        loading={isFetching || isLoading}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default SellsHistory;
