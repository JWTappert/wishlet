import Head from "next/head";
import React from "react";
import "../styles/globals.css";
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {

  return (
      <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      </>
  );
}

export default MyApp;
