import * as Yup from 'yup';

export const changePasswordSchema = Yup.object().shape({
  current_password: Yup.string().required('Current password is required'),
  new_password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password')], 'Passwords must match')
    .required('Confirm password is required'),
});
