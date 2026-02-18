import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";

import { UserRole } from "@prisma/client";
import auth from "../../middleWares/auth";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.createAdmin,
);

export const userRoutes = router;
