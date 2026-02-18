import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import status from "http-status";

import { error } from "console";
import path from "path";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middleWares/globalErrorHandler";

const app: Application = express();

app.use(cors());
app.use(cookieParser());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Health Care Server",
  });
});

app.use("/api/v1", router);
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,

    message: "Not Found",
    error: {
      path: req.originalUrl,
      message: "Your requested URL not found",
    },
  });
});

export default app;
