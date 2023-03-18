import { Router } from "express";
import { CallController } from "../controllers";
const routes = Router();

routes.get('/historic', CallController.getHistoricCall);
routes.get('/hotfix', CallController.getHistoricHotfix);
routes.get('/feature', CallController.getHistoricFeature);

routes.post('/createCall', CallController.postCall);

routes.put('/modify/:uuid', CallController.putCall);

routes.delete('/delete/:uuid', CallController.deleteCall);
export default routes;

