import React, { useState, useEffect } from 'react'
import { Button, Card, CardActions, CardContent, Grid, Link, Table, TableBody, TableContainer, Typography, TableHead, TableRow, TableCell } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, CheckoutWizard, Loading } from '../components/imports'
import NextLink from "next/link";
import { useSnackbar } from 'notistack'
import { getError } from '../utils/error'
import axios from 'axios'
import { clearCart } from '../utils/features/cartSlice/cartController'
import { makeOrder } from '../utils/features/orderSlice/order'
import dynamic from 'next/dynamic'

const Placeorder = () => {
  const [loading, setLoading] = useState(false);
  const { shippingData } = useSelector(store => store.shipping)
  const { paymentMethod } = useSelector(store => store.payment)
  const { cartItems } = useSelector((store) => store.cart);
  const { userData } = useSelector((store) => store.user);
  const router = useRouter()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)

  const shippingPrice = itemsPrice < 200 ? 0 : 15

  const taxPrice = itemsPrice * 0.15

  const totalPrice = itemsPrice + taxPrice + shippingPrice

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment')
    }
    if (cartItems.length === 0) {
      router.push('/cart')
    }
    return () => { };
  }, [cartItems, paymentMethod, router]);

  const placeOrderHandler = async () => {
    try {
      const { data } = await axios.post('/api/orders/', {
        orderItems: cartItems.map((product) => ({ ...product, countInStock: undefined, slug: undefined })),
        shippingData,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      }, {
        headers: {
          authorization: `Bearer ${userData.token}`
        }
      })
      setLoading(true)
      dispatch(makeOrder({ cartItems, shippingData, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice }))
      dispatch(clearCart())
      router.push(`/order/${data}`)
    } catch (error) {
      setLoading(false)
      enqueueSnackbar(getError(error), { variant: 'error' })
    }
  }

  return (
    <Layout title='Place Order'>
      <CheckoutWizard activeStep={4} />
      <Typography variant="h1" component="h1">
        Place Order
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs={12} md={9}>
          <Card className='card'>
            <CardContent>
              <Typography variant="h2" component="h2">
                Shipping Address
              </Typography>
              <Typography variant="body1">
                {shippingData.name}, {shippingData.address}, {shippingData.city}, {shippingData.postal}, {shippingData.country}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant='contained' size="large" color='secondary' onClick={() => router.push('/shipping')}>Edit</Button>
            </CardActions>
          </Card>

          <Card className='card'>
            <CardContent>
              <Typography variant="h2" component="h2">
                Payment Method
              </Typography>
              <Typography variant="body1">
                Payment Method: {paymentMethod}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant='contained' size="large" color='secondary' onClick={() => router.push('/payment')}>Edit</Button>
            </CardActions>
          </Card>

          <Card className='card'>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {cartItems.map((product) => (
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
                            component="h4"
                            sx={{ cursor: "pointer" }}
                          >
                            {product.name}
                          </Typography>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <Typography
                          variant="body1"
                          component="h4"
                        >
                          {product.quantity}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body1" component="h4">
                          ${product.price}
                        </Typography>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="card">
            <CardContent>
              <Typography variant="h2" component="h2">
                Order Summary
              </Typography>

              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="body1" component="h4">
                    Items:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" component="h4" align='right'>
                    ${itemsPrice}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ marginTop: '15px' }}>
                <Grid item xs={6}>
                  <Typography variant="body1" component="h4">
                    Shipping:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" component="h4" align='right'>
                    ${shippingPrice}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ marginTop: '15px' }}>
                <Grid item xs={6}>
                  <Typography variant="body1" component="h4">
                    Tax:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" component="h4" align='right'>
                    ${taxPrice}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ marginTop: '15px' }}>
                <Grid item xs={6}>
                  <Typography variant="body1" component="h4">
                    Total Price:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" component="h4" align='right'>
                    ${totalPrice}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>

            <CardActions>
              <Button disabled={loading} fullWidth variant='contained' size="large" color='primary' onClick={placeOrderHandler}>Place Order</Button>
            </CardActions>

            {loading && (
              <Loading />
            )}
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Placeorder), { ssr: false })