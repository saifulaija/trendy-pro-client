/* eslint-disable @typescript-eslint/no-explicit-any */
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

import { BiLoader } from "react-icons/bi";
import { Button, Dropdown, Table } from "antd";
import { useState } from "react";
import {
  useGetAllOrdersQuery,
  useUpdateOrderDeliveryMutation,
} from "../../redux/features/order/orderApi";
import moment from "moment";
// import { Link } from "react-router-dom";
import { toast } from "sonner";
import CustomeDivider from "../../components/customeDivider/CustomeDivider";
// import { PDFDownloadLink, View } from "@react-pdf/renderer";
// import RRPdf from "../../utils/generatePdf";
// import { DownloadOutlined } from "@ant-design/icons";
// import PdfDocument from "../../components/pdfElements/MainPdfComponent";
// import InvoiceTableRow from "../../components/pdfElements/InvoiceTableRow";
// import InvoiceItemsTable from "../../components/pdfElements/InvoiceItemsTable";

const items = [
  {
    label: "Shipped",
    key: "shipped",
  },
  {
    label: "Delivered",
    key: "delivered",
  },
];

interface UpdateData {
  key: string;
}

const ShowOrder = () => {
  const [userId, setUserId] = useState("");
  const { data: orders, isLoading, isFetching } = useGetAllOrdersQuery("");
  // console.log(orders);
  const [updateOrderDelivery] = useUpdateOrderDeliveryMutation();

  const handleStatusUpdate = async (data: UpdateData) => {
    const updateData = {
      id: userId,
      data: {
        deliveryStatus: data.key,
      },
    };
    // console.log(data.key);

    try {
      await updateOrderDelivery(updateData);
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Failed to update status", error);
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

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
      title: "Payment System",
      key: "paymentSystem",
      dataIndex: "paymentSystem",
    },
    {
      title: "Order Amount (৳)",
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
<p className="flex justify-start items-center gap-2 text-red-700 ">Processing<BiLoader size={25} /> </p>

            );
          case "shipped":
            return (
               <p className="flex justify-start items-center gap-2 text-cyan-700 ">Shipped<LiaShippingFastSolid size={25} /> </p>
            );
          case "delivered":
            return <p className="flex justify-start items-center gap-2 text-green-700 ">Delivered<IoCheckmarkDoneCircle size={25} /> </p>;
          default:
            return record;
        }
      },
    },
    {
      title: "Action",
      key: "update",
      render: (item: any) => (
        <Dropdown menu={menuProps} trigger={["click"]}>
          <Button onClick={() => setUserId(item.key)}>Update Delivery</Button>
        </Dropdown>
      ),
    },
  
   
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
      paymentSystem,
      orderProduct
    }: any) => ({
      key: _id,
      buyerName,
      mobile,
      orderDate,
      deliveryStatus,
      orderNumber,
      totalPrice,
      paymentSystem,
      orderProduct
    })
  );

  return (
    <div className="p-10">
      <CustomeDivider title="all order's" />
      <Table
        loading={isFetching || isLoading}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default ShowOrder;
