import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { CartEmpty, CartFilled, Layout } from '../components/imports';
import dynamic from 'next/dynamic';

const Cart = () => {
  const { cartItems } = useSelector(store => store.cart);

  return (
    <Layout title='shopping cart'>
      <Typography variant="h1" gutterBottom component="h1">
        Shopping Cart
      </Typography>

      {
        cartItems.length === 0 ? <CartEmpty /> : <CartFilled />
      }

    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false })