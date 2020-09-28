import React, { useContext, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Tabs, Layout, Menu, Button, Typography } from "antd";
import { WishlistsContext } from "contexts/wishlists-context";
import { AddWishlistModal } from "../wishlist";
import ProfileListEditor from "./profile-list-editor";
import useQueryParam from "hooks/use-query-param";

const { TabPane } = Tabs;
const { Sider, Content } = Layout;

export default function ProfileList({}) {
  const { state, selectWishlist } = useContext(WishlistsContext);
  const { loading, wishlists, selectedWishlist, error } = state;
  const [showAddWishlist, setShowAddWishlist] = useState(false);

  return (
    <>
      <StyledTabs defaultActiveKey="1" style={{ height: "85%" }}>
        <TabPane tab="Your Wishlists" key="1" style={{ height: "100%" }}>
          <Layout style={{ height: "100%" }}>
            <StyledSider>
              <Menu>
                {wishlists &&
                  wishlists.map((list, i) => (
                    <Menu.Item key={i} onClick={() => selectWishlist(list)}>
                      {list.name}
                    </Menu.Item>
                  ))}
              </Menu>
            </StyledSider>
            <Content>
              <ProfileListEditor list={selectedWishlist} showAddWishlist={showAddWishlist} setShowAddWishlist={setShowAddWishlist} />
            </Content>
          </Layout>
        </TabPane>
        <TabPane tab="Your Friend's Wishlists" key="2">
          Content of Tab Pane 2
        </TabPane>
      </StyledTabs>
      <AddWishlistModal
        addListVisible={showAddWishlist}
        setAddListVisible={setShowAddWishlist}
      />
    </>
  );
}

const StyledTabs = styled(Tabs)`
  div.ant-tabs-content {
    height: 100%;
  }
`;
const StyledSider = styled(Sider)`
  border: 1px solid gainsboro;
  background: transparent;
`;
