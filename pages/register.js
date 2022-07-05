import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Layout } from '../components/imports'
import NextLink from 'next/link'
import { useSnackbar } from 'notistack';
import axios from 'axios'
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../utils/features/userSlice/userController';
import { getError } from '../utils/error';

const validationSchema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .max(40)
    .required(),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password'), null], 'Your password do not match')
});

const Register = () => {
  const { userData } = useSelector(store => store.user)
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const { redirect } = router.query;
  const dispatch = useDispatch()

  useEffect(() => {
    if (userData) {
      router.push(redirect || '/')
    }
    return () => { }
  }, [router, userData, redirect]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async ({ name, email, password, confirmPassword }) => {
      if (password !== confirmPassword) {
        enqueueSnackbar('Passwords do not match', { variant: 'error' })
        return;
      }
      try {
        const { data } = await axios.post('/api/users/register', { name, email, password });
        dispatch(addUser(data))
        router.push(redirect || '/')
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: 'error' })
      }
    },
  });

  return (
    <Layout title='register' description='register to get fun'>
      <Box sx={{ margin: { xs: 'none', lg: '0 10%' } }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1" gutterBottom>
                Register
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
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
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Grid>

            <Grid xs={12} item>
              <Button color="primary" variant="contained" fullWidth type="submit">
                Register
              </Button>
            </Grid>

            <Grid xs={12} item>
              <Typography variant="subtitle1" gutterBottom component="h3">
                Already have an account?
                <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
                  <Link className='linkWithColor' sx={{ padding: '0 6px' }}>Login</Link>
                </NextLink>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Layout>
  );
}

export default Register