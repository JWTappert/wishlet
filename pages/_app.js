import Head from "next/head";
import React from "react";
import "../styles/globals.css";
import "antd/dist/antd.css";

import { Layout } from "antd";
import Nav from "components/nav/nav";
import { UserProvider } from "contexts/user-context";

function MyApp({ Component, pageProps }) {
  const { Header, Footer, Content } = Layout;

  return (
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
  );
}

export default MyApp;
