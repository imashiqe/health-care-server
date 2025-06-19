import express, { Request, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await adminService.getAllFromDB(filters, options);
    res.status(200).json({
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
    res.status(200).json({
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

const updateIntoDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("id:", id);
  console.log("body:", req.body);
  try {
    const result = await adminService.updateIntoDB(id, req.body);
    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update admin",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const deleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await adminService.deleteFromDB(id);
    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
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
    await adminService.softDeleteFromDB(id);
    res.status(200).json({
      success: true,
      message: "Admin soft deleted successfully",
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
