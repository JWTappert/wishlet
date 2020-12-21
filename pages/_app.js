import Head from "next/head";
import React from "react";
import "../styles/globals.css";
import "antd/dist/antd.css";

import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

import { Layout } from "antd";
import Nav from "components/nav/nav";
import {AuthProvider} from "../contexts/auth-context";
import {withAuthenticator} from "aws-amplify-react";
import {UserProvider} from "../contexts/user-context";

function App({ Component, pageProps }) {
  const { Header, Footer, Content } = Layout;

  return (
    <AuthProvider>
      <UserProvider>
      <Head>
        <title>Wishlet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header>
          <Nav />
        </Header>
        <Layout>
          <Content style={{ margin: "0 10%" }}>
            <Component {...pageProps} />
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
