import { Router } from "express";
import { GroupController } from "../controllers";
const routes = Router();

routes.get('/historic', GroupController.getHistoricGroups);

routes.get('/cliente', GroupController.getGroupByCliente);

routes.get('/funcionario', GroupController.getGroupByFuncionario);

routes.get('/specific/:uuid', GroupController.getGroupByOne);

routes.get('/email/:email', GroupController.getByEmail);

routes.post('/create', GroupController.postGroup);

routes.put('/modify/:uuid', GroupController.putGroup);

routes.delete('/delete/:uuid', GroupController.deleteGroup);

routes.patch("/email", GroupController.patchGroup)
export default routes;

