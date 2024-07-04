import image from "../../assets/images/PNG-Richkid-Logo.png";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Badge, Button, List, Modal } from "antd";

import { useState } from "react";
import { TOrder, TReview } from "../../types/global.type";
import { clearReviewItems } from "../../redux/features/review/reviewSlice";
import { clearOrderItems } from "../../redux/features/order/orderSlice";

const CustomeHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const user = useAppSelector(useCurrentUser);
  console.log(user);

  const review = useAppSelector((state) => state.review);
  const order = useAppSelector((state) => state.order);

  const dispatch = useAppDispatch();

  const reviewsData = review.reviewItems;
  const ordersData = order.orderItems;

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfully");
  };

  //for modal---
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleRead = () => {
    setIsModalOpen(false);
    dispatch(clearReviewItems());
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //for order modal
  const showOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const handleOrderRead = () => {
    setIsOrderModalOpen(false);
    dispatch(clearOrderItems());
  };

  const handleCancelOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <motion.div
      className="flex px-2 md:py-2 sm:px-1 md:px-8 justify-between items-center space-y-2 md:space-y-0 bg-neutral-50 border-b-[2px] shadow-sm fixed top-0 left-0 right-0 z-10"
      initial={{ y: -150 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <motion.div
        whileHover={{ x: 10 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="flex items-center"
      >
        <Link to="/">
          <img
            src={image}
            alt="trendy"
            className="h-[40px] md:h-[50px] w-[60px] md:w-[100px] object-fill mr-4 rounded"
          />
        </Link>
      </motion.div>

      <div className="text-center md:text-left">
        {user?.role === "user" ? (
          <div className="font-sans text-base leading-normal">
            <p>
              Hello, <span className="font-semibold">{user?.name}</span>,
            </p>
            <p className="text-balance">Welcome to Trendy</p>
          </div>
        ) : (
          " "
        )}
      </div>

      {/* Icons and buttons for large devices */}
      <div className="hidden md:flex justify-center items-center gap-6">
        {user?.role === "superAdmin" && (
          <span className="flex justify-center items-center gap-6">
            <Badge count={review.reviewItems.length}>
              <MailOutlined className="text-[24px]" onClick={showModal} />
            </Badge>
            <Badge count={order.orderItems.length}>
              <BellFilled className="text-[24px]" onClick={showOrderModal} />
            </Badge>
          </span>
        )}
        <Button
          icon={<UserOutlined />}
          className="uppercase tracking-wide text-white font-semibold bg-primary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      {/* Modals */}
      <Modal
        title="Order Product"
        open={isOrderModalOpen}
        onCancel={handleCancelOrderModal}
        footer={[
          <Button
            key="read"
            type="primary"
            onClick={handleOrderRead}
            style={{ color: "white", background: "red" }}
          >
            Read
          </Button>,
        ]}
      >
        <List
          className="bg-gray-200/50 px-5 rounded-md"
          dataSource={ordersData}
          renderItem={(item: TOrder) => {
            return (
              <List.Item>{` ${item.name}, has ordered. ${item.orderNumber}`}</List.Item>
            );
          }}
        />
      </Modal>

      <Modal
        title="Product Reviews"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="read"
            type="primary"
            onClick={handleRead}
            style={{ color: "white", background: "red" }}
          >
            Read
          </Button>,
        ]}
      >
        <List
          className="bg-gray-200/50 px-5 rounded-md"
          dataSource={reviewsData}
          renderItem={(item: TReview) => {
            return (
              <List.Item>{`Name: ${item.name}, Comments: ${item.description}`}</List.Item>
            );
          }}
        />
      </Modal>

      {/* User icon for small devices */}
      <div className="md:hidden relative">
        <Button type="primary" danger shape="circle">
          <UserOutlined
            className="text-[24px]"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
        </Button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-44 flex flex-col justify-center items-center bg-white border rounded-lg shadow-lg z-50">
            {user?.role === "superAdmin" && (
              <div className="p-2">
                <Badge
                  count={review.reviewItems.length}
                  className="block mb-2 mt-3"
                >
                  <MailOutlined className="text-[24px]" onClick={showModal} />
                </Badge>
                <Badge
                  count={order.orderItems.length}
                  className="block mb-2 mt-3"
                >
                  <BellFilled
                    className="text-[24px]"
                    onClick={showOrderModal}
                  />
                </Badge>
              </div>
            )}
            <Button
              icon={<UserOutlined />}
              className="w-full uppercase tracking-wide text-white font-semibold bg-primary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CustomeHeader;
