import Head from "next/head";
import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import "antd/dist/antd.css";

import { Layout } from "antd";
import Nav from "components/nav/nav";

import FirebaseProvider, {
  onAuthStateChange,
  UserContext,
} from "utils/firebase";

function MyApp({ Component, pageProps }) {
  const { Header, Footer, Content } = Layout;
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <FirebaseProvider>
      <UserContext.Provider value={user}>
        <Head>
          <title>Wishlet</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Header>
            <Nav />
          </Header>
          <Layout>
            <Content style={{ height: "89.9vh", margin: "0 10%" }}>
              <Component {...pageProps} />
            </Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </UserContext.Provider>
    </FirebaseProvider>
  );
}

export default MyApp;
