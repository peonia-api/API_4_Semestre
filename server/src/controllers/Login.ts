import { Request, Response } from 'express';
import { generateToken } from '../middlewares';

class Login {
    public async logar(req: Request, res: Response): Promise<Response> {
        const { mail, profile } = req.body;
        const token = await generateToken({ mail, profile });
        return res.json({ token });
    }
}

export default new Login(); 