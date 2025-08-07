import express, { Application, Request, Response } from "express";
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

export default app;
