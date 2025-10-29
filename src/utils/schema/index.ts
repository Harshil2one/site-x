import * as Yup from "yup";

export const restaurantValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Restaurant name must be long")
    .required("Restaurant name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  contact: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit contact number")
    .required("Contact number is required"),
  address: Yup.string()
    .min(5, "Address must be long")
    .required("Address is required"),
  rate: Yup.number()
    .min(1, "Rate should not be zero")
    .required("Rate is required"),
  time: Yup.string().required("Time is required"),
  mode: Yup.string().required("Mode is required"),
  distance: Yup.string().required("Distance is required"),
  food: Yup.array()
    .of(Yup.string().trim().min(1, "Food items cannot be empty"))
    .min(1, "At least one food item is required")
    .required("Food is required"),
});

export const foodValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Food name must be long")
    .required("Restaurant name is required"),
  price: Yup.number()
    .min(1, "Price must not be zero")
    .required("Price is required"),
});

export const couponValidationSchema = Yup.object({
  code: Yup.string().min(3, "Code must be long").required("Code is required"),
  discount: Yup.number()
    .min(1, "Discount must be more")
    .required("Discount is required"),
});

export const rideWithUsValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  city: Yup.string().required("City is required"),
  contact: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
});

export const jobValidationSchema = Yup.object({
  title: Yup.string().min(3, "Job title must be long enough").required("Job title is required"),
});

export const contactUsValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  message: Yup.string()
    .min(5, "Message must be long")
    .required("Message is required"),
});
