import { Router } from "express";
import {UserController} from "../controllers";
const routes = Router();

routes.post('/create', UserController.create);
routes.post("/login", UserController.login)


routes.get('/historicUser', UserController.getHistoricUser);

routes.get('/especificoUser/:uuid', UserController.getUser);

routes.post('/createUser', UserController.postUser);

routes.put('/modifyUser/:uuid', UserController.putUser);

routes.delete('/delete/:uuid', UserController.deleteUser);

export default routes;
