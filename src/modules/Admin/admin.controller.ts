import express, { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { json } from "stream/consumers";
import sendResponse from "../shared/sendResponse";
import status from "http-status";
const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await adminService.getAllFromDB(filters, options);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admins fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admins",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const getByIdFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await adminService.getByIdFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const updateIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  console.log("id:", id);
  console.log("body:", req.body);
  try {
    const result = await adminService.updateIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
    // res.status(500).json({
    //   success: false,
    //   message: "Failed to update admin",
    //   error: err instanceof Error ? err.message : "Unknown error",
    // });
  }
};

const deleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await adminService.deleteFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete admin",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const softDeleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await adminService.softDeleteFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin soft deleted successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to soft delete admin",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const adminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
