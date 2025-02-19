import * as Yup from 'yup';

export const signupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),

  telephone_number: Yup.string()
    .matches(/^\d{10}$/, 'Telephone number must be 10 digits')
    .required('Telephone number is required'),

  address: Yup.string().required('Address is required'),

  email: Yup.string().email('Invalid email format').notRequired(),

  contact_number: Yup.string()
    .matches(/^\d{10}$/, 'Contact number must be 10 digits')
    .required('Contact number is required'),

  vat_registration_number: Yup.string().required(
    'VAT registration number is required',
  ),

  vat_registration_document_image: Yup.mixed<File>()
    .required('VAT registration document is required')
    .test('required', 'VAT registration document is required', (value: any) => {
      return value && value[0];
    }),

  pan_registration_number: Yup.string().required(
    'PAN registration number is required',
  ),

  // PAN Registration document file validation
  pan_registration_document_image: Yup.mixed<File>()
    .test('required', 'PAN registration document is required', (value: any) => {
      return value && value[0];
    })
    .required('PAN registration document is required'),

  // Tax Compliance document file validation
  tax_compliance_document_image: Yup.mixed<File>()
    .required('Tax compliance document is required')
    .test('required', 'Tax compliance document is required', (value: any) => {
      return value && value[0];
    }),

  // Logo file validation
  logo: Yup.mixed<File>()
    .test('required', 'Logo is required', (value: any) => {
      return value && value[0];
    })
    .required('Logo is required'),
  websiteUrl: Yup.string().url('Invalid website URL').notRequired(),
  facebookUrl: Yup.string().url('Invalid Facebook URL').notRequired(),
  tiktokUrl: Yup.string().url('Invalid TikTok URL').notRequired(),
  instagramUrl: Yup.string().url('Invalid Instagram URL').notRequired(),
});
