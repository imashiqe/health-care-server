import express, { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllFromDB(req.query);
    res.status(200).json({
      success: true,
      message: "Admins fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admins",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const adminController = {
  getAllFromDB,
};
