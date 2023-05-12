import AppDataSource from "../data-source"
import { Group } from "../entities/Groups"
import { Request, Response } from 'express';
import { getGroupToCall } from "../utils/funcao";

class GroupController {

    public async getHistoricGroups(req: Request, res: Response): Promise<Response> {
        const groupRepository = AppDataSource.getRepository(Group)
        const allGroup = await groupRepository.find()
        console.log(allGroup)
        return res.json(allGroup)
    }

    public async getGroupByOne(req: Request, res: Response): Promise<Response> {
        const idGroup: any = req.params.uuid
        const groupRepository = AppDataSource.getRepository(Group)
        const allGroup = await groupRepository.findOneBy({ id: idGroup })
        return res.json(allGroup)
    }

    public async postGroup(req: Request, res: Response): Promise<Response> {
        const createGroup = req.body
        const groupRepository = AppDataSource.getRepository(Group)
        const insertGroup = new Group();
        insertGroup.groupName = createGroup.groupName
        insertGroup.groupType = createGroup.groupType
        insertGroup.groupDescription = createGroup.groupDescription
        insertGroup.cliente = createGroup.cliente

        const allGroup = await groupRepository.save(insertGroup)
        return res.json(allGroup)
    }

    public async putGroup(req: Request, res: Response): Promise<Response> {
        const createGroup = req.body
        const idGroup: any = req.params.uuid
        const groupRepository = AppDataSource.getRepository(Group)
        const findGroup = await groupRepository.findOneBy({ id: idGroup })
        findGroup.groupType = createGroup.groupType
        findGroup.groupDescription = createGroup.groupDescription
        findGroup.cliente = createGroup.cliente

        const allGroup = await groupRepository.save(findGroup)
        return res.json(allGroup)
    }

    public async deleteGroup(req: Request, res: Response): Promise<Response> {
        try{const idGroup: any = req.params.uuid
        const groupRepository = AppDataSource.getRepository(Group)
        const findGroup = await groupRepository.findOneBy({ id: idGroup })
        const allGroup = await groupRepository.remove(findGroup)
        return res.json(allGroup)}
        catch(err){
            return res.status(400).json(err)
        }
    }

}
export default new GroupController();

