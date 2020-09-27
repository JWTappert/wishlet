import React, { useState, useContext } from "react";
import { Form, Input, Modal } from "antd";
import { WishlistsContext } from "contexts/wishlists-context";
import useQueryParam from "hooks/use-query-param";

export default function AddWishlistModal({ addListVisible, setAddListVisible }) {
  const uid = useQueryParam("uid");
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const { addWishlist } = useContext(WishlistsContext);

  function handleFinish(values) {
    addWishlist(values.name, uid);
    setAddListVisible(!addListVisible)
  }

  function handleOk() {
    addWishlist(form.getFieldValue("name"), uid);
    setAddListVisible(!addListVisible)
  }

  return (
    <Modal
      title="Add a List"
      visible={addListVisible}
      onCancel={() => setAddListVisible(!addListVisible)}
      onOk={() => handleOk()}
      bodyStyle={{ padding: "24px" }}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Wishlist Name" name="name">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            rules={[{ required: true }]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
