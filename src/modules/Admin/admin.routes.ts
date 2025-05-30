import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/");

export const AdminRoutes = router;
