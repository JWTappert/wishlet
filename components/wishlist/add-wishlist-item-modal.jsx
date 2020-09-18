import React, {useContext, useEffect} from "react";
import { Button, Form, Input, Modal } from "antd";
import {WishlistContext} from "contexts/wishlist-context";

export default function AddWishlistItemModal({ wishlistId, open, toggleOpen }) {
  const {state, getWishlist , addItem } = useContext(WishlistContext);
  const { loading, error } = state;
  const [form] = Form.useForm();

  useEffect(() => {
    getWishlist(wishlistId)
  }, [wishlistId]);

  function handleCancel() {
    form.resetFields();
    toggleOpen(!open);
  }

  function handleSubmit() {
    form.validateFields()
      .then(values => {
        addItem(wishlistId, { name: values.name, link: values.link });
        form.resetFields();
        toggleOpen(!open);
      })
      .catch(errorInfo => {
        console.error(errorInfo);
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
        <Button key="submit" type="primary" onClick={handleSubmit}>
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
