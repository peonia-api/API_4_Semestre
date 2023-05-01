import cors = require("cors");
import { Router, Request, Response } from "express";
import call from "./call";
import attachment from "./attachment";
import user from "./user";
import group from "./group";
import committee from "./committee";

const routes = Router()

routes.use(cors());

routes.use("/call", call);

routes.use("/file", attachment);

routes.use("/committee", committee);

routes.use("/group", group);

routes.use("/user", user)

routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
