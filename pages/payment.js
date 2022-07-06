import React, { useEffect } from 'react'
import { FormControl, FormControlLabel, Grid, RadioGroup, Typography, Radio, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { Layout, CheckoutWizard } from '../components/imports'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { updatePaymentMethod } from '../utils/features/paymentSlice/paymentController'

const methods = ['Paypal', 'Stripe', 'Cash']

const Payment = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const { shippingData } = useSelector(store => store.shipping);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  useEffect(() => {
    if (!shippingData) {
      router.push('/shipping')
      enqueueSnackbar('Please fill in your shipping data first', { variant: 'error' })
    }

    return () => { }
  }, [shippingData])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePaymentMethod(paymentMethod))
    router.push('/placeorder')
  }

  return (
    <Layout title="Payment methods" description='choose your prefered way of payment'>
      <CheckoutWizard activeStep={3} />
      <form onSubmit={handleSubmit} className='form'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1" id="paymentMethod" gutterBottom>
              Payment Method
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormControl>
              <RadioGroup
                aria-labelledby="paymentMethod"
                name="payment-method"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                {
                  methods.map((method) => (
                    <FormControlLabel key={method} value={method.toLowerCase()} control={<Radio />} label={method} />
                  ))
                }
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Continue
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button color="secondary" variant="contained" fullWidth onClick={() => router.push('/shipping')}>
              Back
            </Button>
          </Grid>
        </Grid>
      </form>
    </Layout >
  )
}

export default Payment