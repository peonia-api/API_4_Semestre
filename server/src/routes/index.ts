import { Router, Request, Response } from "express";
import { UserController } from "../controllers"
import call from "./call";
import user from "./user";

const routes = Router()

routes.post("/login", UserController.login);
routes.use("/user", user);

routes.use("/call", call);


routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
