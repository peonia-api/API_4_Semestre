import { Router } from "express";
import {UserController} from "../controllers";
const routes = Router();

routes.post('/create', UserController.create);

routes.get('/historicUser', UserController.getUser);

routes.post('/createUser', UserController.postUser);

routes.put('/modify/:uuid', UserController.putUser);

routes.delete('/delete/:uuid', UserController.deleteUser);

export default routes;