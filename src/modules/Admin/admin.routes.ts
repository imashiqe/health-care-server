import express, { Request, Response } from "express";
import { adminController } from "./admin.controller";

const router = express.Router();

router.get("/", adminController.getAllFromDB);
router.get("/:id", adminController.getByIdFromDB);
router.patch("/:id", adminController.updateIntoDB);
router.delete("/:id", adminController.deleteFromDB);
router.patch("/soft/:id", adminController.softDeleteFromDB);
export const AdminRoutes = router;
