"use server";

import * as z from "zod";
import { LoginSchema } from "~/schemas";

export const login = async (
  values: z.infer<ReturnType<typeof LoginSchema>>,
) => {
  console.log(values);
};
