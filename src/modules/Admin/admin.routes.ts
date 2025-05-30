import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const router = express.Router();
const prisma = new PrismaClient();
router.get("/", async (req: Request, res: Response) => {
  const result = await prisma.admin.findMany();
  res.status(200).json({
    success: true,
    message: "Admins fetched successfully",
    data: result,
  });
});

export const AdminRoutes = router;
