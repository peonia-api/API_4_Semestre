import AppDataSource from "../data-source"
import { GroupToUser } from "../entities/GroupToUser";
import { Group } from "../entities/Groups"
import { Request, Response } from 'express';

class GroupToUserController {

    public async getHistoric (req: Request, res: Response) : Promise<Response> {
        const groupToUserRepository = AppDataSource.getRepository(GroupToUser)
        const allGroupToUser = await groupToUserRepository.find()
        console.log(allGroupToUser)
        return res.json(allGroupToUser)
    }

    public async getGroupByOne (req: Request, res: Response) : Promise<Response> {
        const idGroupToUser:any = req.params.uuid
        const groupToUserRepository = AppDataSource.getRepository(GroupToUser)
        const allGroupToUser = await groupToUserRepository.find({relations: { group: true },
            where: {
                group: { id: idGroupToUser },
            },}) //{id: idGroupToUser}
        return res.json(allGroupToUser)
    }

    public async getGroupUser (req: Request, res: Response) : Promise<Response> {
        const userEmail:any = req.params.uuid
        const groupToUserRepository = AppDataSource.getRepository(GroupToUser)
        const allGroupToUser = await groupToUserRepository.find({relations: { user: true },
            where: {
                user: {userEmail: userEmail}
            },}) 
        return res.json(allGroupToUser)
    }


    public async postGroup (req: Request, res: Response) : Promise<Response> {
        const createGroupToUser = req.body
        const groupToUserRepository = AppDataSource.getRepository(GroupToUser)
        const insertGroupToUser = new GroupToUser();
        insertGroupToUser.group = createGroupToUser.group
        insertGroupToUser.user = createGroupToUser.user


        const allGroupToUser = await groupToUserRepository.save(insertGroupToUser)
        return res.json(allGroupToUser)
    }

    public async putGroup (req: Request, res: Response) : Promise<Response> {
        const createGroupToUser = req.body
        const idGroupToUser:any = req.params.uuid
        const groupToUserRepository = AppDataSource.getRepository(GroupToUser)
        const findGroupToUser = await groupToUserRepository.findOneBy({id: idGroupToUser})
        findGroupToUser.group = createGroupToUser.group
        findGroupToUser.user = createGroupToUser.user
       
    
        const allGroupToUser = await groupToUserRepository.save(findGroupToUser)
        return res.json(allGroupToUser)
    }

    public async deleteGroup (req: Request, res: Response) : Promise<Response> {
        const idGroupToUser:any = req.params.uuid
        const groupToUserRepository = AppDataSource.getRepository(GroupToUser)
        const findGroupToUser = await groupToUserRepository.findOneBy({id: idGroupToUser})
        const allGroupToUser = await groupToUserRepository.remove(findGroupToUser)
        return res.json(allGroupToUser)
    }

}
export default new GroupToUserController();

