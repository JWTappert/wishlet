import React, {useState} from "react";
import {useRouter} from "next/router";
import {Card, Form, Input, Button, Typography} from "antd";
import {signIn, signUp} from "utils/firebase";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { span: 32 },
};

export default function SignUpForm({}) {
  const { Title, Text, Link } = Typography;
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = values => {
    const { email, password } = values;
    setError(null);
    setLoading(true);
    signIn(email, password)
      .then(() => router.push('/'))
      .catch((error) => {
      setError({code: error.code, message: error.message });
      setLoading(false);
    });
  }

  const handleRegister = values => {
    const { email, password } = values;
    setError(null);
    setLoading(true);
    signUp(email, password)
      .then(() => router.push('/'))
      .catch((error) => {
      setError({code: error.code, message: error.message });
      setLoading(false);
    });
  }

  return (
      <Card style={{ width: '50%', textAlign: 'center' }}>
        <Title>{isSignUp ? 'Sign Up' : 'Sign In'}</Title>
        <Form {...layout} name="register" form={form} onFinish={isSignUp ? handleRegister : handleSignIn} scrollToFirstError>
          <Form.Item
            style={{ marginBottom: '1em'}}
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'This is not valid email',
              },
              {
                required: true,
                message: 'Please input your email',
              },
            ]}
            hasFeedback
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '1em'}}
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password',
              },
              {
                min: 8,
                message: 'Minimum length of 8 characters'
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item style={{ justifyContent: 'center' }}>
            {!isSignUp && (
              <Text>Don't have an account? <Link onClick={() => setIsSignUp(true)}>Sign Up</Link>.</Text>
            )}
            {isSignUp && (
              <Text>Already have an account? <Link onClick={() => setIsSignUp(false)}>Sign in</Link>.</Text>
            )}
          </Form.Item>
          {error && (<Form.Item style={{ justifyContent: 'center' }}>
            <Text style={{ color: 'red' }}>{error.message}</Text>
          </Form.Item>)}
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isSignUp ? 'Sign Up' : 'Sign in'}</Button>
          </Form.Item>
        </Form>
      </Card>
  )
}