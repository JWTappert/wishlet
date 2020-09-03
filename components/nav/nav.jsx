import React, { useState } from "react";
import {Input, Menu, Modal} from "antd";
import {PlusOutlined, UserOutlined} from "@ant-design/icons";

export default function Nav({}) {
  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState('');

  function onFinish(name) {

  }

  return (
    <>
    <Menu theme={'dark'} mode="horizontal" style={{textAlign: 'right'}}>
      <Menu.Item icon={<PlusOutlined />} onClick={() => setShowModal(true)}>List</Menu.Item>
      <Menu.Item icon={<UserOutlined />}>Login</Menu.Item>
    </Menu>
      <Modal
        title="Create a wishlist"
        visible={showModal}
        onOk={() => console.log(listName)}
        onCancel={() => setShowModal(false)}
        okText="Create"
      >
        <Input
          type="text"
          placeholder="Wishlist Name"
          value={listName}
          onChange={({target}) => setListName(target.value)}
          onPressEnter={({target}) => onFinish(target.value)}
        />
      </Modal>
      </>
  )
}