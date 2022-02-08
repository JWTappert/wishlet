import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, Grommet } from "grommet";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
    },
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Grommet theme={theme}>
      <Box margin={{ top: "smallish" }}>
        <Component {...pageProps} />
      </Box>
    </Grommet>
  );
}

export default MyApp;
