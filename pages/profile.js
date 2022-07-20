import React, { useEffect } from 'react'
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Layout } from '../components/imports';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { getError } from '../utils/error';
import { addUser } from '../utils/features/userSlice/userController';
import axios from 'axios';

const validationSchema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .max(40)
    .required(),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required')
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password'), null], 'Your password do not match')
});

const Profile = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userData } = useSelector(store => store.user)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userData) {
      router.push('/login')
      return;
    }

    return () => { }
  }, [router, userData])

  const formik = useFormik({
    initialValues: {
      name: userData.name,
      email: userData.email,
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async ({ name, email, password, confirmPassword }) => {
      closeSnackbar()
      if (password !== confirmPassword) {
        enqueueSnackbar('Passwords do not match', { variant: 'error' })
        return;
      }
      try {
        const { data } = await axios.put('/api/users/profile', { name, email, password },
          { headers: { authorization: `Bearer ${userData.token}` } }
        );
        dispatch(addUser(data))
        enqueueSnackbar('Profile updated successfully', { variant: 'success' })
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: 'error' })
        console.log(err)
      }
    },
  });

  return (
    <Layout title='Profile'>
      <Box sx={{ margin: { xs: 'none', lg: '0 10%' } }}>
        <Typography variant="h1" component="h1" gutterBottom align="center">
          Profile
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
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
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false })