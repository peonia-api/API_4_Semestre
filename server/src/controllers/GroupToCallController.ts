import AppDataSource from "../data-source"
import { GroupToCall } from "../entities/GroupToCall";
import { Request, Response } from 'express';

class GroupToCallController {

    public async getHistoric (req: Request, res: Response) : Promise<Response> {
        try{
            const groupToCallRepository = AppDataSource.getRepository(GroupToCall)
            const allgroupToCall = await groupToCallRepository.find()
            console.log(allgroupToCall)
            return res.json(allgroupToCall)
        }catch(err){
            return res.status(400).json({menssagem: "Erro ao pegar"})
        }
    }

    public async getGroupByOne (req: Request, res: Response) : Promise<Response> {
        try{
            const idgroupToCall:any = req.params.uuid
            const groupToCallRepository = AppDataSource.getRepository(GroupToCall)
            const allgroupToCall = await groupToCallRepository.find(
            {
                relations: { call: true },
                where: {
                    call: { id: idgroupToCall},
                },
            })
            return res.json(allgroupToCall)
        }catch(err){
            return res.status(400).json({menssagem: "Erro ao pegar"})
        }
    }

    public async postGroup (req: Request, res: Response) : Promise<Response> {
        try{
            const creategroupToCall = req.body
            const groupToCallRepository = AppDataSource.getRepository(GroupToCall)
            const insertgroupToCall = new GroupToCall();
            insertgroupToCall.group = creategroupToCall.group
            insertgroupToCall.call = creategroupToCall.call


            const allgroupToCall = await groupToCallRepository.save(insertgroupToCall)
            return res.json(allgroupToCall)
        }catch(err){
            return res.status(400).json({menssagem: "Erro ao cadastrar"})
        }
    }

    public async putGroup (req: Request, res: Response) : Promise<Response> {
        try{
            const creategroupToCall = req.body
            const idgroupToCall:any = req.params.uuid
            const groupToCallRepository = AppDataSource.getRepository(GroupToCall)
            const findgroupToCall = await groupToCallRepository.findOneBy({id: idgroupToCall})
            findgroupToCall.group = creategroupToCall.group
            findgroupToCall.call = creategroupToCall.call
        
        
            const allgroupToCall = await groupToCallRepository.save(findgroupToCall)
            return res.json(allgroupToCall)
        }catch(err){
            return res.status(400).json({menssagem: "Erro ao editar"})
        }
    }

    public async deleteGroup (req: Request, res: Response) : Promise<Response> {
        try{
            const idgroupToCall:any = req.params.uuid
            const groupToCallRepository = AppDataSource.getRepository(GroupToCall)
            const findgroupToCall = await groupToCallRepository.findOneBy({id: idgroupToCall})
            const allgroupToCall = await groupToCallRepository.remove(findgroupToCall)
            return res.json(allgroupToCall)
        }catch(err){
            return res.status(400).json({menssagem: "Erro ao deletar"})
        }
    }

}
export default new GroupToCallController();

