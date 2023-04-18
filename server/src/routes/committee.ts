import { Router } from "express";
import { CommitteeControllers } from "../controllers";
const routes = Router();

routes.get('/especifico/:uuid', CommitteeControllers.getCommittee);

routes.post('/createCommittee', CommitteeControllers.postCommittee);

routes.put('/modify/:uuid', CommitteeControllers.putCommittee);


export default routes;