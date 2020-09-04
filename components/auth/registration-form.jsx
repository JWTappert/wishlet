import React, {useState} from "react";
import {useRouter} from "next/router";
import {Card, Form, Input, Button, Typography} from "antd";
import firebase from "firebase";
import {mapUserData, setUserCookie} from "./index";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { span: 32 },
};

export default function RegistrationForm({}) {
  const { Title, Text, Link } = Typography;
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSignIn, setIsSignIn] = useState(false);

  const handleSignIn = values => {
    const { email, password } = values;
    setError(null);
    setLoading(true);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function({ user }) {
        setLoading(false);
        const userData = mapUserData()
        setUserCookie(userData);
        router.push('/');
      })
      .catch(function(error) {
      setError({code: error.code, message: error.message });
      setLoading(false);
    });
  }

  const handleRegister = values => {
    const { email, password } = values;
    setError(null);
    setLoading(true);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      setError({code: error.code, message: error.message });
      setLoading(false);
    });
  }

  return (
      <Card style={{ width: '50%', textAlign: 'center' }}>
        <Title>{isSignIn ? 'Sign In' : 'Register' }</Title>
        <Form {...layout} name="register" form={form} onFinish={isSignIn ? handleSignIn : handleRegister} scrollToFirstError>
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
            {!isSignIn && (
              <Text>Already have an account? <Link onClick={() => setIsSignIn(true)}>Sign in</Link>.</Text>
            )}
            {isSignIn && (
              <Text>Don't have an account? <Link onClick={() => setIsSignIn(false)}>Register</Link>.</Text>
            )}
          </Form.Item>
          {error && (<Form.Item style={{ justifyContent: 'center' }}>
            <Text style={{ color: 'red' }}>{error.message}</Text>
          </Form.Item>)}
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isSignIn ? 'Sign in' : 'Register'}</Button>
          </Form.Item>
        </Form>
      </Card>
  )
}