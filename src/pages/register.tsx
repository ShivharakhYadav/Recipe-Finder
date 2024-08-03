import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import AxiosInstance from "../utils/ApiServices";
import { API_URL } from "../utils/constant";
import { Link, useNavigate } from "react-router-dom";

type RegisterTypes = {
  name: string;
  email: string;
  password: string;
};

const FormItem = Form.Item<RegisterTypes>;

const Register = () => {
  const navigate = useNavigate();
  const [form] = useForm();

  const handleRegister = async (data: RegisterTypes) => {
    try {
      const response = await AxiosInstance.post(API_URL.register, data);
      if (response.data.status) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Join Us</h1>
      <Form
        name="RegisterForm"
        form={form}
        onFinish={handleRegister}
        style={{ width: 500 }}
        title="modal-classes"
      >
        <FormItem
          htmlFor="name"
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "*Name is Required",
            },
          ]}
        >
          <Input id="email" />
        </FormItem>
        <FormItem
          htmlFor="email"
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "*Email is Required",
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter Valid Email",
            },
          ]}
        >
          <Input id="email" />
        </FormItem>
        <FormItem
          htmlFor="password"
          label="Password"
          name="password"
          rules={[
            { required: true, message: "*Password is Required" },
            {
              min: 8,
              message: "Password length must be 8 character",
            },
          ]}
        >
          <Input id="password" />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </FormItem>
      </Form>
      <span>Already have a account</span> <Link to="/">Sign in</Link>
    </div>
  );
};
export default Register;
