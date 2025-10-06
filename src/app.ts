import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./modules/User/user.routes";
import { AdminRoutes } from "./modules/Admin/admin.routes";
import router from "./app/routes";

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
app.use((err, req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong",
    error: err.message,
  });
});
export default app;
