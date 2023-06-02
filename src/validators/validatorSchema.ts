import { AnySchema } from "yup";

export default async function validateSchema(schema: AnySchema, data: any) {
  return await schema.validate(data, { stripUnknown: true });
}
