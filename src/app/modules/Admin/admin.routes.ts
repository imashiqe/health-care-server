import express, { NextFunction, Request, Response } from "express";
import { adminController } from "./admin.controller";

import { adminValidationSchemas } from "./admin.validation";

import { UserRole } from "@prisma/client";
import auth from "../../middleWares/auth";
import validateRequest from "../../middleWares/validateRequest";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.getAllFromDB,
);
router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.getByIdFromDB,
);
router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(adminValidationSchemas.update),
  adminController.updateIntoDB,
);
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.deleteFromDB,
);
router.patch(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.softDeleteFromDB,
);
export const AdminRoutes = router;
