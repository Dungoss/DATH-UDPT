import { Button, Checkbox, Form, Input } from 'antd';

import './styles.css';
import AuthUser from '../../components/auth/AuthUser';

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const Login = () => {
  const { http, setToken } = AuthUser();

  const handleToSignup = () => {
    window.location.href = '/signup';
  };
  const onFinish = (values) => {
    http
      .post('https://udpt-user-service.000webhostapp.com/api/login', {
        email: values.username,
        password: values.password,
      })
      .then((res) => {
        setToken(res.data.user, res.data.access_token);
      });
  };
  return (
    <div className="login">
      <div className="login-form">
        <div className="signup-title">
          <h1>Đăng nhập</h1>
        </div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
            width: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <span className="no-account">Haven&apos;t got an account? </span>
          <span className="redirect-login" onClick={handleToSignup}>
            Signup
          </span>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" style={{ marginTop: '24px' }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export { Login };
