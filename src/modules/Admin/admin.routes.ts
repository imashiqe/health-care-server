import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { adminController } from "./admin.controller";

const router = express.Router();

router.get("/", adminController.getAllFromDB);

export const AdminRoutes = router;
