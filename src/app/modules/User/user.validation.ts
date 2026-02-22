import { z } from "zod";

const createAdmin = z.object({
  password: z.string().min(1, "Password is required"),

  admin: z.object({
    name: z.string().min(1, "Name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please provide a valid email address"),

    contactNumber: z.string().min(1, "Contact number is required"),
  }),
});

export const userValidation = {
  createAdmin,
};
