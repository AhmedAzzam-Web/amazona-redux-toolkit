import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Layout, Loading } from '../../components/imports'
import { Card, CardContent, Grid, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import NextLink from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { getError } from '../../utils/error'
import axios from 'axios'

const Order = ({ params }) => {
  const { id: orderId } = params;
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { orders } = useSelector((store) => store.order)
  const { userData } = useSelector((store) => store.user)
  const { enqueueSnackbar } = useSnackbar();

  const { shippingData, cartItems, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = orders[orders.length - 1];

  useEffect(() => {
    if (!userData) {
      return router.push('/login')
    }

    const fetchOrder = async () => {
      try {
        setLoading(true)
        const { data } = axios.get(`/api/orders/${orderId}`, {
          headers: {
            authorization: `Bearer ${userData.token}`
          }
        })
        setLoading(false)
      } catch (error) {
        setLoading(true)
        enqueueSnackbar(getError(error), { variant: 'error' })
      }
    }

    fetchOrder()

    return () => { }
  }, [orderId, userData])

  return (
    <Layout title={`Order ${orderId}`}>
      <Typography variant="h3" component="h1">
        Order {orderId}
      </Typography>

      {
        loading ? <Loading /> : (
          <Grid container spacing={1}>
            <Grid item xs={12} md={9}>
              <Card className='card'>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Shipping Address
                  </Typography>
                  <Typography variant="body1">
                    {shippingData.name}, {shippingData.address}, {shippingData.city}, {shippingData.postal}, {shippingData.country}
                  </Typography>
                </CardContent>
              </Card>

              <Card className="card">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Payment Method
                  </Typography>
                  <Typography variant="body1">
                    Payment Method: {paymentMethod}
                  </Typography>
                </CardContent>
              </Card>

              <Card className="card">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Order Items
                  </Typography>

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
                </CardContent>

              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card className="card">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Order Summary
                  </Typography>

                  <Grid container sx={{ marginTop: '15px' }}>
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
                      <Typography variant="subtitle1" component="h4" sx={{ fontWeight: 'bold' }}>
                        Total:
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="subtitle1" component="h4" align='right' sx={{ fontWeight: 'bold' }}>
                        ${totalPrice}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )
      }
    </Layout>
  )
}

// params represent the id in the url
export const getServerSideProps = ({ params }) => {
  return {
    props: { params }
  }
}

export default dynamic(() => Promise.resolve(Order), { ssr: false })