import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { client } from '../utils/client'
import { Layout, Loading, ProductItem } from '../components/imports'
import styles from "../styles/Search.module.css";
import { Grid, List, ListItem, MenuItem, Rating, Select, Typography, Box, Button, Alert, InputLabel, FormControl } from '@mui/material';

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
];

const ratings = [1, 2, 3, 4, 5];

const Search = () => {
  const router = useRouter()
  const { category = 'all', searchQuery = 'all', price = 'all', rating = 'all', sort = 'all' } = router.query;

  const [searchState, setSearchState] = useState({
    categories: [],
    products: [],
    error: '',
    loading: true,
  })

  const { loading, products, error } = searchState
  const [categories, setCategories] = useState([])

  const [sortValue, setSortValue] = useState('default')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/categories')
        setCategories(data)
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchCategories()

    const fetchData = async () => {
      let productsQuery = `*[_type=='product'`
      try {
        setSearchState({ loading: true })

        if (category !== 'all') {
          productsQuery += ` && category match '${category}'`
        }

        if (searchQuery !== 'all') {
          productsQuery += ` && name match '${searchQuery}'`
        }

        if (price !== 'all') {
          const minPrice = new Number(price.split('-')[0])
          const maxPrice = new Number(price.split('-')[1])
          productsQuery += ` && price >= ${minPrice} && price <= ${maxPrice}`
        }

        if (rating !== 'all') {
          productsQuery += ` && rating >= ${new Number(rating)}`
        }

        let order = '';

        if (sort !== 'default') {
          if (sort === 'lowest') order = '| order(price asc)'
          if (sort === 'highest') order = '| order(price desc)'
          if (sort === 'toprated') order = '| order(rating desc)'
        }

        productsQuery += `] ${order}`
        const products = await client.fetch(productsQuery)

        setSearchState({ products, loading: false })
      } catch (error) {
        setSearchState({ error: error.message, loading: false })
      }
    }

    fetchData()

    return () => { }
  }, [category, price, searchQuery, rating, sort])

  const filterSearch = ({ category, searchQuery, price, rating, sort }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    if (category) query.category = category;
    if (sort) query.sort = sort;
    if (price) query.price = price;
    if (rating) query.rating = rating;

    router.push({ pathname: path, query: query })
  }

  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value })
  }
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value })
    setSortValue(e.target.value)
  }
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value })
  }
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value })
  }

  return (
    <Layout title="Search">
      <Grid className={styles.section} container spacing={2}>
        <Grid xs={12} item md={3}>
          <List sx={{ mt: { md: '0.4rem' } }}>
            <ListItem>
              <Box className={styles.fullWidth}>
                <Typography variant="body1" component="h4">
                  Categories
                </Typography>

                <Select fullWidth value={category} onChange={categoryHandler}>
                  <MenuItem value='all'>All</MenuItem>
                  {
                    categories && categories.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))
                  }
                </Select>
              </Box>
            </ListItem>

            <ListItem>
              <Box className={styles.fullWidth}>
                <Typography variant="body1" component="h4">
                  Prices
                </Typography>

                <Select value={price} onChange={priceHandler} fullWidth>
                  <MenuItem value="all">All</MenuItem>
                  {prices.map((price) => (
                    <MenuItem key={price.value} value={price.value}>
                      {price.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </ListItem>

            <ListItem>
              <Box className={styles.fullWidth}>
                <Typography variant="body1" component="h4">
                  Ratings
                </Typography>

                <Select value={rating} onChange={ratingHandler} fullWidth>
                  <MenuItem value="all">All</MenuItem>
                  {ratings.map((rating) => (
                    <MenuItem dispaly="flex" key={rating} value={rating}>
                      <Rating value={rating} readOnly />
                      <Typography component="span">&amp; Up</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', width: 'auto' }}>
              <Typography variant="body1" component="h4" sx={{ minWidth: '170px' }}>
                {products && products.length !== 0 ? products.length : 'No'} Results
                {searchQuery !== 'all' && searchQuery !== '' && ' : ' + searchQuery}
                {price !== 'all' && ' : Price ' + price}
                {rating !== 'all' && ' : Rating ' + rating + ' & up'}
              </Typography>
              {(searchQuery !== 'all' && searchQuery !== '') || rating !== 'all' || price !== 'all' ? (
                <Button sx={{ maxWidth: 50 }} onClick={() => router.push('/search')}>X</Button>
              ) : null}
            </Grid>

            <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
              <Typography component="span">
                Sort by
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 70 }}>
                <Select
                  labelId="select-label"
                  value={sortValue}
                  onChange={sortHandler}
                  fullWidth
                >
                  <MenuItem key='default' value="default">Default</MenuItem>
                  <MenuItem key='lowest' value="lowest">Price: Low to High</MenuItem>
                  <MenuItem key='highest' value="highest">Price: High to Low</MenuItem>
                  <MenuItem key='toprated' value="toprated">Customer Reviews</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item className={styles.section}>
            {loading ? (
              <Loading />
            ) : error ? (
              <Alert>{error}</Alert>
            ) : (
              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid item xs={12} md={5} key={product.name}>
                    <ProductItem
                      product={product}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Search