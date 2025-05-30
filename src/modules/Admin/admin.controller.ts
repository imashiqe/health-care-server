import express, { Request, Response } from "express";

const getAllFromDB = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Admins fetched successfully",
  });
};

export const adminController = {
  getAllFromDB,
};
