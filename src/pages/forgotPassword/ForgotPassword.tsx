/* eslint-disable @typescript-eslint/no-explicit-any */

import { Alert, Button, Form, Input } from "antd";
import { motion } from "framer-motion";
import { MdOutlineKey } from "react-icons/md";
import { useForgetPasswordMutation } from "../../redux/features/auth/authApi";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState('')
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const onFinish = async (values: { email: string }) => {
    const userInfo = {
      email: values.email,
    };

    try {
      const res:any= await forgetPassword(userInfo);
      console.log(res)

      if ('data' in res && res?.data?.message) {
        setSuccessMessage(res?.data?.message);
        setErrorMessage('')
      }else{

             
        setErrorMessage( res?.error?.data?.message)
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const parent = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  

  return (
    <div className="w-full flex justify-center mt-32">
      <motion.div
        variants={parent}
        initial="hidden"
        animate="visible"
        transition={{ ease: "easeInOut", duration: 1, delay: 1 }}
        className="max-w-[500px] w-full py-10 px-12 rounded-lg border-[1px] border-gray-200 shadow-sm bg-white"
      >
        <motion.div
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex flex-col items-center justify-center space-y-0"
        >
          <MdOutlineKey className="text-5xl text-primary" />
          <h2 className="text-2xl font-bold my-4 text-center text-primary">
            Forgot Password
          </h2>
        </motion.div>

        {errorMessage && <Alert
      message="Warning"
      description={errorMessage}
      type="warning"
      showIcon
     
    />}

        {successMessage ? (
          <Alert
            message="Reset Link"
            description={successMessage}
            type="success"
            showIcon
          />
        ) : (
          <Form
            name="reset-password"
            onFinish={onFinish}
            layout="vertical"
            className="space-y-4 my-10"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email address" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input placeholder="Enter your registered email address" />
            </Form.Item>
            <Form.Item>
              <Button
                className="btn"
                loading={isLoading}
                htmlType="submit"
                block
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
