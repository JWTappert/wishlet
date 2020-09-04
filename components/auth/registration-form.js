import React, {useState, useEffect} from "react";
import {Card, Form, Input, Button, Typography} from "antd";
import firebase from "firebase";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { span: 32 },
};

export default function RegistrationForm({}) {
  const { Title, Text } = Typography;
  const [form] = Form.useForm();
  const [error, setError] = useState(null);

  const handleSubmit = values => {
    const { email, password } = values;
    setError(null);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      setError({code: error.code, message: error.message });
    });
  }

  return (
      <Card style={{ width: '50%', textAlign: 'center' }}>
        <Title>Register</Title>
        <Form {...layout} name="register" form={form} onFinish={handleSubmit} scrollToFirstError>
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
          {error && (<Form.Item style={{ justifyContent: 'center' }}>
            <Text style={{ color: 'red' }}>{error.message}</Text>
          </Form.Item>)}
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Card>
  )
}