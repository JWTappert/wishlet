import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {Tabs, Layout, Button} from 'antd';
import {addWishlist, getWishlistsForUser} from "utils/firebase";

const { TabPane } = Tabs;
const {Header, Sider, Content} = Layout;

export default function ProfileList({ userId }) {
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    getWishlistsForUser(userId)
      .then(wishlists => setWishlists(wishlists))
      .catch(error => console.error(error))
  })

  return (
    <StyledTabs defaultActiveKey="1" style={{height: '85%'}}>
      <TabPane tab="Your Wishlists" key="1" style={{height: '100%'}}>
        <Layout style={{height: '100%'}}>
          <StyledSider>Sider</StyledSider>
          <Content>
            <StyledHeader>
              <Button onClick={() => addWishlist(userId, 'stuff', 'https://google.com')}>Add List</Button>
            </StyledHeader>
            Content
          </Content>
        </Layout>
      </TabPane>
      <TabPane tab="Your Friend's Wishlists" key="2">
        Content of Tab Pane 2
      </TabPane>
    </StyledTabs>
  )
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