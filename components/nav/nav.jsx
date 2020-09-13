import React, { useState, useCallback, useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Input, Menu, Modal, Layout } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { UserContext } from "contexts/user-context";
const { Header } = Layout;

export default function Nav({}) {
  const { user, signOut } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState("");
  const router = useRouter();
  const { SubMenu } = Menu;

  return (
    <>
      <Header>
        <Logo onClick={() => router.push("/")} />
        <Menu theme={"dark"} mode="horizontal" style={{ textAlign: "right" }}>
          <Menu.Item icon={<PlusOutlined />} onClick={() => setShowModal(true)}>
            List
          </Menu.Item>
          {!user && (
            <Menu.Item
              icon={<UserOutlined />}
              onClick={() => router.push("/signin")}
            >
              Sign In
            </Menu.Item>
          )}
          {user && (
            <SubMenu icon={<UserOutlined />} title="User">
              <Menu.Item onClick={() => router.push(`/[${user.uid}]/profile`)}>
                Profile
              </Menu.Item>
              <Menu.Item onClick={signOut}>Sign Out</Menu.Item>
            </SubMenu>
          )}
        </Menu>
      </Header>
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
          onChange={({ target }) => setListName(target.value)}
          onPressEnter={({ target }) => onFinish(target.value)}
        />
      </Modal>
    </>
  );
}

const Logo = styled.div`
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
`;
