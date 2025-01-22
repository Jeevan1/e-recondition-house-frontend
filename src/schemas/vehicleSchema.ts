import * as Yup from "yup";

export const vehicleSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string(),
  category: Yup.string().required("Category is required"),
  year_of_manufacture: Yup.date().required("Year of Manufacture is required"),
  mileage: Yup.number().positive("Mileage must be positive"),
  actual_price: Yup.number().required("Actual price is required"),
  discounted_price: Yup.number().lessThan(
    Yup.ref("actual_price"),
    "Discounted price must be less than actual price",
  ),
  fuel_type: Yup.string().required("Fuel type is required"),
  transmission: Yup.string().required("Transmission is required"),
  seating_capacity: Yup.number().integer("Seating capacity must be an integer"),
  engine_capacity: Yup.number().positive("Engine capacity must be positive"),
  featured_image: Yup.mixed<File>()
    .required("Featured image is required")
    .test(
      "fileSize",
      "File too large",
      (value) => !value || (value && value.size <= 1024 * 1024),
    ),
});
