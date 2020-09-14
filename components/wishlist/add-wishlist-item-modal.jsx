import React from "react";
import { Form, Input, Modal } from "antd";

export default function AddWishlistItemModal({ visible }) {
  return (
    <Modal
      title="Add an Item"
      // visible={addItemVisible}
      visible={visible}
      // onCancel={() => handleCancel(1)}
      // onOk={() => handleItemAddedOk()}
      bodyStyle={{ padding: "48px 24px 24px 24px" }}
    >
      <Form>
        <Form.Item label="Name">
          <Input
            type="text"
            onChange={(e) =>
              setItem((prevState) => {
                return { ...prevState, name: e.target.value };
              })
            }
          />
        </Form.Item>
        <Form.Item label="Link">
          <Input
            type="text"
            onChange={(e) =>
              setItem((prevState) => {
                return { ...prevState, link: e.target.value };
              })
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
