import { Grid } from "@mui/material";
import React from "react";
import { ProductItem } from "./imports";

const Products = ({ products }) => {
  return (
    <Grid container spacing={3} sx={{ justifyContent: "center" }}>
      {products.map((product) => (
        <Grid sm={6} md={4} item key={product._id} sx={{ width: "100%" }}>
          <ProductItem product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(Products);
