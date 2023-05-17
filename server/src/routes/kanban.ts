import { Router } from "express";

import KanbanController from "../controllers/KanbanController";
const routes = Router();

routes.get('/historic', KanbanController.getHistoricKanban);

routes.post('/create', KanbanController.postKanban);

routes.put('/modify/:uuid', KanbanController.putKanban);

routes.delete('/delete/:uuid', KanbanController.deleteKanban);

export default routes;
