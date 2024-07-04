/* eslint-disable @typescript-eslint/no-explicit-any */
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Button,Col, Drawer, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { Link } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../redux/features/cart/cartSlice";
import NoDataFoundPage from "../../pages/noDataFoundPage/NoDataFoundPage";

import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { IoBagAddOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const ShoppingCart = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  console.log(cart)

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  // Function to get available quantity for a product size
  const getAvailableQuantity = (item: any) => {
    const sizeStock = item?.sizeStok?.find(
      (sizeItem: any) => sizeItem.size === item.size
    );
    return sizeStock ? sizeStock.stock : 0;
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);
  console.log(dropdownOpen);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };

  const handleDecreaseCart = (product: any) => {
    dispatch(decreaseCart(product));
  };

  const handleIncreaseCart = (product: any) => {
    const availableQuantity = getAvailableQuantity(product);
    if (availableQuantity > 0 && product.cartQuantity < availableQuantity) {
      dispatch(addToCart(product));
    } else {
      alert("Selected quantity exceeds available stock");
    }
  };

  const handleRemoveFromCart = (product: any) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };



  return (
    <div>
      <div className="flex items-center justify-center gap-4 text-sm bg-white  p-4 ">
        <div></div>
        <div>
          {user && (
            <Link to={`/${user?.role}/dashboard`}>
              <MdDashboard className="text-xl text-primary" />
            </Link>
          )}
        </div>
        <div>
          <Badge count={cart.cartItems.length ? cart.cartItems.length : 0}>
            <Button
              onClick={() => {
                setCartDrawerOpen(true);
              }}
              className=" bg-primary text-white flex items-center justify-center gap-1"
            >
              <IoBagAddOutline
                className=" font-semibold text-center"
                size={18}
              />
              <span className="font-semibold text-[14px]">
                ৳ {cart.cartTotalAmount}
              </span>
            </Button>
          </Badge>
        </div>

        <div>
          {user ? (
            <Button
              icon={<UserOutlined />}
              className="uppercase text-white tracking-wide font-semibold bg-primary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button
                icon={<UserOutlined />}
                className="uppercase text-white tracking-wide font-semibold bg-primary"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Your Cart"
        contentWrapperStyle={{ width: 600, margin: "0px 0px" }}
      >
        <div style={{ maxWidth: "1000px", margin: "0ox", padding: "0px 0px" }}>
          {cart.cartItems.length === 0 ? (
            <NoDataFoundPage />
          ) : (
            <>
              <Row
                justify="space-between"
                align="middle"
                className="text-gray-600"
              >
                <Col span={4}>
                  <Typography.Text
                    strong
                    className="text-gray-600 text- text-xs md:text-sm"
                  >
                    Product
                  </Typography.Text>
                </Col>
                <Col span={4}>
                  <Typography.Text
                    strong
                    className="text-gray-600 text- text-xs md:text-sm"
                  >
                    Price
                  </Typography.Text>
                </Col>
                <Col span={4}>
                  <Typography.Text
                    strong
                    className="text-gray-600 text- text-xs md:text-sm"
                  >
                    Size
                  </Typography.Text>
                </Col>
                <Col span={4}>
                  <Typography.Text
                    strong
                    className="text-gray-600 text- text-xs md:text-sm"
                  >
                    Quantity
                  </Typography.Text>
                </Col>
                <Col span={4}>
                  <Typography.Text
                    strong
                    className="text-gray-600 text- text-xs md:text-sm"
                  >
                    Total
                  </Typography.Text>
                </Col>
                <Col span={4}>
                  <Typography.Text
                    strong
                    className="text-gray-600 text- text-xs md:text-sm"
                  >
                    Action
                  </Typography.Text>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  {cart?.cartItems?.map((cartItem: any) => (
                    <div
                      key={cartItem.image}
                      style={{ height: "10" }}
                      className="border p-2 rounded-sm"
                    >
                      <Row justify="space-between" align="middle">
                        <Col span={4}>
                          <Typography.Text
                            strong
                            className="text-gray-500 text-xs overflow-hidden"
                          >
                            {cartItem?.name.length > 10
                              ? cartItem?.name.substring(0, 10) + "..."
                              : cartItem.name}
                          </Typography.Text>
                        </Col>
                        <Col span={4}>
                          <Typography.Text
                            strong
                            className="text-gray-500 text-xs"
                          >
                            ৳{cartItem?.price}
                          </Typography.Text>
                        </Col>
                        <Col span={4}>
                          <Typography.Text
                            strong
                            className="text-gray-500 text-xs"
                          >
                            size {cartItem?.size}
                          </Typography.Text>
                        </Col>
                        <Col span={4}>
                          <div className="flex items-center justify-center gap-1 md:gap-2">
                            <button
                              className="bg-gray-200 text-xs hover:bg-gray-300 text-gray-600 font-semibold px-2 py-1 rounded-md focus:outline-none"
                              onClick={() => handleDecreaseCart(cartItem)}
                            >
                              -
                            </button>
                            <span className="text-gray-800">
                              {cartItem.cartQuantity}
                            </span>
                            <button
                              className="bg-gray-200 hover:bg-gray-300 text-xs text-gray-600 font-semibold px-2 py-1 rounded-md focus:outline-none"
                              onClick={() => handleIncreaseCart(cartItem)}
                            >
                              +
                            </button>
                          </div>
                        </Col>
                        <Col span={4}>
                          <Typography.Text
                            strong
                            className="text-gray-500 text-xs ml-2"
                          >
                            ৳
                            {Math.round(
                              cartItem?.price -
                                (cartItem?.price * cartItem?.discount) / 100
                            ) * cartItem.cartQuantity}
                            {/* ৳{cartItem?.price * cartItem.cartQuantity} */}
                          </Typography.Text>
                        </Col>
                        <Col span={4}>
                          <Button
                            type="link"
                            onClick={() => handleRemoveFromCart(cartItem)}
                          >
                            <IoClose color="red" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Col>
              </Row>

              <div className="flex justify-around items-center">
                <Button
                  onClick={() => handleClearCart()}
                  type="link"
                  icon={<LeftOutlined />}
                  className=""
                >
                  Clear Cart
                </Button>
                <p className="text-gray-500 font-semibold">
                  Sub Total: ৳{cart?.cartTotalAmount}
                </p>
              </div>

              <div className="p-4 flex flex-col items-center justify-center space-x-4">
                <div className=" w-full max-w-md   p-6">
                  <Typography.Text type="secondary" className="mb-8">
                    Taxes and shipping calculated at checkout.
                  </Typography.Text>
                  <div>
                    {user ? (
                      <Link to="/checkout" className="w-full">
                        <Button
                          className="btn"
                          onClick={() => setCartDrawerOpen(false)}
                          block
                          icon={<LeftOutlined />}
                        >
                          Checkout
                        </Button>
                      </Link>
                    ) : (
                      <Link to="/login" className="w-full">
                        <Button
                          className="btn"
                          onClick={() => setCartDrawerOpen(false)}
                          block
                          icon={<LeftOutlined />}
                        >
                          Checkout
                        </Button>
                      </Link>
                    )}
                  </div>
                  <div className="mt-5 mb-5 w-full">
                    <Link to="/" className="w-full">
                      <Button
                        onClick={() => setCartDrawerOpen(false)}
                        className=" bg-primary text-white uppercase tracking-wider font-semibold"
                        block
                        icon={<LeftOutlined />}
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default ShoppingCart;
