import { Router } from "express";
import { AttachmentController} from "../controllers";
const routes = Router();

const upload = require("../config/multer")

routes.post('/fun/:uuid', AttachmentController.fun);
routes.post("/file/:uuid", upload.array("file"), AttachmentController.file) //single("file")
routes.get('/fileAll', AttachmentController.getAll)
routes.delete("/fileRemove/:uuid", AttachmentController.deleteFile)
routes.delete("/fileRemoveSupa/:uuid", AttachmentController.deleteFileSupabase)
routes.put("/fileReneme/:uuid", upload.single("file") , AttachmentController.putFile)
routes.get("/fileCall/:uuid", AttachmentController.getFileByCallId)

export default routes;