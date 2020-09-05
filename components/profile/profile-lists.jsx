import React from "react";
import styled from "styled-components";
import { Tabs, Layout } from 'antd';

const { TabPane } = Tabs;
const {Header, Sider, Content} = Layout;

export default function ProfileList() {
  return (
    <Tabs defaultActiveKey="1" style={{height: '85%'}}>
      <TabPane tab="Your Wishlists" key="1" style={{height: '100%'}}>
        <Layout style={{height: '100%'}}>
          <StyledSider>Sider</StyledSider>
          <Content>
            <StyledHeader>Header</StyledHeader>
            Content
          </Content>
        </Layout>
      </TabPane>
      <TabPane tab="Your Friend's Wishlists" key="2">
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  )
}

const StyledHeader = styled(Header)`
  background: transparent;
  border: 1px solid black;
`;
const StyledSider = styled(Sider)`
  border: 1px solid black;
  background: transparent;
`;