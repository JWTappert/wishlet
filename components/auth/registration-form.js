import React from "react";
import {Card, Form, Input, Button, Typography} from "antd";
import firebase from "firebase";


export default function RegistrationForm({}) {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 10, span: 16 },
  };

  const handleSubmit = values => {
    const { email, password } = values;
    console.log({ email, password });
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log({ errorCode, errorMessage });
    });
  }

  return (
      <Card style={{ width: '50%' }}>
        <Title>Register</Title>
        <Form {...layout} form={form} onFinish={handleSubmit}>
          <Form.Item label="Email" name="email">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Card>
  )
}