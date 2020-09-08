import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Tabs,
  Layout,
  Menu,
  Button,
  Modal,
  Input,
  Typography,
  Form,
} from "antd";

const { TabPane } = Tabs;
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function ProfileList({
  wishlists,
  handleWishlistAdded,
  handleItemAdded,
}) {
  const [addListVisible, setAddListVisible] = useState(false);
  const [addItemVisible, setAddItemVisible] = useState(false);
  const [wishlistName, setWishlistName] = useState("");
  const [selectedList, setSelectedList] = useState();
  const [item, setItem] = useState();

  function handleCancel(flag) {
    if (!flag) {
      setWishlistName("");
      setAddListVisible(false);
    } else {
      setWishlistName("");
      setAddItemVisible(false);
    }
  }

  function handleAddListClick(flag) {
    setAddListVisible(true);
  }

  function handleAddListItem() {
    setAddItemVisible(true);
  }

  function handleListAddedOk() {
    if (wishlistName) {
      handleWishlistAdded(wishlistName)
        .then(() => setAddListVisible(false))
        .catch((error) => console.error(error));
    }
  }

  function handleItemAddedOk() {
    if (selectedList.id && item.name && item.link) {
      handleItemAdded(selectedList.id, item)
        .then(() => setAddItemVisible(false))
        .catch((error) => console.error(error));
    }
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
                    <Menu.Item
                      key={list.id}
                      onClick={() => setSelectedList(list)}
                    >
                      {list.name}
                    </Menu.Item>
                  ))}
              </Menu>
            </StyledSider>
            <Content>
              <StyledHeader>
                {selectedList && (
                  <>
                    <Title>{selectedList.name}</Title>
                    <Button onClick={handleAddListItem}>Add Item</Button>
                  </>
                )}
                <Button onClick={handleAddListClick}>Add List</Button>
              </StyledHeader>
              {selectedList &&
                selectedList.items.map((item) => (
                  <React.Fragment>
                    <Title>{item.name}</Title>
                    <Text>{item.link}</Text>
                  </React.Fragment>
                ))}
            </Content>
          </Layout>
        </TabPane>
        <TabPane tab="Your Friend's Wishlists" key="2">
          Content of Tab Pane 2
        </TabPane>
      </StyledTabs>
      <Modal
        title="Add a List"
        visible={addListVisible}
        onCancel={() => handleCancel(0)}
        onOk={() => handleListAddedOk()}
        bodyStyle={{ padding: "48px 24px 24px 24px" }}
      >
        <Input
          placeholder="Wishlist Name"
          value={wishlistName}
          onChange={(e) => setWishlistName(e.target.value)}
        />
      </Modal>
      <Modal
        title="Add an Item"
        visible={addItemVisible}
        onCancel={() => handleCancel(1)}
        onOk={() => handleItemAddedOk()}
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
    </>
  );
}

const StyledTabs = styled(Tabs)`
  div.ant-tabs-content {
    height: 100%;
  }
`;
const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: 1px solid black;
`;
const StyledSider = styled(Sider)`
  border: 1px solid black;
  background: transparent;
`;
