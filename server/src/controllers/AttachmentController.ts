import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Attachment } from "../entities/Attachment";
import { logger } from "../config/logger";
const fs = require("fs")

class AttachmentController {

    public async fun (req: Request, res: Response) : Promise<Response> {
        try{            
            const  callId:any  = req.params.uuid
            const files = req.body
            console.log(files);
            
            const arquivosUploads = 'https://undvejpptbowpgysnwiw.supabase.co/storage/v1/object/public/uploads/'
            //const files = req.files
            console.log(files);
            
            const attachmentRep = AppDataSource.getRepository(Attachment);
            let att;
            
            for (let index = 0; index < files.length; index++) {
                const attachment = new Attachment()

                attachment.name = files[index].name
                attachment.src = arquivosUploads + files[index].name
                attachment.call = callId
                att = await attachmentRep.save(attachment)
                console.log(index);
                
            }
            return res.json(att)
        }catch(err){
            console.log('oi');
            
            return res.status(400).json({message: "Erro ao salvar o arquivo."})
        }

    }

    public async file (req: Request, res: Response) : Promise<Response> {
        try{            
            const  callId:any  = req.params.uuid
            const files = req.files
            console.log(files);
            
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
            
            return res.status(400).json({message: "Erro ao salvar o arquivo."})
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

    /*
    public async deleteFileSupabase (req: Request, res: Response) : Promise<Response> {
        const id:any = req.params.uuid
        const attachmentRepository = AppDataSource.getRepository(Attachment)
        const findFile = await attachmentRepository.findOneBy({id: id})
        console.log(findFile);
        

        const allCall = await attachmentRepository.remove(findFile)
        return res.json(allCall)
    }
    */

    public async deleteFileSupabase (req: Request, res: Response) : Promise<Response> {
        try{
            const id:any = req.params.uuid
            const attachmentRepository = AppDataSource.getRepository(Attachment)
            const findFile = await attachmentRepository.find()
            let list:any = []
            findFile.map(async (file) => {
                if(file.call.id == id){
                    list.push({
                        id: file.id,
                        src: file.src
                    })
                    const allCall = await attachmentRepository.remove(file)
                }
            })
            if(list.id == null){
                logger.error(JSON.stringify({mensage: "Não possui arquivos!"}))
                return res.json({mensage: "Não possui arquivos!"})
            }

            return res.json({mensage: "foi", list})
        }catch(err){
            return res.status(400).json({mensage: "Erro"})
        }
        
    }
    
    public async getFileByCallId (req: Request, res: Response) : Promise<Response> {
        const callId:any = req.params.uuid
        let listaFile = []
        const attachmentRepository = AppDataSource.getRepository(Attachment)
        const findFile = await attachmentRepository.find()
        findFile.map((lin)=> {
            if(lin.call.id == callId){
                listaFile.push(lin)
            }else{
                console.log(lin);
                
            }
        })
        return res.json(listaFile)
   }

}
export default new AttachmentController();