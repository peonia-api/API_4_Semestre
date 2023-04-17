import { Router } from "express";
import { AttachmentController} from "../controllers";
import CommitteeControllers from "../controllers/CommitteeControllers";
const routes = Router();

const upload = require("../config/multer")

routes.get('/especifico/:uuid', CommitteeControllers.getCommittee);

routes.post('/createCommittee', CommitteeControllers.postCommittee);

routes.put('/modify/:uuid', CommitteeControllers.putCommittee);

export default routes;