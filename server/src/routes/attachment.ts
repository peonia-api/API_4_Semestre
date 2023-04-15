import { Router } from "express";
import { AttachmentController} from "../controllers";
const routes = Router();

const upload = require("../config/multer")

routes.get('/fun', AttachmentController.fun);
routes.post("/file", upload.array("file", 10), AttachmentController.file) //single("file")
routes.get('/fileAll', AttachmentController.getAll)
routes.delete("/fileRemove/:uuid", AttachmentController.deleteFile)
routes.put("/fileReneme/:uuid", upload.single("file") , AttachmentController.putFile)

// routes.get('/hotfix', CallController.getHistoricHotfix);
// routes.get('/feature', CallController.getHistoricFeature);
// routes.get('/especifico/:uuid', CallController.getCall);

// routes.post('/createCall', CallController.postCall);

// routes.put('/modify/:uuid', CallController.putCall);

// routes.delete('/delete/:uuid', CallController.deleteCall);
export default routes;