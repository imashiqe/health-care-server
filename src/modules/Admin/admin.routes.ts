import express, { NextFunction, Request, Response } from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../app/routes/middleWares/validateRequest";
import { adminValidationSchemas } from "./admin.validation";

const router = express.Router();

router.get("/", adminController.getAllFromDB);
router.get("/:id", adminController.getByIdFromDB);
router.patch(
  "/:id",
  validateRequest(adminValidationSchemas.update),
  adminController.updateIntoDB,
);
router.delete("/:id", adminController.deleteFromDB);
router.patch("/soft/:id", adminController.softDeleteFromDB);
export const AdminRoutes = router;
