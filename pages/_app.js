import Head from "next/head";
import React from "react";
import "../styles/globals.css";
import 'antd/dist/antd.css';

import { Layout, Menu } from "antd";
import Nav from "components/nav/nav";

function MyApp({ Component, pageProps }) {
  const { Header, Footer, Content } = Layout;
  return (
      <>
      <Head>
        <title>Wishlet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Layout>
          <Header>
            <Nav />
          </Header>
          <Layout>
            <Content style={{ height: '89.9vh', margin: '0 10%' }}>
            <Component {...pageProps} />
            </Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </>
  );
}

export default MyApp;
