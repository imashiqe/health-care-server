import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
// import { userRoutes } from "./modules/User/user.routes";
// import { AdminRoutes } from "./modules/Admin/admin.routes";
import router from "./app/routes";
import status from "http-status";
import globalErrorHandler from "./app/routes/middleWares/globalErrorHandler";
import { error } from "console";
import path from "path";

const app: Application = express();

app.use(cors());
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
