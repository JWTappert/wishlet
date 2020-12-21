import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { Avatar, Input, Menu, Modal, Layout } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { AuthContext } from "contexts/auth-context";
import {signOut} from "utils/aws/auth";
import WishletIcon from "../icons/wishlet";
import {UserContext} from "contexts/user-context";
const { Header } = Layout;
const { SubMenu } = Menu;

export default function Nav({}) {
  const cognitoUser = useContext(AuthContext);
  const userActions = useContext(UserContext)
  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState("");
  const router = useRouter();

  function handleCreateWishlist() {
    userActions.createWishlist(listName);
    setListName('');
    setShowModal(false);
  }

  return (
    <>
      <Header>
        <Logo onClick={() => router.push("/")}>
          <WishletIcon />
        </Logo>
        <Menu theme={"dark"} mode="horizontal" style={{ textAlign: "right" }}>
          <Menu.Item onClick={() => setShowModal(true)}>
            <PlusOutlined />
          </Menu.Item>
          {!cognitoUser && (
            <Menu.Item
              icon={<UserOutlined />}
              onClick={() => router.push("/signin")}
            >
              Sign In
            </Menu.Item>
          )}
          {cognitoUser && (
            <StyledSubMenu
              style={{ span: {margin: '0 5px'}}}
              icon={cognitoUser.photoURL ? <Avatar size="small" src={cognitoUser.photoURL} /> : <UserOutlined />}
              title={cognitoUser.displayName ? cognitoUser.displayName : 'User'}
            >
              <Menu.Item>
                <Link href="/[uid]/profile" as={`/${cognitoUser.username}/profile`}>
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
        onOk={() => handleCreateWishlist(listName)}
        onCancel={() => setShowModal(false)}
        okText="Create"
      >
        <Input
          type="text"
          placeholder="Wishlist Name"
          value={listName}
          onChange={({ target }) => setListName(target.value)}
          onPressEnter={({ target }) => handleCreateWishlist(target.value)}
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
