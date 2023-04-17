import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Call } from "../entities/Call";
import { Committee } from "../entities/Committee";


class CommitteeController {


    public async getCommittee (req: Request, res: Response) : Promise<Response> {
        const idCommittee:any = req.params.uuid
        const committeeRepository = AppDataSource.getRepository(Committee)
        const allCommittee = await committeeRepository.findOneBy({id: idCommittee})
        return res.json(allCommittee)
    }

    public async postCommittee (req: Request, res: Response) : Promise<Response> {
        const createCommittee = req.body
        const committeeRepository = AppDataSource.getRepository(Committee)
        const insertCommittee = new Committee();
        insertCommittee.comiImpactCto = createCommittee.comiImpactCto
        insertCommittee.comiImpactHp = createCommittee.comiImpactHp
        insertCommittee.comiCostSquad = createCommittee.comiCostSquad
        insertCommittee.comiRiskRt = createCommittee.comiRiskRt
        insertCommittee.comiRiskCso = createCommittee.comiRiskCso
  
    

        const allCommittee = await committeeRepository.save(insertCommittee)
        return res.json(allCommittee)
    }

    public async putCommittee (req: Request, res: Response) : Promise<Response> {
        const createCommittee = req.body
        const idCommittee:any = req.params.uuid
        const committeeRepository = AppDataSource.getRepository(Committee)
        const findCommittee = await committeeRepository.findOneBy({id: idCommittee})
        findCommittee.comiImpactCto = createCommittee.comiImpactCto
        findCommittee.comiImpactHp = createCommittee.comiImpactHp
        findCommittee.comiCostSquad = createCommittee.comiCostSquad
        findCommittee.comiRiskRt = createCommittee.comiRiskRt
        findCommittee.comiRiskCso = createCommittee.comiRiskCso

    
        const allCommittee = await committeeRepository.save(findCommittee)
        return res.json(allCommittee)
    }

}
export default new CommitteeController();