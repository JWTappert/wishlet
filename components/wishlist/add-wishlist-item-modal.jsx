import React, {useContext, useState} from "react";
import { Button, Form, Input, Modal } from "antd";
import {WishlistsContext} from "contexts/wishlists-context";

export default function AddWishlistItemModal({ wishlistId, open, toggleOpen }) {
  const { addItemToWishlist } = useContext(WishlistsContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  function handleCancel() {
    form.resetFields();
  }

  function handleSubmit() {
    setLoading(true);
    form.validateFields()
      .then(values => {
        addItemToWishlist(wishlistId, { name: values.name, link: values.link })
          .then(() => {
            setLoading(false)
            toggleOpen(!open);
          })
          .catch(error => {
            setLoading(false);
            console.error(error)
          });
      })
      .catch(errorInfo => {
        setLoading(false);
        console.error(errorInfo);
        /*
        errorInfo:
          {
            values: {
              username: 'username',
              password: 'password',
            },
            errorFields: [
              { password: ['username'], errors: ['Please input your Password!'] },
            ],
            outOfDate: false,
          }
        */
      });
  }

  return (
    <Modal
      title="Add an Item"
      visible={open}
      onCancel={() => toggleOpen(!open)}
      onOk={() => console.log('ok')}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item label="Name" name="name" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
          <Form.Item label="Link" name="link" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
}
