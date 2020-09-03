import Head from "next/head";
import React from "react";
import "../styles/globals.css";
import 'antd/dist/antd.css';

import { Layout, Menu } from "antd";
import Nav from "components/nav/nav";

import FirebaseProvider from "utils/firebase";

function MyApp({ Component, pageProps }) {
  const { Header, Footer, Content } = Layout;
  return (
      <FirebaseProvider>
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
      </FirebaseProvider>
  );
}

export default MyApp;
