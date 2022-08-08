import React from "react";
import Head from "next/head";
import { Navbar, Footer } from "./imports.js";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const Layout = ({ title, description, children }) => {
  const { isDark } = useSelector((store) => store.dark);
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
      },
    },
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
        lineHeight: "106%",
      },
      h3: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
        lineHeight: "61px",
      },
    },
    palette: {
      mode: isDark ? "dark" : "light",
      primary: {
        main: "#BED479",
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
        <Navbar />

        <Container component="main" className="main">
          {children}
        </Container>

        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
