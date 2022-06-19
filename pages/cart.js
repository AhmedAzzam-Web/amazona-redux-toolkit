import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { CartEmpty, CartFilled, Layout } from '../components/imports';

const Cart = () => {
  const { cart: { cartItems } } = useSelector(store => store.cart);
  const [hydratedCartItems, setHydratedCartItems] = useState([]);

  useEffect(() => {
    setHydratedCartItems(cartItems);
    return () => { };
  }, [cartItems]);

  return (
    <Layout title='shopping cart'>
      <Typography variant="h1" gutterBottom component="h1">
        Shopping Cart
      </Typography>

      {
        hydratedCartItems.length === 0 ? <CartEmpty /> : <CartFilled />
      }

    </Layout>
  )
}

export default Cart