import { Router, Request, Response } from "express";
import matematica from './matematica';
import { UserController } from "../controllers"
import { authorization } from "../middlewares";
import user from "./user";

const routes = Router()

routes.post("/login", UserController.login);
routes.use("/user", user);
routes.use("/math", authorization, matematica);

routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
