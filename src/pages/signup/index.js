import { Button, Checkbox, Form, Input, Select, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';

import './styles.css';
import AuthUser from '../../components/auth/AuthUser';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { http } = AuthUser();
  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    http.post('/register', { email: values.email, password: values.password, name: values.username }).then((res) => {
      console.log(res);
      navigate('/login');
    });
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const handleToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className="signup">
      <div className="signup-form">
        <div className="signup-title">
          <h1>Đăng ký</h1>
        </div>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          style={{
            maxWidth: 600,
            width: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item label="Ngày sinh">
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <span className="no-account">Already have an account? </span>
          <span className="redirect-login" onClick={handleToLogin}>
            Login
          </span>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export { Signup };
