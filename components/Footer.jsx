import React from "react";
import { Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Toolbar
      sx={{
        position: "absolute",
        padding: '25px',
        width: "100%",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" noWrap component="h4" sx={{ flexGrow: 1 }}>
        All rights reserved Sanity Amazona.
      </Typography>
    </Toolbar>
  );
};

export default Footer;
