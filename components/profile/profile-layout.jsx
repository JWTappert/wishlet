import React from "react";
import { Card, Layout } from "antd";
import ProfileDetails from "./profile-details";
import ProfileList from "./profile-lists";
import {UserProvider} from "contexts/user-context";

const { Header, Content } = Layout;

export default function ProfileLayout() {
  return (
    <UserProvider>
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
    </UserProvider>
  );
}

const innerLayout = {
  height: "100%",
};
