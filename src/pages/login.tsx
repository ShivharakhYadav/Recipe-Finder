import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import AxiosInstance from "../utils/ApiServices";
import { API_URL } from "../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { saveToken } from "../utils/helper";

type LoginTypes = {
  email: string;
  password: string;
};

const FormItem = Form.Item<LoginTypes>;

const Login = () => {
  const navigate = useNavigate();
  const [form] = useForm();

  const handleLogin = async (data: LoginTypes) => {
    try {
      const response = await AxiosInstance.post(API_URL.login, data);
      if (response.data.status) {
        saveToken(response.data.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome Back</h1>
      <Form
        name="LoginForm"
        form={form}
        onFinish={handleLogin}
        style={{ width: 500 }}
      >
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
            Login
          </Button>
        </FormItem>
      </Form>
      <span>Don't have a account</span> <Link to="/register">Sign up Now</Link>
    </div>
  );
};
export default Login;
