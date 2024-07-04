import { Button, Form, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { TResponse, TUser } from "../../types/global.type";
import { useCreateUserMutation } from "../../redux/features/user/userApi";

import { motion } from "framer-motion";
import logo from "../../assets/images/PNG-Richkid-Logo.png";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifiToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";

const Register = () => {
  const [register, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    const userInfo = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: "user",
    };

    try {
      const res = (await register(userInfo)) as TResponse<TUser>;
      console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else {
        const res = await login({
          email: values?.email,
          password: values?.password,
        }).unwrap();
        const user = verifyToken(res.data.accessToken) as TUser;
        dispatch(setUser({ user: user, token: res.data.accessToken }));

        if (user.role === "user") {
          navigate(from, { replace: true });
        } else {
          navigate("/");
        }

        toast.success("User created successfully");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const parent = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        variants={parent}
        initial="hidden"
        animate="visible"
        transition={{ ease: "easeInOut", duration: 1, delay: 1 }}
        className="max-w-[500px] w-full p-4 rounded-lg border-[3px] shadow border-neutral-100"
      >
        <div className="flex items-center justify-center mb-4">
          <img
            src={logo}
            alt="trendy"
            className="h-[50px] w-[100px] mt-2 object-fill mr-4 rounded"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center text-textprimary">
          Register Now
        </h2>
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            label="Your Name"
            name="name"
            rules={[
              { required: true, message: "Please input your userName" },
              { type: "string", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="Enter user name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Please enter a valid email address" },
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

          <p className="text-gray-600 text-sm text-blance">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our privacy policy.
          </p>

          <Form.Item>
            <Button className="btn" loading={isLoading} htmlType="submit" block>
              Submit
            </Button>
            <div className="text-center mt-4">
              Already have an account?{" "}
              <span className="text-blue-400">
                <Link to="/login">Login Here</Link>
              </span>
            </div>
          </Form.Item>
        </Form>
      </motion.div>
    </div>
  );
};

export default Register;
