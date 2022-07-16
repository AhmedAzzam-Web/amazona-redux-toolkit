import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Layout, Loading } from '../../components/imports'
import { Card, CardContent, Grid, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import NextLink from "next/link";
import Image from 'next/image'

const Order = ({ params }) => {
  const { id: orderId } = params;
  const [loading, setLoading] = useState(false)
  const { orderDetails } = useSelector((store) => store.order)

  console.log(orderDetails);

  const { shippingData, cartItems, paymentMethod } = orderDetails;

  return (
    <Layout title={`Order ${orderId}`}>
      <Typography variant="h1" component="h1">
        Order {orderId}
      </Typography>

      {
        loading ? <Loading /> : (
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
              </Card>

              <Card className="card">
                <CardContent>
                  <Typography variant="h2" component="h2">
                    Payment Method
                  </Typography>
                  <Typography variant="body1">
                    Payment Method: {paymentMethod}
                  </Typography>
                </CardContent>
              </Card>

              <Card className="card">
                <CardContent>
                  <Typography variant="h2" component="h2">
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
                                  component="h3"
                                  sx={{ cursor: "pointer" }}
                                >
                                  {product.name}
                                </Typography>
                              </NextLink>
                            </TableCell>

                            <TableCell>
                              <Typography
                                variant="body1"
                                component="h3"
                              >
                                {product.quantity}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body1" component="h3">
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