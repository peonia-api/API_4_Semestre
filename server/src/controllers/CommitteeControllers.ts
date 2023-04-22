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

    public async getAllCommittee (req: Request, res: Response) : Promise<Response> {
        const committeeRepository = AppDataSource.getRepository(Committee)
        const allCommittee = await committeeRepository.find()
        return res.json(allCommittee)
    }

   

    public async postCommittee (req: Request, res: Response) : Promise<Response> {
        try{
            const id = req.body
            const committeeRepository = AppDataSource.getRepository(Committee)            

            const insertCommittee = new Committee();
            insertCommittee.id = id.id
            insertCommittee.comiImpactCto = null
            insertCommittee.comiCostSquad = null
            insertCommittee.comiImpactHp = null
            insertCommittee.comiRiskCso = null
            insertCommittee.comiRiskRt = null
            insertCommittee.call = id.id
            const allCommittee = await committeeRepository.save(insertCommittee)
            console.log(id);
            
            return res.json({allCommittee,mensage: "Todos já estão em avaliação"})
                 
        }
        catch(err){
            return res.status(400).json({Erro: "Erro ao criar"})
        }
    
        
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


    public async deleteCommittee(req: Request, res: Response): Promise<Response> {
        const deleteId:any = req.params.uuid
        const committeeRep = AppDataSource.getRepository(Committee)
        const find = await committeeRep.findOneBy({id: deleteId})
        const remove = await committeeRep.remove(find)
        return res.json(remove)
    }


   /*
     public async deleteCall (req: Request, res: Response) : Promise<Response> {
        const idCall:any = req.params.uuid
        const callRepository = AppDataSource.getRepository(Call)
        const findCall = await callRepository.findOneBy({id: idCall})
        const allCall = await callRepository.remove(findCall)
        return res.json(allCall)
    }
   */

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

    public async getCommitteeFilterAll (req: Request, res: Response) : Promise<Response> {
        const idCommittee:any = req.params.uuid
        const committeeRepository = AppDataSource.getRepository(Committee)
        const allCommittee = await committeeRepository.find()

        let lista:any = []

        allCommittee.map((data) => {
            if (data.comiRiskCso == 3) {
                lista.push({id: data.id, mensage:"Nota com alto risco, a feature deve ser arquivada!", arquivada: "Arquivada"})
            }
            else if (data.comiRiskRt == 3) {
                lista.push({id: data.id, mensage:"Nota com alto risco, a feature deve ser arquivada!", arquivada: "Arquivada"})
            }
            else if (data.comiImpactCto == 0) {
                lista.push({id: data.id, mensage:"Nota com baixo risco, a feature deve ser arquivada!", arquivada: "Arquivada"})
            }
            else if (data.comiImpactHp == 0) {
                lista.push({id: data.id, mensage:"Nota com baixo risco, a feature deve ser arquivada!", arquivada: "Arquivada"})
            }
            else if (data.comiCostSquad == 3) {
                lista.push({id: data.id, mensage:"Nota com alto risco, a feature deve ser arquivada!", arquivada: "Arquivada"})
            }
            else if(data.comiCostSquad == null || data.comiImpactCto == null || data.comiImpactHp == null || data.comiRiskCso == null || data.comiRiskRt == null){
                lista.push({id:data.id, mensage: "Ainda não foi avaliado", arquivada: "Em análise"})
            }
            else{
                lista.push({id: data.id, arquivada: "Aprovada"})
            }
        })  
        return res.json(lista)     
    }

    public async getCommitteeStatus (req: Request, res: Response) : Promise<Response> {
        const committeeRepository = AppDataSource.getRepository(Committee)
        const callRepository = AppDataSource.getRepository(Call)
        const allCommittee = await committeeRepository.find()
        const feature = await callRepository.findBy({ callType: "feature" })

        let lista:any = []
        let lista2:any = []

        allCommittee.map((data) => {
            if(allCommittee == null){
                lista.push({arquivada: null})
            }
            if (data.comiRiskCso == 3) {
                lista.push({id: data.id, mensage:"Nota com alto risco, a feature deve ser arquivada!", arquivada: "Arquivada"})
            }
            else if (data.comiRiskRt == 3) {
                lista.push({id: data.id, mensage:"Nota com alto risco, a feature deve ser arquivada!", arquivada: "Arquivada"})
            }
            else if (data.comiImpactCto == 0) {
                lista.push({id: data.id, mensage:"Nota com baixo risco, a feature deve ser arquivada!", arquivada: "Arquivada"})
            }
            else if (data.comiImpactHp == 0) {
                lista.push({id: data.id, mensage:"Nota com baixo risco, a feature deve ser arquivada!", arquivada: "Arquivada"})
            }
            else if (data.comiCostSquad == 3) {
                lista.push({id: data.id, mensage:"Nota com alto risco, a feature deve ser arquivada!", arquivada: "Arquivada"})
            }
            else if(data.comiCostSquad == null || data.comiImpactCto == null || data.comiImpactHp == null || data.comiRiskCso == null || data.comiRiskRt == null){
                lista.push({id:data.id, mensage: "Ainda não foi avaliado", arquivada: "Em análise"})
            }
            else{
                lista.push({id: data.id, arquivada: "Aprovada"})
            }
        })  
        for (let index = 0; index < feature.length; index++) {
            console.log(lista[index].arquivada == null);

            lista2.push({
                id: feature[index].id,
                callEmail:  feature[index].callEmail,
                callDateCreate:  feature[index].callDateCreate,
                callTitle:  feature[index].callTitle,
                callType:  feature[index].callType,
                callDescription:  feature[index].callDescription,
                arquivada: lista[index].arquivada
              })
        }

        
        

        return res.json(lista2)     
    }


}
export default new CommitteeController();