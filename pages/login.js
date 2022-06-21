import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, List, ListItem, TextField, Typography } from '@mui/material';
import { Layout } from '../components/imports'

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
    <Layout title='login'>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <List>
            <ListItem>
              <Typography variant="h1" component="div" gutterBottom>
                Login
              </Typography>
            </ListItem>
            <ListItem>
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
            </ListItem>

            <ListItem>
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
            </ListItem>

            <ListItem>
              <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </ListItem>
          </List>
        </form>
      </Box>
    </Layout>
  );
}

export default Login