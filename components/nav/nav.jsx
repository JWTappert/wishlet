import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { Avatar, Input, Menu, Modal, Layout } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { AuthContext } from "contexts/auth-context";
import {signOut} from "utils/aws/auth";
import WishletIcon from "../icons/wishlet";
const { Header } = Layout;
const { SubMenu } = Menu;

export default function Nav({}) {
  const user = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState("");
  const router = useRouter();

  return (
    <>
      <Header>
        <Logo onClick={() => router.push("/")}>
          <WishletIcon />
        </Logo>
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
            <StyledSubMenu
              style={{ span: {margin: '0 5px'}}}
              icon={user.photoURL ? <Avatar size="small" src={user.photoURL} /> : <UserOutlined />}
              title={user.displayName ? user.displayName : 'User'}
            >
              <Menu.Item>
                <Link href="/[uid]/profile" as={`/${user.username}/profile`}>
                  <a>Profile</a>
                </Link>
              </Menu.Item>
              <Menu.Item onClick={() => signOut()}>Sign Out</Menu.Item>
            </StyledSubMenu>
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

const StyledSubMenu = styled(SubMenu)`
  span {
    margin: 0 5px;
  }
`;

const Logo = styled.div`
  width: 150px;
  float: left;
  padding: 10px;
`;
