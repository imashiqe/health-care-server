import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./modules/User/user.routes";

const app: Application = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Health Care Server",
  });
});

app.use("/api/v1/user", userRoutes);

export default app;
