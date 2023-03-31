import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Call } from "../entities/Call";


class CallController {

    public async getHistoricCall (req: Request, res: Response) : Promise<Response> {
        const callRepository = AppDataSource.getRepository(Call)
        const allCall = await callRepository.find()
        console.log(allCall)
        return res.json(allCall)
    }

    public async getHistoricHotfix (req: Request, res: Response) : Promise<Response> {
        const callRepository = AppDataSource.getRepository(Call)
        const allCall = await callRepository.findBy({ callType: "hotfix" })
        return res.json(allCall)
    }

    public async getHistoricFeature (req: Request, res: Response) : Promise<Response> {
        const callRepository = AppDataSource.getRepository(Call)
        const allCall = await callRepository.findBy({ callType: "feature" })
        return res.json(allCall)
    }

    public async getCall (req: Request, res: Response) : Promise<Response> {
        const idCall:any = req.params.uuid
        const callRepository = AppDataSource.getRepository(Call)
        const allCall = await callRepository.findOneBy({id: idCall})
        return res.json(allCall)
    }

    public async postCall (req: Request, res: Response) : Promise<Response> {
        const createCall = req.body
        const callRepository = AppDataSource.getRepository(Call)
        const insertCall = new Call();
        insertCall.callType = createCall.callType
        insertCall.callTitle = createCall.callTitle
        insertCall.callDescription = createCall.callDescription
        insertCall.callPriority = createCall.callPriority
        insertCall.callState = createCall.callState
        insertCall.callRequester = createCall.callRequester
        insertCall.callTeam = createCall.callTeam
        insertCall.callEmail = createCall.callEmail
        insertCall.callPhone = createCall.callPhone

        const allCall = await callRepository.save(insertCall)
        return res.json(allCall)
    }

    public async putCall (req: Request, res: Response) : Promise<Response> {
        const createCall = req.body
        const idCall:any = req.params.uuid
        const callRepository = AppDataSource.getRepository(Call)
        const findCall = await callRepository.findOneBy({id: idCall})
        findCall.callType = createCall.callType
        findCall.callTitle = createCall.callTitle
        findCall.callDescription = createCall.callDescription
        findCall.callPriority = createCall.callPriority
        findCall.callState = createCall.callState
        findCall.callRequester = createCall.callRequester
        findCall.callTeam = createCall.callTeam
        findCall.callEmail = createCall.callEmail
        findCall.callPhone = createCall.callPhone 
        const allCall = await callRepository.save(findCall)
        return res.json(allCall)
    }

    public async deleteCall (req: Request, res: Response) : Promise<Response> {
        const idCall:any = req.params.uuid
        const callRepository = AppDataSource.getRepository(Call)
        const findCall = await callRepository.findOneBy({id: idCall})
        const allCall = await callRepository.remove(findCall)
        return res.json(allCall)
    }

}
export default new CallController();