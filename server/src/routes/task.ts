import { Router } from "express";

import{ TaskController }from "../controllers/";
const routes = Router();

routes.get('/historic/:uuid', TaskController.getHistoric);

routes.post('/create', TaskController.post);

routes.put('/modify/:uuid', TaskController.put);

routes.patch("/patch/", TaskController.patch)

routes.delete('/delete/:uuid', TaskController.delete);

export default routes;
