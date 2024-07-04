import { useGetMyOrdersQuery, useUpdateOrderCancelMutation } from "../../redux/features/order/orderApi";
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
import moment from "moment";
import CustomeDivider from "../../components/customeDivider/CustomeDivider";
import { Button, Space, Table, Tooltip } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { BiLoader } from "react-icons/bi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";


const ShowOrder = () => {
  const user = useAppSelector(useCurrentUser);

  const {
    data: orders,
    isLoading,
    isFetching,
  } = useGetMyOrdersQuery(user?.email);

  const [cancelOrder]=useUpdateOrderCancelMutation();

  const handleCancel = async (id: string) => {
    console.log(id);
    try {
       await cancelOrder(id)

    } catch (err:any) {
      console.log(err.message)
    }
  };
  const columns = [
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
      title: "Order Amount",
      key: "totalPrice",
      dataIndex: "totalPrice",
      render: (price: number) => `৳${price}`,
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
      render: (record: any) => {
        switch (record) {
          case "processing":
            return (
              <p className="flex justify-start items-center gap-2 text-indigo-600 ">
                Processing
                <BiLoader size={25} />{" "}
              </p>
            );
          case "shipped":
            return (
              <p className="flex justify-start items-center gap-2 text-cyan-700 ">
                Shipped
                <LiaShippingFastSolid size={25} />{" "}
              </p>
            );
          case "delivered":
            return (
              <p className="flex justify-start items-center gap-2 text-green-700 ">
                Delivered
                <IoCheckmarkDoneCircle size={25} />{" "}
              </p>
            );
          case "cancel":
            return (
              <p className="flex justify-start items-center gap-2 text-red-700 ">
                Cancelled
                <MdCancel size={25} />{" "}
              </p>
            );
          default:
            return record;
        }
      },
    },
    {
      title: "Action",
      key: "operation",
      width: 100,
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip
            title={
              record.deliveryStatus === "delivered" ||
              record.deliveryStatus === "shipped"
                ? "Cancellation is not available for orders that have already been shipped or delivered."
                : ""
            }
          >
            <span>
              <Button
                danger
                disabled={
                  record.deliveryStatus === "delivered" ||
                  record.deliveryStatus === "shipped" ||
                  record.deliveryStatus === "cancel"
                }
                onClick={() => handleCancel(record._id)}
              >
                Cancel Order
              </Button>
            </span>
          </Tooltip>
        </Space>
      ),
    },
  ];



  return (
    <div className="p-10">
      <CustomeDivider title="Your's Orders" />
      <Table
        loading={isFetching || isLoading}
        columns={columns}
        dataSource={orders?.data}
      />
    </div>
  );
};

export default ShowOrder;