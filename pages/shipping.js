import React, { useEffect } from 'react'
import { Layout, CheckoutWizard } from '../components/imports'
import * as yup from 'yup';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { fillShippingData } from '../utils/features/shippingSlice/shippingController';

const validationSchema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .max(40)
    .required(),
  address: yup
    .string('Enter your address')
    .required('Address is required'),
  city: yup
    .string('Enter your city')
    .required('City is required'),
  postal: yup
    .string()
    .required('Postal code is required')
    .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/),
  country: yup
    .string('Enter your country')
    .required('Country is required'),
});

const Shipping = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useSelector(store => store.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userData) {
      router.push('/login?redirect=/shipping')
      enqueueSnackbar('You need to sign in first', { variant: 'info' })
      return;
    }
    return () => { }
  }, [userData, router, enqueueSnackbar])


  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      city: '',
      postal: '',
      country: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(fillShippingData(values))
      router.push('/payment')
    },
  });

  return (
    <Layout title='Shipping Address' description="The fastest shipping We will arrive in 30 minutes">
      <CheckoutWizard activeStep={2}></CheckoutWizard>

      <form onSubmit={formik.handleSubmit} className='form'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1" gutterBottom align='center'>
              Shipping Address
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
              id="address"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>

          <Grid xs={12} item>
            <TextField
              fullWidth
              id="city"
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>

          <Grid xs={12} item>
            <TextField
              fullWidth
              id="postal"
              name="postal"
              label="Postal Code"
              value={formik.values.postal}
              onChange={formik.handleChange}
              error={formik.touched.postal && Boolean(formik.errors.postal)}
              helperText={formik.touched.postal && formik.errors.postal}
            />
          </Grid>

          <Grid xs={12} item>
            <TextField
              fullWidth
              id="country"
              name="country"
              label="Country"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>

          <Grid xs={12} item>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Continue
            </Button>
          </Grid>
        </Grid>
      </form>

    </Layout>
  )
}

export default Shipping