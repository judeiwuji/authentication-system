import { object, string } from "yup";

const LoginSchema = object({
  password: string().required("Missing credentials"),
  email: string().required("Missing credentials"),
});

export default LoginSchema;
