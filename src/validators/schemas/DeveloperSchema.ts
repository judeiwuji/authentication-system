import { object, ref, string } from "yup";

export const DeveloperCreationSchema = object({
  confirmPassword: string().oneOf([ref("password")], "Password mismatch"),
  password: string().required("Provide your password"),
  email: string().email().required("Provide your email"),
  role: string().required("Provide your role"),
  company: string().required("Provide your company name"),
  lastname: string().required("Provide your lastname"),
  firstname: string().required("Provide your firstname"),
});

export const DeveloperUpdateSchema = object({
  role: string().optional(),
  company: string().optional(),
  lastname: string().optional(),
  firstname: string().optional(),
});
