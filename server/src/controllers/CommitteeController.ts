import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Call } from "../entities/Call";
import { Committee } from "../entities/Committee";
import { logger } from "../config/logger";
import { validateCommitteeFilter } from "../utils/funcao";
import { ObjectLiteral } from "typeorm";


class CommitteeController {




    public async getCommittee(req: Request, res: Response): Promise<Response> {
        const idCommittee: any = req.params.uuid
        const committeeRepository = AppDataSource.getRepository(Committee)
        const allCommittee = await committeeRepository.findOneBy({ id: idCommittee })
        validateCommitteeFilter(idCommittee)
        return res.json(allCommittee)
    }

    public async getAllCommittee(req: Request, res: Response): Promise<Response> {
        const committeeRepository = AppDataSource.getRepository(Committee)
        const allCommittee = await committeeRepository.find()
        return res.json(allCommittee)
    }



    public async postCommittee(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.body
            const committeeRepository = AppDataSource.getRepository(Committee)
            const getComite = await committeeRepository.find()
            let allCommittee;
            const findComiteId = getComite.find(elem => elem.id == id.id);
            if (findComiteId == undefined) {
                const insertCommittee = new Committee();
                insertCommittee.id = id.id
                insertCommittee.comiImpactCto = null
                insertCommittee.comiImpactHp = null
                insertCommittee.comiRiskCso = null
                insertCommittee.comiRiskRt = null
                insertCommittee.call = id.id
                insertCommittee.comiImpactCtoAvaliation = null
                insertCommittee.comiImpactoHpAvaliation = null
                insertCommittee.comiRiskCsoAvaliation = null
                insertCommittee.comiRiskRtAvaliation = null
                allCommittee = await committeeRepository.save(insertCommittee)
                console.log(id);
            }
            return res.json({ allCommittee, mensage: "Todos já estão em avaliação" })

        }
        catch (err) {
            return res.status(400).json({ Erro: "Erro ao criar" })
        }


    }

    public async putCommitteeImpactCto(req: Request, res: Response): Promise<Response> {
        const createCommittee = req.body
        const idCommittee: any = req.params.uuid
        const committeeRepository = AppDataSource.getRepository(Committee)
        const findCommittee = await committeeRepository.findOneBy({ id: idCommittee })
        findCommittee.comiImpactCto = createCommittee.impact
        findCommittee.comiImpactCtoAvaliation = createCommittee.desc
        const allCommittee = await committeeRepository.save(findCommittee)
        validateCommitteeFilter(idCommittee)

        return res.json(allCommittee)
    }
    public async putCommitteeImpactHp(req: Request, res: Response): Promise<Response> {
        const createCommittee = req.body
        const idCommittee: any = req.params.uuid
        const committeeRepository = AppDataSource.getRepository(Committee)
        const findCommittee = await committeeRepository.findOneBy({ id: idCommittee })
        findCommittee.comiImpactHp = createCommittee.impact
        findCommittee.comiImpactoHpAvaliation = createCommittee.desc
        const allCommittee = await committeeRepository.save(findCommittee)
        validateCommitteeFilter(idCommittee)
        return res.json(allCommittee)
    }
    // public async putCommitCostSquad (req: Request, res: Response) : Promise<Response> {
    //     const createCommittee = req.body
    //     const idCommittee:any = req.params.uuid
    //     const committeeRepository = AppDataSource.getRepository(Committee)
    //     const findCommittee = await committeeRepository.findOneBy({id: idCommittee})


    //     const allCommittee = await committeeRepository.save(findCommittee)
    //     return res.json(allCommittee)
    // }
    public async putCommitRikRt(req: Request, res: Response): Promise<Response> {
        const createCommittee = req.body
        const idCommittee: any = req.params.uuid
        const committeeRepository = AppDataSource.getRepository(Committee)
        const findCommittee = await committeeRepository.findOneBy({ id: idCommittee })
        findCommittee.comiRiskRt = createCommittee.impact
        findCommittee.comiRiskRtAvaliation = createCommittee.desc
        const allCommittee = await committeeRepository.save(findCommittee)
        validateCommitteeFilter(idCommittee)
        return res.json(allCommittee)
    }
    public async putCommitRiskCso(req: Request, res: Response): Promise<Response> {
        const createCommittee = req.body
        const idCommittee: any = req.params.uuid
        const committeeRepository = AppDataSource.getRepository(Committee)
        const findCommittee = await committeeRepository.findOneBy({ id: idCommittee })
        findCommittee.comiRiskCso = createCommittee.impact
        findCommittee.comiRiskCsoAvaliation = createCommittee.desc
        const allCommittee = await committeeRepository.save(findCommittee)
        validateCommitteeFilter(idCommittee)

        return res.json(allCommittee)
    }

    public async deleteCommittee(req: Request, res: Response): Promise<Response> {
        const deleteId: any = req.params.uuid
        const committeeRep = AppDataSource.getRepository(Committee)
        const find = await committeeRep.findOneBy({ id: deleteId })
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



    public async getCommitteeFilterAll(req: Request, res: Response): Promise<Response> {
        try {
            const committeeRepository = AppDataSource.getRepository(Committee)
            const allCommittee = await committeeRepository.find()

            allCommittee.map((data) => {
                validateCommitteeFilter(data.id)
            })
            return res.json(allCommittee)
        } catch (err) {
            return res.status(400).json(err)
        }

    }

    public async getCommitteeStatus(req: Request, res: Response): Promise<Response> {
        try {
            const callRepository = AppDataSource.getRepository(Call)
            const allcall = await callRepository.find()

            return res.json(allcall)
        } catch (err) {
            return res.json({ menssagem: "Erro" })
        }

    }


    public async getcomiRisCso(req: Request, res: Response): Promise<Response> {
        try {
            const callRepository = AppDataSource.getRepository(Call)
            const feature = await callRepository.findBy({ callType: "feature", callStatus: "Em análise", avaliar: "CSO" })

            return res.json(feature)
        } catch (err) {
            return res.status(400).json({ menssagem: "Erro" })
        }
    }

    public async getcomiRiskRt(req: Request, res: Response): Promise<Response> {
        try {
            const callRepository = AppDataSource.getRepository(Call)
            const feature = await callRepository.findBy({ callType: "feature", callStatus: "Em análise", avaliar: "RT" })
            return res.json(feature)
        } catch (err) {
            return res.status(400).json({ menssagem: "Erro" })
        }
    }

    public async getcomiImpactCto(req: Request, res: Response): Promise<Response> {
        try {
            const callRepository = AppDataSource.getRepository(Call)
            const feature = await callRepository.findBy({ callType: "feature", callStatus: "Em análise", avaliar: "CTO" })
            return res.json(feature)
        } catch (err) {
            return res.status(400).json({ menssagem: "Erro" })
        }
    }

    public async getcomiImpactHp(req: Request, res: Response): Promise<Response> {
        try {
            const callRepository = AppDataSource.getRepository(Call)
            const feature = await callRepository.findBy({ callType: "feature", callStatus: "Em análise", avaliar: "HP" })
            const hotfix = await callRepository.findBy({ callType: "hotfix", callStatus: "Em análise" })
            let calls = feature.concat(hotfix);
            return res.json(calls)
        } catch (err) {
            return res.status(400).json({ menssagem: "Erro" })
        }
    }

    // public async getcomiCostSquad (req: Request, res: Response) : Promise<Response> {
    //     const committeeRepository = AppDataSource.getRepository(Committee)
    //     const callRepository = AppDataSource.getRepository(Call)
    //     const allCommittee = await committeeRepository.find()
    //     const feature = await callRepository.findBy({ callType: "feature" })

    //     let lista2:any = []
    //     let lista3:any = []


    //     allCommittee.map((data) => {
    //         if(data.comiRiskCso < 3 && data.comiRiskRt < 3 && data.comiImpactCto > 0 && data.comiImpactHp > 0 && data.comiRiskCso != null && data.comiRiskRt != null && data.comiImpactCto != null && data.comiImpactHp != null){
    //             lista3.push({
    //                 id: data.id,
    //                 mensage: "Ainda não foi avaliado", 
    //                 arquivada: "Avaliar"
    //             })
    //         }
    //     })
    //     console.log(lista3);

    //     feature.map((data) => {
    //         lista3.map((l) => {
    //             if(data.id == l.id){
    //                 lista2.push({
    //                     id: l.id,
    //                     callEmail:  data.callEmail,
    //                     callDateCreate:  data.callDateCreate,
    //                     callTitle:  data.callTitle,
    //                     callType:  data.callType,
    //                     callDescription:  data.callDescription,
    //                     arquivada: l.arquivada
    //                 })
    //             }
    //         })
    //     })



    //     return res.json(lista2)     
    // }

    public async getArchived(req: Request, res: Response): Promise<Response> {
        try {
            const callRepository = AppDataSource.getRepository(Call)
            const committeeRepository = AppDataSource.getRepository(Committee)
            const findCall = await callRepository.findBy({ callType: "feature" })
            const findCommittee = await committeeRepository.find()
            //{
            //     relations: { call: true },
            //     where: {
            //         call: { callStatus: "Arquivada" },
            //     },
            // }

            logger.info(JSON.stringify({ findCommittee, message: "Sucesso ao buscar os chamados arquivados." }))
            return res.json(findCommittee)
        } catch (err) {
            logger.error(JSON.stringify({ mensage: "Erro ao buscar os chamados arquivados" }))
            return res.status(400).json({ mensage: "Erro ao buscar os chamados arquivados" })
        }
    }

    public async putStatus(req: Request, res: Response): Promise<Response> {
        try {
            const uuid: any = req.params.uuid
            const status: any = req.body
            const dateFinal: any = req.body
            const callrep = AppDataSource.getRepository(Call)
            const call = await callrep.findOneBy({ id: uuid })
            call.callStatus = status.status
            call.callDateFinalization = new Date();
            const callS = await callrep.save(call)
            return res.json(callS)
        } catch (err) {
            return
        }
    }

}

export default new CommitteeController();