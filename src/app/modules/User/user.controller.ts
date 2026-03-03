import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../shared/catchAsync";

/* ================= ADMIN ================= */

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req);

  res.status(201).json({
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

/* ================= DOCTOR ================= */

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createDoctor(req);

  res.status(201).json({
    success: true,
    message: "Doctor created successfully",
    data: result,
  });
});

/* ================= PATIENT ================= */
const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createPatient(req);

  res.status(201).json({
    success: true,
    message: "Patient created successfully",
    data: result,
  });
});

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
};
