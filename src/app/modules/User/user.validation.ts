import { z } from "zod";

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

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

const createDoctor = z.object({
  password: z.string().min(6, "Password is required"),

  doctor: z.object({
    name: z.string().min(1, "Name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please provide a valid email address"),

    contactNumber: z.string().min(1, "Contact number is required"),

    address: z.string().optional(),

    registrationNumber: z.string().min(1, "Registration number is required"),

    experience: z.number().min(0, "Experience must be positive").optional(),

    gender: z.enum(["MALE", "FEMALE", "OTHER"]),

    appointmentFee: z.number().min(0, "Appointment fee is required"),

    qualification: z.string().min(1, "Qualification is required"),

    currentWorkingPlace: z.string().min(1, "Current working place is required"),

    designation: z.string().min(1, "Designation is required"),
  }),
});

export const userValidation = {
  createAdmin,
  createDoctor,
};
