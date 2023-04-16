import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { User } from '../entities/User';
import { generateToken } from '../middlewares';

class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { userEmail, userPassword } = req.body;
    //verifica se foram fornecidos os parâmetros
    if (!userEmail || !userPassword || userEmail.trim() === "" || userPassword.trim() === "") {
      return res.json({ error: "e-userEmail e senha necessários" });
    }
    // como a propriedade userPassword não está disponível para select {select: false},
    // então precisamos usar esta conulta para forçar incluir a propriedade 
    const usuario: any = await AppDataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .select()
      .addSelect('user.userPassword')
      .where("user.userEmail=:userEmail", { userEmail })
      .getOne();

    if (usuario && usuario.id) {
      const r = await usuario.compare(userPassword);
      if (r) {
        // cria um token codificando o objeto {id,userEmail}
        const token = await generateToken({ id: usuario.id, userEmail: usuario.userEmail });
        // retorna o token para o cliente
        return res.json({
          id: usuario.id,
          userEmail: usuario.userEmail,
          token
        });
      }
      return res.json({ error: "Dados de login não conferem" });
    }
    else {
      return res.json({ error: "Usuário não localizado" });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { userEmail, userPassword } = req.body;
    //verifica se foram fornecidos os parâmetros
    if (!userEmail || !userPassword || userEmail.trim() === "" || userPassword.trim() === "") {
      return res.json({ error: "e-userEmail e senha necessários" });
    }
    const obj = new User();
    obj.userEmail = userEmail;
    obj.userPassword = userPassword;
    // o hook BeforeInsert não é disparado com AppDataSource.manager.save(User,JSON),
    // mas é disparado com AppDataSource.manager.save(User,objeto do tipo User)
    // https://github.com/typeorm/typeorm/issues/5493
    const usuario: any = await AppDataSource.manager.save(User, obj).catch((e) => {
      // testa se o e-userEmail é repetido
      if (/(userEmail)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'e-userEmail já existe' };
      }
      return { error: e.message };
    })
    if (usuario.id) {
      // cria um token codificando o objeto {idusuario,userEmail}
      const token = await generateToken({ id: usuario.id, userEmail: usuario.userEmail });
      // retorna o token para o cliente
      return res.json({
        id: usuario.id,
        userEmail: usuario.userEmail,
        token
      });
    }
    return res.json(usuario);
  }

  // o usuário pode atualizar somente os seus dados
  public async update(req: Request, res: Response): Promise<Response> {
    const { userEmail, userPassword } = req.body;
    // obtém o id do usuário que foi salvo na autorização na middleware
    const { id } = res.locals;
    const usuario: any = await AppDataSource.manager.findOneBy(User, { id }).catch((e) => {
      return { error: "Identificador inválido" };
    })
    if (usuario && usuario.id) {
      if (userEmail !== "") {
        usuario.userEmail = userEmail;
      }
      if (userPassword !== "") {
        usuario.userPassword = userPassword;
      }
      const r = await AppDataSource.manager.save(User, usuario).catch((e) => {
        // testa se o Email é repetido
        if (/(userEmail)[\s\S]+(already exists)/.test(e.detail)) {
          return ({ error: 'Email já existe' });
        }
        return e;
      })
      if (!r.error) {
        return res.json({ id: usuario.id, userEmail: usuario.userEmail });
      }
      return res.json(r);
    }
    else if (usuario && usuario.error) {
      return res.json(userEmail)
    }
    else {
      return res.json({ error: "Usuário não localizado" });
    }
  }

}

export default new UserController();