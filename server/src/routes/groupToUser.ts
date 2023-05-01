import { Router } from "express";
import { GroupToUserController } from "../controllers";
const routes = Router();

routes.get('/historic', GroupToUserController.getHistoric);

routes.get('/specific/:uuid', GroupToUserController.getGroupByOne);

routes.post('/create', GroupToUserController.postGroup);

routes.put('/modify/:uuid', GroupToUserController.putGroup);

routes.delete('/delete/:uuid', GroupToUserController.deleteGroup);
export default routes;

