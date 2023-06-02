import { logger } from "../config/logger"
import AppDataSource from "../data-source"
import { Request, Response } from 'express';
import { Task } from "../entities/Task"
import { Call } from "../entities/Call";


class TaskController {

    public async getHistoric(req: Request, res: Response): Promise<Response> {
        try {
            const groupId:any = req.params.uuid
            const taskRepository = AppDataSource.getRepository(Task)
            const allTask = await taskRepository.find({relations: { group: true },
                where: {
                    group: {id: groupId}
                },}) 
            logger.info(JSON.stringify({ allTask, message: "Sucesso ao pegar os chamados no kanban." }))
            return res.json(allTask)
        } catch (err) {
            logger.error(JSON.stringify({ mensage: "Erro ao pegar os chamados no kanban" }))
            return res.status(400).json({ mensage: "Erro ao pegar os chamados no kanban" })
        }
    }


    public async post(req: Request, res: Response): Promise<Response> {
        try {
            const createTask = req.body
            const taskRepository = AppDataSource.getRepository(Task)
            const insertTask = new Task();
            insertTask.taskStatus = createTask.taskStatus
            insertTask.taskDescription = createTask.taskDescription
            insertTask.taskUserResponsible = createTask.taskUserDescription
          
         
            const allTask = await taskRepository.save(insertTask)
            logger.info(JSON.stringify({ allTask, message: "Sucesso ao cadastrar a task no kanban." }))
            return res.json(allTask)
        } catch (err) {
            logger.error(JSON.stringify({ mensage: "Erro ao cadastrar a task no kanban" }))
            return res.status(400).json({ mensage: "Erro ao cadastrar a task no kanban" })
        }
    }

    public async put(req: Request, res: Response): Promise<Response> {
        try {
            const createTask = req.body
            const idTask: any = req.params.uuid
            const taskRepository = AppDataSource.getRepository(Task)
            const findTask = await taskRepository.findOneBy({ id: idTask })
            findTask.taskStatus = createTask.taskStatus
            findTask.taskDescription = createTask.taskDescription
            findTask.taskUserResponsible = createTask.taskUserResponsible


            const allTask = await taskRepository.save(findTask)
            logger.info(JSON.stringify({ allTask, message: "Sucesso ao editar a task no kanban." }))
            return res.json(allTask)
        } catch (err) {
            logger.error(JSON.stringify({ mensage: "Erro ao editar a task no kanban" }))
            return res.status(400).json({ mensage: "Erro ao editar a task no kanban" })
        }
    }

    public async patch(req:Request, res: Response): Promise<Response>{
        try{
            const {id, status} = req.body
            const taskRepository = AppDataSource.getRepository(Call)
            const find = await taskRepository.findOneBy({id: id})
            find.callStatus = status
            const save = taskRepository.save(find)
            return res.json(save)
        }catch(err){
            return res.status(400).json({erro: "Erro ao alterar o status"})
        }
    }
    
    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const idTask: any = req.params.uuid
            const taskRepository = AppDataSource.getRepository(Task)
            const findTask = await taskRepository.findOneBy({ id: idTask })
            const allTask = await taskRepository.remove(findTask)
            logger.info(JSON.stringify({ allTask, message: "Sucesso ao deletar a task no kanban." }))
            return res.json(allTask)
        } catch (err) {
            logger.error(JSON.stringify({ mensage: "Erro ao deletar a task no kanban" }))
            return res.status(400).json({ mensage: "Erro ao deletar a task no kanban" })
        }
    }

 

}
export default new TaskController();

