import React, { useState, useEffect, useCallback } from "react";
import {Input, Menu, Modal} from "antd";
import {PlusOutlined, UserOutlined} from "@ant-design/icons";
import {onAuthStateChange, signIn, signOut, UserContext} from "utils/firebase";

export default function Nav({}) {
  const [user, setUser] = useState({ loggedIn: false });
  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    }
  }, []);

  const requestSignIn = useCallback((email, password) => {
    signIn(email, password);
  });
  const requestSignOut = useCallback(() => {
    signOut();
  }, []);

  return (
    <UserContext.Provider value={user}>
    <Menu theme={'dark'} mode="horizontal" style={{textAlign: 'right'}}>
      <Menu.Item icon={<PlusOutlined />} onClick={() => setShowModal(true)}>List</Menu.Item>
      {user.loggedIn ?
        <Menu.Item icon={<UserOutlined />} onClick={requestSignOut}>Logout</Menu.Item> :
        <Menu.Item icon={<UserOutlined />} onClick={requestSignIn}>Login</Menu.Item>
      }
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
      </UserContext.Provider>
  )
}