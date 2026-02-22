import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  //   console.log(req.body);

  try {
    const result = await userService.createAdmin(req);
    res.status(201).json({
      message: "Admin created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({
      message: "Failed to create admin",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const userController = {
  createAdmin,
};
