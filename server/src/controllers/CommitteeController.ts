import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Call } from "../entities/Call";
import { Committee } from "../entities/Committee";
import { Attachment } from "../entities/Attachment";
import { logger } from "../config/logger";


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
    // public async putCommitCostSquad (req: Request, res: Response) : Promise<Response> {
    //     const createCommittee = req.body
    //     const idCommittee:any = req.params.uuid
    //     const committeeRepository = AppDataSource.getRepository(Committee)
    //     const findCommittee = await committeeRepository.findOneBy({id: idCommittee})
    

    //     const allCommittee = await committeeRepository.save(findCommittee)
    //     return res.json(allCommittee)
    // }
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
        
        if(allCommittee.comiImpactCto == null || allCommittee.comiImpactHp == null || allCommittee.comiRiskCso == null || allCommittee.comiRiskRt == null){
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
            else if(data.comiImpactCto == null || data.comiImpactHp == null || data.comiRiskCso == null || data.comiRiskRt == null){
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
        const filesRep = AppDataSource.getRepository(Attachment)
        const allFiles = await filesRep.find()
        const allCommittee = await committeeRepository.find()
        const feature = await callRepository.findBy({ callType: "feature" })
        const allcall = await callRepository.find()
        

        let lista:any = []
        let lista2:any = []
        let lista3:any = []

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
            else if(data.comiImpactCto == null || data.comiImpactHp == null || data.comiRiskCso == null || data.comiRiskRt == null){
                lista.push({id:data.id, mensage: "Ainda não foi avaliado", arquivada: "Em análise"})
            }
            else{
                lista.push({id: data.id, arquivada: "Aprovada"})
            }
        })  
        console.log(lista);
        
        //for (let index = 0; index < allcall.length; index++) {
            allcall.map((call) => {
                
                    if(call.callType == 'feature'){
                        lista.map((l) => {
                            if(call.id == l.id){
                                if(l.arquivada == "Arquivada" && call.callStatus == "Aprovada" || call.callStatus == "Em desenvolvimento"){
                                    lista2.push({
                                        id: l.id,
                                        callEmail:  call.callEmail,
                                        callDateCreate:  call.callDateCreate,
                                        callTitle:  call.callTitle,
                                        callType:  call.callType,
                                        callDescription:  call.callDescription,
                                        arquivada: call.callStatus
                                    })
                                }else{
                                    lista2.push({
                                        id: l.id,
                                        callEmail:  call.callEmail,
                                        callDateCreate:  call.callDateCreate,
                                        callTitle:  call.callTitle,
                                        callType:  call.callType,
                                        callDescription:  call.callDescription,
                                        arquivada: l.arquivada
                                    })
                                }
                            }
                        })
                    }else{
                        lista2.push({
                            id: call.id,
                            callEmail:  call.callEmail,
                            callDateCreate:  call.callDateCreate,
                            callTitle:  call.callTitle,
                            callType:  call.callType,
                            callDescription:  call.callDescription,
                            arquivada: "Em desenvolvimento"
                        })
                    }
                
            })
            
            
        //}

        
        

        return res.json(lista2)     
    }


    public async getcomiRisCso (req: Request, res: Response) : Promise<Response> {
        const committeeRepository = AppDataSource.getRepository(Committee)
        const callRepository = AppDataSource.getRepository(Call)
        const allCommittee = await committeeRepository.find()
        const feature = await callRepository.findBy({ callType: "feature" })

        let lista2:any = []
        let lista3:any = []


        allCommittee.map((data) => {
            if(data.comiRiskCso == null){
                lista3.push({
                    id: data.id,
                    mensage: "Ainda não foi avaliado", 
                    arquivada: "Avaliar"
                })
            }
        })
        console.log(lista3);
        
        feature.map((data) => {
            lista3.map((l) => {
                if(data.id == l.id){
                    lista2.push({
                        id: l.id,
                        callEmail:  data.callEmail,
                        callDateCreate:  data.callDateCreate,
                        callTitle:  data.callTitle,
                        callType:  data.callType,
                        callDescription:  data.callDescription,
                        arquivada: l.arquivada
                    })
                }
            })
        })
        
        

        return res.json(lista2)     
    }

    public async getcomiRiskRt (req: Request, res: Response) : Promise<Response> {
        const committeeRepository = AppDataSource.getRepository(Committee)
        const callRepository = AppDataSource.getRepository(Call)
        const allCommittee = await committeeRepository.find()
        const feature = await callRepository.findBy({ callType: "feature" })

        let lista2:any = []
        let lista3:any = []


        allCommittee.map((data) => {
            if(data.comiRiskRt == null && data.comiRiskCso < 3 && data.comiRiskCso != null){
                lista3.push({
                    id: data.id,
                    mensage: "Ainda não foi avaliado", 
                    arquivada: "Avaliar"
                })
            }
        })

        feature.map((data) => {
            lista3.map((l) => {
                if(data.id == l.id){
                    lista2.push({
                        id: l.id,
                        callEmail:  data.callEmail,
                        callDateCreate:  data.callDateCreate,
                        callTitle:  data.callTitle,
                        callType:  data.callType,
                        callDescription:  data.callDescription,
                        arquivada: l.arquivada
                    })
                }
            })
        })
        
        

        return res.json(lista2)     
    }

    public async getcomiImpactCto (req: Request, res: Response) : Promise<Response> {
        const committeeRepository = AppDataSource.getRepository(Committee)
        const callRepository = AppDataSource.getRepository(Call)
        const allCommittee = await committeeRepository.find()
        const feature = await callRepository.findBy({ callType: "feature" })

        let lista2:any = []
        let lista3:any = []


        allCommittee.map((data) => {
            if(data.comiImpactCto == null && data.comiRiskCso < 3 && data.comiRiskRt < 3 && data.comiRiskCso != null && data.comiRiskRt != null){
                lista3.push({
                    id: data.id,
                    mensage: "Ainda não foi avaliado", 
                    arquivada: "Avaliar"
                })
            }
        })
        console.log(lista3);
        
        feature.map((data) => {
            lista3.map((l) => {
                if(data.id == l.id){
                    lista2.push({
                        id: l.id,
                        callEmail:  data.callEmail,
                        callDateCreate:  data.callDateCreate,
                        callTitle:  data.callTitle,
                        callType:  data.callType,
                        callDescription:  data.callDescription,
                        arquivada: l.arquivada
                    })
                }
            })
        })
        
        

        return res.json(lista2)     
    }

    public async getcomiImpactHp (req: Request, res: Response) : Promise<Response> {
        const committeeRepository = AppDataSource.getRepository(Committee)
        const callRepository = AppDataSource.getRepository(Call)
        const allCommittee = await committeeRepository.find()
        const feature = await callRepository.findBy({ callType: "feature" })

        let lista2:any = []
        let lista3:any = []


        allCommittee.map((data) => {
            if(data.comiImpactHp == null && data.comiRiskCso < 3 && data.comiRiskRt < 3 && data.comiImpactCto > 0 && data.comiRiskCso != null && data.comiRiskRt != null && data.comiImpactCto != null){
                lista3.push({
                    id: data.id,
                    mensage: "Ainda não foi avaliado", 
                    arquivada: "Avaliar"
                })
            }
        })
        console.log(lista3);
        
        feature.map((data) => {
            lista3.map((l) => {
                if(data.id == l.id){
                    lista2.push({
                        id: l.id,
                        callEmail:  data.callEmail,
                        callDateCreate:  data.callDateCreate,
                        callTitle:  data.callTitle,
                        callType:  data.callType,
                        callDescription:  data.callDescription,
                        arquivada: l.arquivada
                    })
                }
            })
        })
        
        

        return res.json(lista2)     
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

    public async getArchived (req: Request, res: Response) : Promise<Response> {
        try{
            const callRepository = AppDataSource.getRepository(Call)
            const committeeRepository = AppDataSource.getRepository(Committee)
            let lista = []
            const findCall = await callRepository.find()
            const findCommittee = await committeeRepository.find()
            findCall.map((s)=>{
                if (s.callType == "feature"){
                    findCommittee.map((c) =>{
                        if (s.callStatus == "Arquivada"){
                            if (s.id == c.id){
                                lista.push({
                                    id:s.id,
                                    type:s.callType,
                                    tittle:s.callTitle,
                                    description:s.callDescription,
                                    priority:s.callPriority,
                                    email:s.callEmail,
                                    status:s.callStatus,
                                    impactCto:c.comiImpactCto,
                                    impactHp:c.comiImpactHp,
                                    riskRt:c.comiRiskRt,
                                    riskCso:c.comiRiskCso, 
                                    avaliationCto:c.comiImpactCtoAvaliation,
                                    avaliationHp:c.comiImpactoHpAvaliation,
                                    avaliationCso:c.comiRiskCsoAvaliation,
                                    avaliationRt:c.comiRiskRtAvaliation

                                })
                            }
                       

                        
                        }

                    })
                   

                }
            }) 
          
            logger.info(JSON.stringify({lista, message: "Sucesso ao buscar os chamados arquivados."}))
            return res.json(lista)
        }catch(err){
            logger.error(JSON.stringify({mensage: "Erro ao buscar os chamados arquivados"}))
            return res.status(400).json({mensage: "Erro ao buscar os chamados arquivados"})
        }
    }

    public async putStatus(req: Request, res: Response): Promise<Response>{
        try{
            const uuid:any = req.params.uuid
            const status:any = req.body
            const callrep = AppDataSource.getRepository(Call)
            const call = await callrep.findOneBy({id: uuid})
            call.callStatus = status.status
            const callS = await callrep.save(call)
            return res.json(callS)
        }catch(err){
            return
        }
    }

}

export default new CommitteeController();