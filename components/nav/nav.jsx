import React from "react";
import {Menu} from "antd";
import {PlusCircleOutlined, UserOutlined} from "@ant-design/icons";

export default function Nav({}) {
  return (
    <Menu theme={'dark'} mode="horizontal" style={{textAlign: 'right'}}>
      <Menu.Item icon={<PlusCircleOutlined />}>List</Menu.Item>
      <Menu.Item icon={<UserOutlined />}>Login</Menu.Item>
    </Menu>
  )
}