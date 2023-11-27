import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("Please fill out this field"),
  password: Yup.string().required("Please fill out this field"),
});
