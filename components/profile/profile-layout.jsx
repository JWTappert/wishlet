import React, { useEffect } from "react";
import { Card, Layout, Typography } from "antd";
import ProfileDetails from "./profile-details";
import ProfileList from "./profile-lists";
import { WishlistsProvider } from "../../contexts/wishlists-context";

const { Header, Content } = Layout;

export default function ProfileLayout() {
  return (
    <WishlistsProvider>
      <Layout style={{ height: "100%" }}>
        {/*<Header style={{ background: "transparent" }}></Header>*/}
        <Layout>
          <Content>
            <Card style={{ height: "100%" }} bodyStyle={{ height: "100%" }}>
              <ProfileDetails />
              <ProfileList />
            </Card>
          </Content>
        </Layout>
      </Layout>
    </WishlistsProvider>
  );
}

const innerLayout = {
  height: "100%",
};
