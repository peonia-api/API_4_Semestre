import { Router } from "express";

import taskController from "../controllers/TaskController";
const routes = Router();

routes.get('/historic', taskController.getHistoric);

routes.post('/create', taskController.post);

routes.put('/modify/:uuid', taskController.put);

routes.delete('/delete/:uuid', taskController.delete);

export default routes;
