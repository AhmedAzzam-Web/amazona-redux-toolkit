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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addAndUpdateItem } from "../utils/features/cartSlice/cartController";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const ProductItem = ({ product }) => {
  const router = useRouter();
  const { name, slug, description, price, image, rating, reviews } = product;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);

  const addToCart = async () => {
    closeSnackbar();
    let cartItem =
      cartItems && cartItems.find((item) => item._id === product._id);
    let quantity = cartItem ? cartItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      enqueueSnackbar("Sorry, Product is out of the stock", {
        variant: "error",
      });
      return;
    } else {
      dispatch(
        addAndUpdateItem({
          _id: product._id,
          name: product.name,
          countInStock: product.countInStock,
          slug: product.slug.current,
          price: product.price,
          image: urlFor(product.image),
          quantity,
        })
      );
      enqueueSnackbar(`${product.name} added to cart`, { variant: "success" });
    }
    router.push("/cart");
  };

  return (
    <Card>
      <NextLink href={`/products/${slug.current}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            height="320"
            image={urlFor(image)}
            title={name}
            alt={name}
          />
          <CardContent sx={{mt: '-20px', padding: '16px 0 0 14px'}}>
            <Typography gutterBottom variant="h5" component="h3">
              {name}
            </Typography>

            <Typography gutterBottom variant="body1" sx={{mt: '-6px'}}>
              {description} ({reviews} reviews)
            </Typography>

            <Rating name="read-only" value={rating} readOnly />
          </CardContent>
        </CardActionArea>
      </NextLink>

      <CardActions sx={{ paddingLeft: "20px" }}>
        <Typography variant="body1" component="h4">
          ${price}
        </Typography>
        <Button size="large" color="primary" onClick={addToCart} sx={{marginLeft: 'auto'}}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
