import React, { useState, useEffect } from "react";
import {
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  Select,
  MenuItem,
  Button,
  ListItem,
  List,
  Card,
  Link,
} from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  addAndUpdateItem,
  removeItem,
} from "../utils/features/cartSlice/cartController";
import { useSnackbar } from "notistack";
import axios from "axios";

const CartFilled = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((store) => store.cart);

  const [hydratedCartItems, setHydratedCartItems] = useState([]);

  useEffect(() => {
    setHydratedCartItems(cartItems);
    return () => {};
  }, [cartItems]);

  const updateCart = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      enqueueSnackbar("Sorry, Product is out of the stock", {
        variant: "error",
      });
      return;
    } else {
      dispatch(
        addAndUpdateItem({
          _id: item._id,
          name: item.name,
          countInStock: item.countInStock,
          slug: item.slug,
          price: item.price,
          image: item.image,
          quantity,
        })
      );
      enqueueSnackbar(`${item.name} updated in the cart`, {
        variant: "success",
      });
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={9}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {hydratedCartItems.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <NextLink href={`/products/${product.slug}`} passHref>
                      <Link>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={60}
                          height={60}
                        ></Image>
                      </Link>
                    </NextLink>
                  </TableCell>

                  <TableCell>
                    <NextLink href={`/products/${product.slug}`} passHref>
                      <Typography
                        variant="body1"
                        color="primary"
                        component="h3"
                        sx={{ cursor: "pointer" }}
                      >
                        {product.name}
                      </Typography>
                    </NextLink>
                  </TableCell>

                  <TableCell>
                    <Select
                      value={product.quantity}
                      sx={{ color: "inherit", backgroundColor: "inherit" }}
                      onChange={(e) => updateCart(product, e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((num) => (
                        <MenuItem key={num + 1} value={num + 1}>
                          {num + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body1" component="h3">
                      ${product.price}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => dispatch(removeItem(product))}
                    >
                      x
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12} lg={3}>
        <Card sx={{ color: "inherit", backgroundColor: "inherit" }}>
          <List>
            <ListItem>
              <Typography variant="h2" component="div">
                Subtotal (
                {hydratedCartItems.reduce((a, c) => a + c.quantity, 0)}) items :
                $
                {hydratedCartItems.reduce(
                  (a, c) => a + c.quantity * c.price,
                  0
                )}
              </Typography>
            </ListItem>
            <ListItem>
              <Button fullWidth variant="contained">
                CheckOut
              </Button>
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CartFilled;
