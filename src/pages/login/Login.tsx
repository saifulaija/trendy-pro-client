/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { verifyToken } from "../../utils/verifiToken";
import { setUser } from "../../redux/features/auth/authSlice";
import { TUser } from "../../types/global.type";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/images/PNG-Richkid-Logo.png";
import { GiCheckMark } from "react-icons/gi";
import { Divider } from "antd";

const Login = () => {
  const [loading, setLoading] = useState(false);
  console.log(loading);

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const dispatch = useAppDispatch();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);

    try {
      const userInfo = {
        email: values.email,
        password: values.password,
      };

      login(userInfo);
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged In successfully");
      setLoading(false);
      if (user.role === "user") {
        navigate(from, { replace: true });
      } else {
        navigate("/superAdmin/dashboard");
      }
    } catch (error) {
      toast.error((error as any)?.data?.message || "An error occurred");
    }
  };

  const parent = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  
  return (
    <main className="mt-12 md:lg:mt-20">
      <div className=" px-4 sm:px-2 w-full flex flex-col sm:flex-row justify-around gap-5 items-center">
        <motion.div
          variants={parent}
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeInOut", duration: 1, delay: 1 }}
          className=" md:px-40 px-3 w-full md:lg:w-1/2 "
        >
          <h2 className=" text-2xl uppercase">Discover all the benefits</h2>
          <p className=" text-sm pt-8">
            Create an account to enhance your shopping experience whit the help
            of our customized services:
          </p>
          <div className="pt-6 ps-5 text-sm grid grid-flow-row gap-3">
            <p className="flex gap-2 items-center">
              <GiCheckMark className="text-[10px]"></GiCheckMark>Seep up to date
              with the latest news{" "}
            </p>
            <p className="flex gap-2 items-center">
              <GiCheckMark className="text-[10px]"></GiCheckMark>Buy faster
            </p>
            <p className="flex gap-2 items-center">
              <GiCheckMark className="text-[10px]"></GiCheckMark>Save your
              favorite products
            </p>
          </div>
          <div className=" mt-8">
            <p className="text-lg">DON'T HAVE AN ACCOUNT?</p>
            <p className="text-sm mt-5">
              Create an account and Register yourself as Club member! Only club
              members can enjoy exclusive benefits.
            </p>
          </div>
          <Link to="/register">
            <Button className="w-full border hover:bg-orange-600 border-slate-700  rounded-md px-2 py-1.5  mt-5 hover:text-white  text-slate-800">
              Register Now
            </Button>
          </Link>
        </motion.div>
        <Divider type="vertical" orientation="right">
          Right Text
        </Divider>

        <div className="flex justify-center max-lg:border-t max-lg:pt-12 w-full lg:w-1/2 lg:border-l">
          <motion.div
            variants={parent}
            initial="hidden"
            animate="visible"
            transition={{ ease: "easeInOut", duration: 1, delay: 1 }}
            className=" max-w-[1300px] md:lg:max-w-[500px] w-full px-4 py-6 md:lg:w-1/2 rounded-lg "
          >
            <motion.div
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex items-center justify-center"
            >
              <img
                src={logo}
                alt="trendy"
                className="h-[50px] w-[100px] mt-2 object-fill mr-4 rounded"
              />
            </motion.div>
            <h2 className="text-2xl font-bold mb-4 text-center text-primary">
              Login TrendyLeather
            </h2>
            <Form
              name="register"
              onFinish={onFinish}
              layout="vertical"
              className="space-y-4 w-full"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email" },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters long",
                  },
                ]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
              <Link to="/forget-password">
                <p className="text-end underline py-1">Forget Password?</p>
              </Link>
              <Form.Item>
                <Button
                  className="btn"
                  loading={isLoading}
                  htmlType="submit"
                  block
                >
                  Login Now
                </Button>
                <div className="text-center mt-4 ">
                  New user?
                  <span className="text-blue-300">
                    <Link to="/register"> Register Here</Link>
                  </span>
                </div>
              </Form.Item>
            </Form>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Login;
