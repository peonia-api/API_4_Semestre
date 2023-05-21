import { logger } from "../config/logger"
import AppDataSource from "../data-source"
import { Task } from "../entities/Task"


class TaskController {

    public async getHistoric(req: Request, res: Response): Promise<Response> {
        try {
            const taskRepository = AppDataSource.getRepository(Task)
            const allTask = await taskRepository.find()
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

