import { Box, Typography, Link, Grid, List, ListItem, Rating, Card, Button } from '@mui/material';
import React from 'react';
import { Layout } from '../../components/imports';
import { client, urlFor } from '../../utils/client';
import NextLink from 'next/link';
import Image from 'next/image';
import styles from '../../styles/ProductDetail.module.css'
import { useSnackbar } from 'notistack'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addAndUpdateItem } from '../../utils/features/cartSlice/cartController';
import { useRouter } from 'next/router'

const ProductDetails = ({ product }) => {
  const router = useRouter();
  const { name, description, price, image, rating, reviews, category, brand } = product;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(store => store.cart)

  const addToCart = async () => {
    closeSnackbar()
    let cartItem = cartItems.find(item => item._id === product._id)
    let quantity = cartItem ? cartItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`)

    if (data.countInStock < quantity) {
      enqueueSnackbar('Sorry, Product is out of the stock', { variant: 'error' });
      return;
    } else {
      dispatch(addAndUpdateItem({
        _id: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
        image: urlFor(product.image),
        quantity,
      }))
      enqueueSnackbar(`${product.name} added to cart`, { variant: 'success' });
    }
    router.push('/cart')
  }

  return (
    <Layout title={product?.title}>
      <Box>
        <Box>
          <NextLink href='/' passHref>
            <Link className={styles.link}>
              <Typography variant="body1" className={styles.backToResults} component="h6">
                back to results
              </Typography>
            </Link>
          </NextLink>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Image src={urlFor(image)} alt={name} width={640} height={640} priority />
          </Grid>

          <Grid item sm={6} md={3} xs={12}>
            <List>
              <ListItem>
                <Typography variant="h4" component="h1" sx={{m: '0', lineHeight: '20px'}}>
                  {name}
                </Typography>
              </ListItem>

              <ListItem>
                <Typography variant="body1" component="h5">
                  Category: {category}
                </Typography>
              </ListItem>

              <ListItem>
                <Typography variant="body1" component="h5">
                  Brand: {brand}
                </Typography>
              </ListItem>

              <ListItem sx={{ width: '121%' }}>
                <Rating name="read-only" value={rating} readOnly />
                <Typography sx={{ paddingLeft: '8px' }} variant="body2" component="h5">
                  (Reviews: {reviews})
                </Typography>
              </ListItem>

              <ListItem>
                <Typography variant="body1" component="h5">
                  Description: {description}
                </Typography>
              </ListItem>
            </List>
          </Grid>

          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="body1" component="h5">
                        Price
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" component="h5" sx={{ textAlign: 'right' }}>
                        ${price}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>

                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="body1" component="h5">
                        Status
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" component="h5" sx={{ textAlign: 'right' }}>
                        {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>

                <ListItem>
                  <Button fullWidth variant='contained' onClick={addToCart}>
                    Add To Cart
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>

      </Box>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = (`*[_type == "product" && slug.current == '${slug}'][0]`);
  const product = await client.fetch(query);

  return {
    props: { product }
  }
}

export default React.memo(ProductDetails);