import * as Yup from 'yup';

export const vehicleSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string(),
  category: Yup.string().required('Category is required'),
  color: Yup.string().required('Color is required'),
  model: Yup.string().required('Model is required'),
  year_of_manufacture: Yup.string(),
  mileage: Yup.number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Mileage is required')
    .positive('Mileage must be a positive number'),
  actual_price: Yup.number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Actual price is required'),
  discounted_price: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value;
    })
    .lessThan(
      Yup.ref('actual_price'),
      'Discounted price must be less than actual price',
    )
    .required('Discounted price is required'),
  fuel_type: Yup.string().required('Fuel type is required'),
  transmission: Yup.string().required('Transmission is required'),
  seating_capacity: Yup.number()
    .positive('Seating capacity must be positive')
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value;
    })
    .integer('Seating capacity must be an integer')
    .required('Seating capacity is required'),
  engine_capacity: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value;
    })
    .positive('Engine capacity must be positive')
    .required('Engine capacity is required'),
  featured_image: Yup.mixed().required('Featured image is required'),
  features: Yup.array().of(Yup.string()),
  accident_history: Yup.boolean().required('Accident history is required'),
  bill_book_upto_date: Yup.boolean().required('Bill book status is required'),
  vehicle_registration_number: Yup.string().required(
    'Vehicle registration number is required',
  ),
  images: Yup.array().of(
    Yup.object().shape({
      image: Yup.string().required('Image URL is required'),
      idx: Yup.string().required('Image ID is required'),
    }),
  ),
  km_driven: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value;
    })
    .positive('KM driven must be positive')
    .required('KM driven is required'),
  brand: Yup.string().notRequired(),
  contact_number: Yup.number()
    .transform((value) => value)
    .positive('Contact number must be positive'),
  location: Yup.string(),
  tags: Yup.array().of(Yup.string()),
});
