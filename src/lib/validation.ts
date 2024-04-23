import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  code: yup.string().required('Code is required').optional(),
});

export const RegisterSchema = yup.object().shape({
  userName: yup.string().min(3).required('Username is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(8).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const SendMailSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
});

export const ResetPasswordSchema = yup.object().shape({
  password: yup.string().min(8).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});
