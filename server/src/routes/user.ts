import { Router } from "express";
import { UserController } from "../controllers";
const routes = Router();

routes.post('/create', UserController.create);

routes.post("/login", UserController.login)


routes.get('/historicUser', UserController.getHistoricUser);

routes.get('/especificoUser/:uuid', UserController.getUser);

routes.get('/getAllUser', UserController.getAllUser);

routes.get('/especificoId/', UserController.getId);

routes.get('/especificoEmail/:email', UserController.getEmail);
routes.get('/veficaType/', UserController.getVeficaType);

routes.post('/createUser', UserController.postUser);

routes.put('/modifyUser/:uuid', UserController.putUser);

routes.put('/redefinirSenha/', UserController.putPassword);

routes.put("/perfil/:uuid", UserController.putUserPerfil)

routes.delete('/delete/:uuid', UserController.deleteUser);

export default routes;
