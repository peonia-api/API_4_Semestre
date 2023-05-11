import { Router } from "express";
import { GroupToCallController } from "../controllers";
const routes = Router();

routes.get('/historic', GroupToCallController.getHistoric);

routes.get('/specific/:uuid', GroupToCallController.getGroupByOne);

routes.get('/grouptocall/:uuid', GroupToCallController.getGroupToCall);

routes.post('/create', GroupToCallController.postGroup);

routes.put('/modify/:uuid', GroupToCallController.putGroup);

routes.delete('/delete/:uuid', GroupToCallController.deleteGroup);
export default routes;

