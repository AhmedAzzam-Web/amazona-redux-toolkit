import React from "react";
import Head from "next/head";
import { Header, Footer } from "./imports.js";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const Layout = ({ title, description, children }) => {
  const { isDark } = useSelector((store) => store.dark);
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: "none",
        },
      },
    },
    typography: {
      h1: {
        fontSize: "4rem",
        fontWeight: 600,
        margin: "1rem 0",
        lineHeight: "106%",
      },
      h2: {
        fontSize: "3.2rem",
        fontWeight: 500,
        margin: "1rem 0",
        lineHeight: "50%",
      },
      h3: {
        fontSize: "2.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h4: {
        fontSize: "1.9rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h5: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h6: {
        fontSize: "0.8rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      mode: isDark ? "dark" : "light",
      primary: {
        main: "#66CC66",
      },
      secondary: {
        main: "#0B0B0D",
      },
    },
  });

  return (
    <>
      <Head>
        <title>{title ? `${title} - Sanity Amazona` : "Sanity Amazona"}</title>
        {description && <meta name="description" content={description} />}
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />

        <Container maxWidth="xl" component="main">
          {children}
        </Container>

        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
