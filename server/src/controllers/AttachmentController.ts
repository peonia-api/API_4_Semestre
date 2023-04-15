import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Attachment } from "../entities/Attachment";
const fs = require("fs")

class AttachmentController {

    public fun (req: Request, res: Response){
        return res.json("foi")
    }

    public async file (req: Request, res: Response) : Promise<Response> {
        try{            
            const { name, callId } = req.body
            const files = req.files
            
            const attachmentRep = AppDataSource.getRepository(Attachment);
            let att;
            
            for (let index = 0; index < Number(files.length); index++) {
                const attachment = new Attachment()

                attachment.name = files[index].filename
                attachment.src = files[index].path
                attachment.call = callId
                att = await attachmentRep.save(attachment)
                console.log(index);
                
            }
            return res.json(att)
        }catch(err){
            console.log('oi');
            
            return res.json({message: "Erro ao salvar o arquivo."})
        }
    }

    public async putFile (req: Request, res: Response) : Promise<Response> {
        const { name, callId } = req.body
        const file = req.file
        const id:any = req.params.uuid
        console.log(file);
        
        const attachmentRepository = AppDataSource.getRepository(Attachment)
        const findFile = await attachmentRepository.findOneBy({id: id})
        fs.unlinkSync(findFile.src)
        findFile.name = name
        findFile.src = file.path
        findFile.call = callId

        

        const allCall = await attachmentRepository.save(findFile)
        return res.json(allCall)
     }


     public async getAll (req: Request, res: Response) : Promise<Response> {
         const attachmentRepository = AppDataSource.getRepository(Attachment)
         const allCall = await attachmentRepository.find()
         console.log(allCall)
         return res.json(allCall)
    }

     public async deleteFile (req: Request, res: Response) : Promise<Response> {
        const id:any = req.params.uuid
        const attachmentRepository = AppDataSource.getRepository(Attachment)
        const findFile = await attachmentRepository.findOneBy({id: id})

        fs.unlinkSync(findFile.src)

        const allCall = await attachmentRepository.remove(findFile)
        return res.json(allCall)
    }
    

}
export default new AttachmentController();