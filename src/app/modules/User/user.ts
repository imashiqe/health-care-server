import e from "express";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("User route");
});

export const userRoutes = router;
