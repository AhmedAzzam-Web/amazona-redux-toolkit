import React from "react";
import NextLink from "next/link";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  Rating,
  CardActions,
} from "@mui/material";
import { urlFor } from "../utils/client";

const ProductItem = ({product: { name, slug, description, image, price, rating, reviews },}) => {
  return (
    <Card sx={{backgroundColor: 'inherit', color: 'inherit'}}>
      <NextLink href={`/products/${slug.current}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            height="320"
            image={urlFor(image)}
            title={name}
            alt={name}
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>

            <Typography gutterBottom variant="body2">
              {description} ({reviews} reviews)
            </Typography>

            <Rating name="read-only" value={rating} readOnly />
          </CardContent>
        </CardActionArea>
      </NextLink>

      <CardActions sx={{ paddingLeft: "20px", paddingTop: "0px" }}>
        <Typography variant="body1" component="h3">
          ${price}
        </Typography>
        <Button size="large" color="primary">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
