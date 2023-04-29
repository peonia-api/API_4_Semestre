import AppDataSource from "../data-source"
import { Group } from "../entities/Groups"

class GroupController {

    public async getHistoricGroups (req: Request, res: Response) : Promise<Response> {
        const groupRepository = AppDataSource.getRepository(Group)
        const allGroup = await groupRepository.find()
        console.log(allGroup)
        return res.json(allGroup)
    }



    public async getGroup (req: Request, res: Response) : Promise<Response> {
        const idGroup:any = req.params.uuid
        const groupRepository = AppDataSource.getRepository(Group)
        const allGroup = await groupRepository.findOneBy({id: idGroup})
        return res.json(allGroup)
    }

    public async postGroup (req: Request, res: Response) : Promise<Response> {
        const createGroup = req.body
        const groupRepository = AppDataSource.getRepository(Group)
        const insertGroup = new Group();
        insertGroup.groupName = createGroup.groupName
        insertGroup.user = createGroup.user


        const allGroup = await groupRepository.save(insertGroup)
        return res.json(allGroup)
    }

    public async putGroup (req: Request, res: Response) : Promise<Response> {
        const createGroup = req.body
        const idGroup:any = req.params.uuid
        const groupRepository = AppDataSource.getRepository(Group)
        const findGroup = await groupRepository.findOneBy({id: idGroup})
        findGroup.groupName = createGroup.groupName
        findGroup.user = createGroup.user
       
    
        const allGroup = await groupRepository.save(findGroup)
        return res.json(allGroup)
    }

    public async deleteCall (req: Request, res: Response) : Promise<Response> {
        const idGroup:any = req.params.uuid
        const groupRepository = AppDataSource.getRepository(Call)
        const findGroup = await groupRepository.findOneBy({id: idGroup})
        const allGroup = await groupRepository.remove(findGroup)
        return res.json(allGroup)
    }

}
export default new GroupController();

