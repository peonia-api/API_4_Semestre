import { Router } from "express";
import { CommitteeControllers } from "../controllers";
const routes = Router();

routes.get('/especifico/:uuid', CommitteeControllers.getCommittee);
routes.get('/committeeAll', CommitteeControllers.getAllCommittee);
routes.get("/filter/:uuid", CommitteeControllers.getCommitteeFilter)
routes.get("/filterAll", CommitteeControllers.getCommitteeFilterAll);
routes.get("/filterAllStatus", CommitteeControllers.getCommitteeStatus);
routes.post('/createCommittee', CommitteeControllers.postCommittee);

routes.put('/impactCto/:uuid', CommitteeControllers.putCommitteeImpactCto);
routes.put('/impactHp/:uuid', CommitteeControllers.putCommitteeImpactHp)
routes.put("/costSquad/:uuid", CommitteeControllers.putCommitCostSquad)
routes.put("/riskRt/:uuid", CommitteeControllers.putCommitRikRt)
routes.put("/riskCso/:uuid", CommitteeControllers.putCommitRiskCso)

routes.delete("/deletar/:uuid", CommitteeControllers.deleteCommittee)

export default routes;