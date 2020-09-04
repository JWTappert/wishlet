import React, {useState, useEffect} from "react";
import {Card, Form, Input, Button, Typography} from "antd";
import firebase from "firebase";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};

export default function RegistrationForm({}) {
  const { Title } = Typography;
  const [form] = Form.useForm();

  const handleSubmit = values => {
    const { email, password } = values;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  return (
      <Card style={{ width: '50%' }}>
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
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Card>
  )
}