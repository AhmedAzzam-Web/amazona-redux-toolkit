import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Layout, Loading } from '../components/imports';
import { getError } from '../utils/error';
import NextLink from "next/link";
import dynamic from 'next/dynamic';

const OrderHistory = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useSelector(store => store.user)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!userData) {
      router.push('/login')
      return;
    }
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get('/api/orders/history', {
          headers: { authorization: `Bearer ${userData.token}` }
        })
        setOrders(data)
        setLoading(false)
        return data
      } catch (error) {
        enqueueSnackbar(getError(error), { variant: 'error' })
      }
    }
    fetchOrders()
    return () => { }
  }, [userData, router])

  return (
    <Layout title='order history' description='find your orders history'>
      <Typography variant="h1" component="h1">
        Order History
      </Typography>

      {
        loading ? <Loading /> : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>DATE</TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell>PAID</TableCell>
                  <TableCell>ACTION</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.map((order) => {
                  let orderCreatedAt = new Date(order.createdAt);
                  let orderYear = orderCreatedAt.getFullYear();
                  let orderMonth = orderCreatedAt.getMonth() + 1;
                  let orderDay = orderCreatedAt.getDate();
                  let orderHours = orderCreatedAt.getHours();
                  let orderMinutes = orderCreatedAt.getMinutes();
                  let orderSeconds = orderCreatedAt.getSeconds();

                  if (orderDay < 10) {
                    orderDay = '0' + orderDay;
                  }
                  if (orderMonth < 10) {
                    orderMonth = '0' + orderMonth;
                  }
                  let orderCreatedTime = `${orderYear}/${orderMonth}/${orderDay}  ${orderHours}:${orderMinutes}:${orderSeconds}`;

                  let orderPaidAt = new Date(order.paidAt);
                  let paidYear = orderPaidAt.getFullYear();
                  let paidMonth = orderPaidAt.getMonth() + 1;
                  let paidDay = orderPaidAt.getDate();
                  let paidHours = orderPaidAt.getHours();
                  let paidMinutes = orderPaidAt.getMinutes();
                  let paidSeconds = orderPaidAt.getSeconds();

                  if (paidDay < 10) {
                    paidDay = '0' + paidDay;
                  }
                  if (paidMonth < 10) {
                    paidMonth = '0' + paidMonth;
                  }

                  let paidTime = `${paidYear}/${paidMonth}/${paidDay}  ${paidHours}:${paidMinutes}:${paidSeconds}`;

                  return (
                    <TableRow key={order._id}>
                      <TableCell>
                        <Typography variant="subtitle1" component="h4">
                          {order._id}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          variant="subtitle1"
                          component="h4"
                        >
                          {orderCreatedTime}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          variant="subtitle1"
                          component="h4"
                        >
                          ${order.totalPrice}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="subtitle1" component="h4">
                          {order.isPaid ? `Paid at ${paidTime}` : 'not paid'}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <NextLink href={`/order/${order._id}`} passHref>
                          <Button variant='contained'>Details</Button>
                        </NextLink>
                      </TableCell>

                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false })