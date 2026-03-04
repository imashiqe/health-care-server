import { Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../shared/catchAsync";
import sendResponse from "../shared/sendResponse";
import pick from "../shared/pick";
import { userFilterableFields, userSearchAbleFields } from "./user.constant";
import status from "http-status";

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

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await userService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Users fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
};
