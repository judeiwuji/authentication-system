import { object, string } from "yup";

export const ClientAppCreationSchema = object({
  redirectURL: string().required("Provide redirect URL"),
  name: string().required("Provide app name"),
});

export const ClientAppUpdateSchema = object({
  redirectURL: string().optional(),
});
