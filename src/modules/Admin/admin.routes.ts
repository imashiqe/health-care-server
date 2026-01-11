import { AnyZodObject } from "./../../../node_modules/zod/src/v3/types";
import express, { NextFunction, Request, Response } from "express";
import { adminController } from "./admin.controller";
import z from "zod";

const router = express.Router();

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});
const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};
router.get("/", adminController.getAllFromDB);
router.get("/:id", adminController.getByIdFromDB);
router.patch("/:id", validateRequest(update), adminController.updateIntoDB);
router.delete("/:id", adminController.deleteFromDB);
router.patch("/soft/:id", adminController.softDeleteFromDB);
export const AdminRoutes = router;
