import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Layout } from '../components/imports'
import NextLink from 'next/link'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Layout title='login' description='Login to get fun'>
      <Box sx={{ margin: { xs: 'none', lg: '0 10%' } }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="div" gutterBottom>
                Login
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid xs={12} item>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Grid xs={12} item>
              <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </Grid>

            <Grid xs={12} item>
              <Typography variant="subtitle1" gutterBottom component="h3">
                Do not have an account?
                <NextLink href='/register' passHref>
                  <Link className='linkWithColor' sx={{ padding: '0 6px' }}>Register</Link>
                </NextLink>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Layout>
  );
}

export default Login