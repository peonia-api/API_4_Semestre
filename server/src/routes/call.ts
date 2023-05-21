import { Router } from "express";
import { CallController } from "../controllers";
const routes = Router();

routes.get('/historic', CallController.getHistoricCall);
routes.get('/hotfix', CallController.getHistoricHotfix);
routes.get('/feature', CallController.getHistoricFeature);
routes.get('/especificoCall/:uuid', CallController.getCall);
routes.get('/callUser/:email', CallController.getHistoricCallUser);
routes.get('/arquivados', CallController.getUnarchived)
routes.post('/createCall', CallController.postCall);

routes.put('/modifyCall/:uuid', CallController.putCall);
routes.put('/updateHotfix/:uuid', CallController.updateHotfix);

routes.delete('/delete/:uuid', CallController.deleteCall);

routes.patch("/email", CallController.patchCall)
export default routes;

