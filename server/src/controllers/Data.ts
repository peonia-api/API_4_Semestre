import { Request, Response } from 'express';

class Data {
    public async dia(req: Request, res: Response): Promise<Response> {
        const r = (new Date()).getDate();
        return res.json({ r });
    }

    public async mes(req: Request, res: Response): Promise<Response> {
        const r = (new Date()).getMonth()+1;
        return res.json({ r });
    }

    public async ano(req: Request, res: Response): Promise<Response> {
        const r = (new Date()).getFullYear();
        return res.json({ r });
    }
}

export default new Data(); 
