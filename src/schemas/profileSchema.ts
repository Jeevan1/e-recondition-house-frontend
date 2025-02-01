import * as Yup from 'yup';

export const profileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});
