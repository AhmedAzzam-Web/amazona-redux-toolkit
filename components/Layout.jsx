import React from "react";
import Head from "next/head";
import { Navbar, Footer } from "./imports.js";
import Container from "@mui/material/Container";

const Layout = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} - Sanity Amazona` : "Sanity Amazona"}</title>
        {description && <meta name="description" content={description} />}
      </Head>

      <Navbar />

      <Container component="main" className="main">
        {children}
      </Container>

      <Footer />
    </>
  );
};

export default Layout;
