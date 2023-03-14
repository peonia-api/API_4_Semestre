import { Router } from "express";
import {Matematica} from "../controllers";
import { authAdmin } from "../middlewares";
const routes = Router();

routes.get('/sum', Matematica.somar);
routes.get('/dif', authAdmin, Matematica.subtrair);

export default routes;