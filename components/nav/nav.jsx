import React, { useState, useEffect, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import {Input, Menu, Modal} from "antd";
import {PlusOutlined, UserOutlined} from "@ant-design/icons";
import {signOut, UserContext} from "utils/firebase";

export default function Nav({}) {
  const user = useContext(UserContext)
  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState('');
  const router = useRouter();
  const { SubMenu } = Menu;

  const requestSignOut = useCallback(() => {
    signOut();
  }, []);

  return (
    <>
    <Menu theme={'dark'} mode="horizontal" style={{textAlign: 'right'}}>
      <Menu.Item icon={<PlusOutlined />} onClick={() => setShowModal(true)}>List</Menu.Item>
      {!user.loggedIn && <Menu.Item icon={<UserOutlined />} onClick={requestSignOut}>Sign Out</Menu.Item>}
      {user.loggedIn &&
        (<SubMenu icon={<UserOutlined />} title="User">
          <Menu.Item onClick={() => router.push(`/${user.uid}/profile`)}>Profile</Menu.Item>
          <Menu.Item onClick={() => router.push('/register')}>Sign Out</Menu.Item>
        </SubMenu>
      )}
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