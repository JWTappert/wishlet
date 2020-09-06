import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Tabs, Layout, Menu, Button, Modal, Input } from "antd";

const { TabPane } = Tabs;
const { Header, Sider, Content } = Layout;

export default function ProfileList({ wishlists, handleWishlistAdded }) {
  const [visible, setVisible] = useState(false);
  const [wishlistName, setWishlistName] = useState("");

  function handleCancel() {
    setWishlistName("");
    setVisible(false);
  }

  function handleAddListClick() {
    setVisible(true);
  }

  function handleOkClick() {
    handleWishlistAdded(wishlistName)
      .then(() => setVisible(false))
      .catch((error) => console.error(error));
  }

  return (
    <>
      <StyledTabs defaultActiveKey="1" style={{ height: "85%" }}>
        <TabPane tab="Your Wishlists" key="1" style={{ height: "100%" }}>
          <Layout style={{ height: "100%" }}>
            <StyledSider>
              <Menu>
                {wishlists &&
                  wishlists.map((list) => (
                    <Menu.Item key={list.id}>{list.name}</Menu.Item>
                  ))}
              </Menu>
            </StyledSider>
            <Content>
              <StyledHeader>
                <Button onClick={handleAddListClick}>Add List</Button>
              </StyledHeader>
              Content
            </Content>
          </Layout>
        </TabPane>
        <TabPane tab="Your Friend's Wishlists" key="2">
          Content of Tab Pane 2
        </TabPane>
      </StyledTabs>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOkClick}
        bodyStyle={{ padding: "48px 24px 24px 24px" }}
      >
        <Input
          placeholder="Wishlist Name"
          value={wishlistName}
          onChange={(e) => setWishlistName(e.target.value)}
        />
      </Modal>
    </>
  );
}

const StyledTabs = styled(Tabs)`
  div.ant-tabs-content {
    height: 100%;
  }
`;
const StyledHeader = styled(Header)`
  background: transparent;
  align-items: end;
  border: 1px solid black;
`;
const StyledSider = styled(Sider)`
  border: 1px solid black;
  background: transparent;
`;
