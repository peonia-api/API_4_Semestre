import { logger } from "../config/logger"
import AppDataSource from "../data-source"
import { Kanban } from "../entities/Kanban"

class KanbanController {

    public async getHistoricKanban(req: Request, res: Response): Promise<Response> {
        try {
            const KanbanRepository = AppDataSource.getRepository(Call)
            const allKanban = await KanbanRepository.find()
            logger.info(JSON.stringify({ allKanban, message: "Sucesso ao pegar os chamados no kanban." }))
            return res.json(allKanban)
        } catch (err) {
            logger.error(JSON.stringify({ mensage: "Erro ao pegar os chamados no kanban" }))
            return res.status(400).json({ mensage: "Erro ao pegar os chamados no kanban" })
        }
    }


    public async postKanban(req: Request, res: Response): Promise<Response> {
        try {
            const createKanban = req.body
            const KanbanRepository = AppDataSource.getRepository(Kanban)
            const insertKanban = new Kanban();
            insertKanban.kanToDo = createKanban.kanToDo
            insertKanban.kanInProgress = createKanban.kanInProgress
            insertKanban.kanDone = createKanban.kanDone
            insertKanban.kanEmail = createKanban.kanEmail
          
         
            const allKanban = await KanbanRepository.save(insertKanban)
            logger.info(JSON.stringify({ allKanban, message: "Sucesso ao cadastrar o chamado no kanban." }))
            return res.json(allKanban)
        } catch (err) {
            logger.error(JSON.stringify({ mensage: "Erro ao cadastrar o chamado no kanban" }))
            return res.status(400).json({ mensage: "Erro ao cadastrar o chamado no kanban" })
        }
    }

    public async putKanban(req: Request, res: Response): Promise<Response> {
        try {
            const createKanban = req.body
            const idKanban: any = req.params.uuid
            const KanbanRepository = AppDataSource.getRepository(Kanban)
            const findKanban = await KanbanRepository.findOneBy({ id: idKanban })
            findKanban.kanToDo = createKanban.kanToDo
            findKanban.kanInProgress = createKanban.kanInProgress
            findKanban.kanDone = createKanban.KanDone
            findKanban.kanEmail = createKanban.KanDone


            const allKanban = await KanbanRepository.save(findKanban)
            logger.info(JSON.stringify({ allKanban, message: "Sucesso ao editar o chamado no kanban." }))
            return res.json(allKanban)
        } catch (err) {
            logger.error(JSON.stringify({ mensage: "Erro ao editar o chamado no kanban" }))
            return res.status(400).json({ mensage: "Erro ao editar o chamado no kanban" })
        }
    }

    public async deleteKanban(req: Request, res: Response): Promise<Response> {
        try {
            const idKanban: any = req.params.uuid
            const KanbanRepository = AppDataSource.getRepository(Kanban)
            const findKanban = await KanbanRepository.findOneBy({ id: idKanban })
            const allKanban = await KanbanRepository.remove(findKanban)
            logger.info(JSON.stringify({ allKanban, message: "Sucesso ao deletar o chamado no kanban." }))
            return res.json(allKanban)
        } catch (err) {
            logger.error(JSON.stringify({ mensage: "Erro ao deletar o chamado no kanban" }))
            return res.status(400).json({ mensage: "Erro ao deletar o chamado no kanban" })
        }
    }

 

}
export default new KanbanController();

