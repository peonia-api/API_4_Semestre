import * as express from "express";
import * as dotenv from "dotenv";
import routes from "./routes";
import { logger } from "./config/logger";

dotenv.config();

// cria o servidor e coloca na variável app
const app = express();

// suporta parâmetros JSON no body da requisição
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const PORT = process.env.PORT || 3001;

// inicializa o servidor na porta especificada
app.listen(PORT, () => logger.info(`Rodando na porta ${PORT}`));
// define a rota para o pacote /routes