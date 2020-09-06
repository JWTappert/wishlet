import React from "react";
import { Card, Layout, Typography } from "antd";
import ProfileDetails from "./profile-details";
import ProfileList from "./profile-lists";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function ProfileLayout({
  user,
  wishlists,
  handleWishlistAdded,
}) {
  return (
    <Layout style={{ height: "100%" }}>
      <Header style={{ background: "transparent" }}>
        <Title>Profile</Title>
      </Header>
      <Layout>
        <Content>
          <Card style={{ height: "100%" }} bodyStyle={{ height: "100%" }}>
            <ProfileDetails user={user} />
            <ProfileList
              wishlists={wishlists}
              handleWishlistAdded={handleWishlistAdded}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}

const innerLayout = {
  height: "100%",
};
