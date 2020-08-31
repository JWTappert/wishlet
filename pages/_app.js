import "../styles/globals.css";
import Head from "next/head";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { TopNavBar, BottomNavBar } from "../components/navigation";
import { useMediaQuery } from "@material-ui/core";

// interface PaletteColor {
//   light?: string;
//   main: string;
//   dark?: string;
//   contrastText?: string;
// }

function MyApp({ Component, pageProps }) {
  const theme = createMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  console.log({ isMobile });
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {!isMobile && <TopNavBar />}
      <Component {...pageProps} />
      {isMobile && <BottomNavBar />}
    </ThemeProvider>
  );
}

export default MyApp;
