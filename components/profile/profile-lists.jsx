import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Tabs, Layout, Menu, Button, Typography } from "antd";
import { WishlistsContext } from "contexts/wishlists-context";
import { AddWishlistModal } from "../wishlist";

const { TabPane } = Tabs;
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function ProfileList({ handleWishlistAdded, handleItemAdded }) {
  const { state } = useContext(WishlistsContext);
  const { loading, wishlists, error } = state;
  const [showAddWishlist, setShowAddWishlist] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  function handleCancelAddWishlist() {
    setShowAddWishlist(false);
  }

  return (
    <>
      <StyledTabs defaultActiveKey="1" style={{ height: "85%" }}>
        <TabPane tab="Your Wishlists" key="1" style={{ height: "100%" }}>
          <Layout style={{ height: "100%" }}>
            <StyledSider>
              <Menu>
                {wishlists &&
                  wishlists.map((list, i) => (
                    <Menu.Item key={i} onClick={() => setSelectedList(list)}>
                      {list.name}
                    </Menu.Item>
                  ))}
              </Menu>
            </StyledSider>
            <Content>
              <StyledHeader>
                {/*{selectedList && (*/}
                {/*  <>*/}
                {/*    <Title>{selectedList.name}</Title>*/}
                {/*    <Button onClick={handleAddListItem}>Add Item</Button>*/}
                {/*  </>*/}
                {/*)}*/}
                <Button onClick={() => setShowAddWishlist(true)}>
                  Add List
                </Button>
              </StyledHeader>
              {/*{selectedList &&*/}
              {/*  selectedList.items.map((item) => (*/}
              {/*    <React.Fragment>*/}
              {/*      <Title>{item.name}</Title>*/}
              {/*      <Text>{item.link}</Text>*/}
              {/*    </React.Fragment>*/}
              {/*  ))}*/}
            </Content>
          </Layout>
        </TabPane>
        <TabPane tab="Your Friend's Wishlists" key="2">
          Content of Tab Pane 2
        </TabPane>
      </StyledTabs>
      <AddWishlistModal
        addListVisible={showAddWishlist}
        cancelClick={handleCancelAddWishlist}
      />
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
  border-top: 1px solid gainsboro;
  border-right: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
`;
const StyledSider = styled(Sider)`
  border: 1px solid gainsboro;
  background: transparent;
`;
