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
        const callRepository = AppDataSource.getRepository(Call)
        const committeeRepository = AppDataSource.getRepository(Committee)
        const feature = await callRepository.findBy({ callType: "feature" })

        feature.map(async (fe) => {
            const committee = await committeeRepository.findOneBy({id: fe.id})
            const id:any = fe.id
            if(committee == null){
                const insertCommittee = new Committee();
                insertCommittee.id = id
                insertCommittee.comiImpactCto = null
                insertCommittee.comiCostSquad = null
                insertCommittee.comiImpactHp = null
                insertCommittee.comiRiskCso = null
                insertCommittee.comiRiskRt = null
                insertCommittee.call = id
                const allCommittee = await committeeRepository.save(insertCommittee)
            }
            
        })
        return res.json({mensage: "Todos já estão em avaliação"})
    }

    public async putCommitteeImpactCto (req: Request, res: Response) : Promise<Response> {
        const createCommittee = req.body
        const idCommittee:any = req.params.uuid
        const committeeRepository = AppDataSource.getRepository(Committee)
        const findCommittee = await committeeRepository.findOneBy({id: idCommittee})
        findCommittee.comiImpactCto = createCommittee.comiImpactCto

        const allCommittee = await committeeRepository.save(findCommittee)
        return res.json(allCommittee)
    }
    public async putCommitteeImpactHp (req: Request, res: Response) : Promise<Response> {
        const createCommittee = req.body
        const idCommittee:any = req.params.uuid
        const committeeRepository = AppDataSource.getRepository(Committee)
        const findCommittee = await committeeRepository.findOneBy({id: idCommittee})
        findCommittee.comiImpactHp = createCommittee.comiImpactHp

        const allCommittee = await committeeRepository.save(findCommittee)
        return res.json(allCommittee)
    }
    public async putCommitCostSquad (req: Request, res: Response) : Promise<Response> {
        const createCommittee = req.body
        const idCommittee:any = req.params.uuid
        const committeeRepository = AppDataSource.getRepository(Committee)
        const findCommittee = await committeeRepository.findOneBy({id: idCommittee})
        findCommittee.comiCostSquad = createCommittee.comiCostSquad

        const allCommittee = await committeeRepository.save(findCommittee)
        return res.json(allCommittee)
    }
    public async putCommitRikRt (req: Request, res: Response) : Promise<Response> {
        const createCommittee = req.body
        const idCommittee:any = req.params.uuid
        const committeeRepository = AppDataSource.getRepository(Committee)
        const findCommittee = await committeeRepository.findOneBy({id: idCommittee})
        findCommittee.comiRiskRt = createCommittee.comiRiskRt

        const allCommittee = await committeeRepository.save(findCommittee)
        return res.json(allCommittee)
    }
    public async putCommitRiskCso (req: Request, res: Response) : Promise<Response> {
        const createCommittee = req.body
        const idCommittee:any = req.params.uuid
        const committeeRepository = AppDataSource.getRepository(Committee)
        const findCommittee = await committeeRepository.findOneBy({id: idCommittee})
        findCommittee.comiRiskCso = createCommittee.comiRiskCso

        const allCommittee = await committeeRepository.save(findCommittee)
        return res.json(allCommittee)
    }
    public async getCommitteeFilter (req: Request, res: Response) : Promise<Response> {
        const idCommittee:any = req.params.uuid
        const committeeRepository = AppDataSource.getRepository(Committee)
        const allCommittee = await committeeRepository.findOneBy({id: idCommittee})
        const validate = {mensage:"Nota com alto risco, a feature deve ser arquivada!", arquivada: true}
        const validate1 = {mensage:"Nota com baixo risco, a feature deve ser arquivada!", arquivada: true}
        
        if(allCommittee.comiCostSquad == null || allCommittee.comiImpactCto == null || allCommittee.comiImpactHp == null || allCommittee.comiRiskCso == null || allCommittee.comiRiskRt == null){
            return res.json({mensage: "Ainda não foi avaliado", arquivada: null})
        }
        if (allCommittee.comiRiskCso == 3) {
            return res.json(validate)
        }
        else if (allCommittee.comiRiskRt == 3) {
            return res.json(validate)
        }
        else if (allCommittee.comiImpactCto == 0) {
            return res.json(validate1)
        }
        else if (allCommittee.comiImpactHp == 0) {
            return res.json(validate1)
        }
        else if (allCommittee.comiCostSquad == 3) {
            return res.json(validate)
        }
        else{
            return res.json({allCommittee, arquivada: false})

        }

        
    }


}
export default new CommitteeController();