import React from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

function PasswordBlock() {
  const RegisterSchema = Yup.object().shape({
    oldPassword: Yup.string().required('old password required'),
    newPassword: Yup.string().min(5, 'must have atleast 5 char long').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {},
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 5,
        p: 3,
        borderRadius: 2,
        border: (theme) => ({ md: `dashed 1px ${theme.palette.divider}` }),
      }}
    >
      <Typography variant="subtitle1">Change Password</Typography>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction="column" spacing={2}>
              <TextField
                fullWidth
                label="Old Password"
                size="small"
                type={'password'}
                {...getFieldProps('oldPassword')}
                error={Boolean(touched.oldPassword && errors.oldPassword)}
                helperText={touched.oldPassword && errors.oldPassword}
              />

              <TextField
                fullWidth
                label="New Password"
                size="small"
                type={'password'}
                {...getFieldProps('newPassword')}
                error={Boolean(touched.newPassword && errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                size="small"
                type={'password'}
                {...getFieldProps('confirmPassword')}
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Please ensure that you keep your password safe
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <LoadingButton size="medium" type="submit" variant="contained" loading={isSubmitting}>
                Save
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
}

export default PasswordBlock;
