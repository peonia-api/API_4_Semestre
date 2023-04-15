import cors = require("cors");
import { Router, Request, Response } from "express";

import call from "./call";
import { Attachment } from "../entities/Attachment";
import attachment from "./attachment";

const routes = Router()

routes.use(cors());

routes.use("/call", call);

routes.use("/file", attachment);


routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
