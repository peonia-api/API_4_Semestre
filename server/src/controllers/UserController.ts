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
      console.log(usuario)
      const r = await usuario.compare(userPassword);
      console.log(r)
      if (r) {
        // cria um token codificando o objeto {id,userEmail}
        const token = await generateToken({ id: usuario.id, userEmail: usuario.userEmail });
        // retorna o token para o cliente
        return res.json({
          id: usuario.id,
          userType: usuario.userType,
          userEmail: usuario.userEmail,
          token
        });
      }
      return res.status(400).json({ error: "Dados de login não conferem" });
    }
    else {
      return res.status(400).json({ error: "Usuário não localizado" });
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

  public async getHistoricUser(req: Request, res: Response): Promise<Response> {
    const userRepository = AppDataSource.getRepository(User)
    const allUser = await userRepository.find()
    console.log(allUser)
    return res.json(allUser)
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    const idUser: any = req.params.uuid
    const userRepository = AppDataSource.getRepository(User)
    const allUser = await userRepository.findOneBy({ id: idUser })
    return res.json(allUser)
  }

  public async getId(req: Request, res: Response): Promise<Response> {
    const { userEmail } = req.body
    const usuario: any = await AppDataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .select()
      .addSelect('user.userPassword')
      .where("user.userEmail=:userEmail", { userEmail })
      .getOne();
    // const userRepository = AppDataSource.getRepository(User)
    // const allUser = await usuario.findBy({ userEmail: userEmail })
    console.log(usuario);
    return res.json(usuario)
  }

  public async postUser(req: Request, res: Response): Promise<Response> {
    const createUser = req.body
    const userRepository = AppDataSource.getRepository(User)
    const insertUser = new User();
    insertUser.userName = createUser.userName
    insertUser.userPosition = createUser.userPosition
    insertUser.userEmail = createUser.userEmail
    insertUser.userPassword = createUser.userPassword
    insertUser.userType = createUser.userType

    const allUser = await userRepository.save(insertUser)
    return res.json(allUser)
  }

  public async putUser(req: Request, res: Response): Promise<Response> {
    const createUser = req.body
    const idUser: any = req.params.uuid
    const userRepository = AppDataSource.getRepository(User)
    const findUser = await userRepository.findOneBy({ id: idUser })
    findUser.userName = createUser.userName
    findUser.userPosition = createUser.userPosition
    findUser.userEmail = createUser.userEmail
    findUser.userType = createUser.userType

    const allUser = await userRepository.save(findUser)
    return res.json(allUser)
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const idUser: any = req.params.uuid
    const userRepository = AppDataSource.getRepository(User)
    const findUser = await userRepository.findOneBy({ id: idUser })
    const allUser = await userRepository.remove(findUser)
    return res.json(allUser)
  }

  public async putPassword(req: Request, res: Response): Promise<Response> {
    // const { userEmail }: any = req.params.uuid
    const { userPassword, userEmail } = req.body
    const usuario: any = await AppDataSource.manager
      .getRepository(User)
      .createQueryBuilder("user")
      .select()
      .addSelect('user.userPassword')
      .where("user.userEmail=:userEmail", { userEmail })
      .getOne();
    console.log(usuario);
    // const userRepository = AppDataSource.getRepository(User)
    // const findUser = await userRepository.findOneBy({ id: idUser })
    usuario.userPassword = userPassword

    // const allUser = await usuario.save(usuario)
    const r = await AppDataSource.manager.save(User, usuario)
    return res.json(r)
  }

  public async getVeficaType(req: Request, res: Response): Promise<Response> {
    try{
      const userRepository = AppDataSource.getRepository(User).createQueryBuilder('user').select('DISTINCT user.userType').getRawMany()
      let type = [{type: "CSO", possui: false}, {type: "RT", possui: false},{type: "CTO", possui: false},{type: "HP", possui: false},{type: "Padrao", possui: false}]
      const user = (await userRepository).forEach((resp)=> {
        if(resp.userType != "Padrao"){
          const list = type.find((types) => types.type == resp.userType)
          list.possui = true
        }
        
      })
      return res.json(type)
    }catch(err){
      return res.status(400).json({menssagem: "Erro ao verificar"})
    }
  }

}

export default new UserController();
