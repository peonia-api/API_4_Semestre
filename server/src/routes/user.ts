import { Router } from "express";
import {UserController} from "../controllers";
const routes = Router();

routes.post('/create', UserController.create);


export default routes;