import * as yup from 'yup';

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

export const profileSchema = yup.object().shape({
  userName: yup.string().required('UserName is required'),
  password: yup.string().required('Password is required').min(6),
});

export const createWorkspaceSchema = yup.object().shape({
  title: yup.string().required('Name is required'),
});

export const inviteMembersSchema = yup.object().shape({
  email_01: yup.string().email().optional(),
  email_02: yup.string().email().optional(),
  email_03: yup.string().email().optional(),
});

export const ResetPasswordSchema = yup.object().shape({
  password: yup.string().min(8).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});
