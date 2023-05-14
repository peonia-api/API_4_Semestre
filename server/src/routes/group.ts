import { Router } from "express";
import { GroupController } from "../controllers";
const routes = Router();

routes.get('/historic', GroupController.getHistoricGroups);

routes.get('/cliente', GroupController.getGroupByCliente);

routes.get('/specific/:uuid', GroupController.getGroupByOne);

routes.post('/create', GroupController.postGroup);

routes.put('/modify/:uuid', GroupController.putGroup);

routes.delete('/delete/:uuid', GroupController.deleteGroup);
export default routes;

