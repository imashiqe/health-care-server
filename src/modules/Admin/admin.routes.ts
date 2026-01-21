import express, { NextFunction, Request, Response } from "express";
import { adminController } from "./admin.controller";
import z from "zod";
import validateRequest from "../../app/routes/middleWares/validateRequest";

const router = express.Router();

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});

router.get("/", adminController.getAllFromDB);
router.get("/:id", adminController.getByIdFromDB);
router.patch("/:id", validateRequest(update), adminController.updateIntoDB);
router.delete("/:id", adminController.deleteFromDB);
router.patch("/soft/:id", adminController.softDeleteFromDB);
export const AdminRoutes = router;
