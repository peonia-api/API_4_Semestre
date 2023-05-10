import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Call } from "../entities/Call";
import { logger } from "../config/logger";



class CallController {

    public async getHistoricCall (req: Request, res: Response) : Promise<Response> {
        try{
            const callRepository = AppDataSource.getRepository(Call)
            const allCall = await callRepository.find()
            console.log(allCall)
            console.log(allCall)
            logger.info(JSON.stringify({allCall, message: "Sucesso ao pegar os chamados."}))
            return res.json(allCall)
        }catch(err){
            logger.error(JSON.stringify({mensage: "Erro ao pegar os chamados"}))
            return res.status(400).json({mensage: "Erro ao pegar os chamados"})
        }
    }

    public async getHistoricCallUser (req: Request, res: Response) : Promise<Response> {
        try{
            const email = req.params.email
            const callRepository = AppDataSource.getRepository(Call)
            const allCall = await callRepository.findBy({callEmail: email})
            console.log(allCall)
            console.log(allCall)
            logger.info(JSON.stringify({allCall, message: "Sucesso ao pegar os chamados."}))
            return res.json(allCall)
        }catch(err){
            logger.error(JSON.stringify({mensage: "Erro ao pegar os chamados"}))
            return res.status(400).json({mensage: "Erro ao pegar os chamados"})
        }
    }

    public async getHistoricHotfix (req: Request, res: Response) : Promise<Response> {
        try{
            const callRepository = AppDataSource.getRepository(Call)
            const allCall = await callRepository.findBy({ callType: "hotfix" })
            logger.info(JSON.stringify({allCall, message: "Sucesso ao pegar os chamados Hotfix."}))
            return res.json(allCall)
        }catch(err){
            logger.error(JSON.stringify({mensage: "Erro ao pegar os chamados Hotfix"}))
            return res.status(400).json({mensage: "Erro ao pegar os chamados"})
        }
    }

    public async getHistoricFeature (req: Request, res: Response) : Promise<Response> {
        try{
            const callRepository = AppDataSource.getRepository(Call)
            const allCall = await callRepository.findBy({ callType: "feature" })
            logger.info(JSON.stringify({allCall, message: "Sucesso ao pegar os chamados feature."}))
            return res.json(allCall)
        }catch(err){
            logger.error(JSON.stringify({mensage: "Erro ao pegar os chamados Feature"}))
            return res.status(400).json({mensage: "Erro ao pegar os chamados Feature"})
        }
    }

    public async getCall (req: Request, res: Response) : Promise<Response> {
        try{
            const idCall:any = req.params.uuid
            const callRepository = AppDataSource.getRepository(Call)
            const allCall = await callRepository.findOneBy({id: idCall})
            logger.info(JSON.stringify({allCall, message: "Sucesso ao pegar os chamados."}))
            return res.json(allCall)
        }catch(err){
            logger.error(JSON.stringify({mensage: "Erro ao pegar os chamados"}))
            return res.status(400).json({mensage: "Erro ao pegar os chamados"})
        }
        
    }

    public async postCall (req: Request, res: Response) : Promise<Response> {
        try{
            const createCall = req.body
            const callRepository = AppDataSource.getRepository(Call)
            const insertCall = new Call();
            insertCall.callType = createCall.callType
            insertCall.callTitle = createCall.callTitle
            insertCall.callDescription = createCall.callDescription
            insertCall.callPriority = createCall.callPriority
            insertCall.callEmail = createCall.callEmail
            insertCall.callStatus = "Em análise"
            if (insertCall.callType == "feature"){
                insertCall.avaliar = "CSO"
            }else{
                insertCall.avaliar = "hotfix"
            }
            const allCall = await callRepository.save(insertCall)
            logger.info(JSON.stringify({allCall, message: "Sucesso ao cadastrar o chamado."}))
            return res.json(allCall)
        }catch(err){
            logger.error(JSON.stringify({mensage: "Erro ao cadastrar o chamado"}))
            return res.status(400).json({mensage: "Erro ao cadastrar o chamado"})
        }
    }

    public async putCall (req: Request, res: Response) : Promise<Response> {
        try{
            const createCall = req.body
            const idCall:any = req.params.uuid
            const callRepository = AppDataSource.getRepository(Call)
            const findCall = await callRepository.findOneBy({id: idCall})
            if(findCall.callType == "hotfix" && createCall.callType == "feature"){findCall.avaliar = "CSO"}
            else if(findCall.callType == "feature" && createCall.callType == "hotfix"){findCall.avaliar = "hotfix"}
            findCall.callType = createCall.callType
            findCall.callTitle = createCall.callTitle
            findCall.callDescription = createCall.callDescription
            findCall.callPriority = createCall.callPriority
            findCall.callEmail = createCall.callEmail
            //findCall.callStatus = findCall.callStatus
        
            const allCall = await callRepository.save(findCall)
            logger.info(JSON.stringify({allCall, message: "Sucesso ao editar o chamado."}))
            return res.json(allCall)
        }catch(err){
            logger.error(JSON.stringify({mensage: "Erro ao editar o chamado"}))
            return res.status(400).json({mensage: "Erro ao editar o chamado"})
        }
    }

    public async deleteCall (req: Request, res: Response) : Promise<Response> {
        try{
            const idCall:any = req.params.uuid
            const callRepository = AppDataSource.getRepository(Call)
            const findCall = await callRepository.findOneBy({id: idCall})
            const allCall = await callRepository.remove(findCall)
            logger.info(JSON.stringify({allCall, message: "Sucesso ao editar o chamado."}))
            return res.json(allCall)
        }catch(err){
            logger.error(JSON.stringify({mensage: "Erro ao deletar o chamado"}))
            return res.status(400).json({mensage: "Erro ao deletar o chamado"})
        }
    }
    
    public async getUnarchived (req: Request, res: Response) : Promise<Response> {
        try{
            const callRepository = AppDataSource.getRepository(Call)
            const allCall = await callRepository.findBy({ callStatus: "Arquivada" })
            logger.info(JSON.stringify({allCall, message: "Sucesso ao pegar os chamados arquivados."}))
            return res.json(allCall)
        }catch(err){
            logger.error(JSON.stringify({mensage: "Erro ao pegar os chamados arquivados"}))
            return res.status(400).json({mensage: "Erro ao pegar os chamados arquivados"})
        }
    }

}
export default new CallController();

