import express from "express";
import { authController } from "./auth.controller";
import auth from "../../app/routes/middleWares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/login", authController.loginUser);

router.post("/refresh-token", authController.refreshToken);
router.post(
  "/change-password",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  authController.changePassword,
);
export const authRoutes = router;
