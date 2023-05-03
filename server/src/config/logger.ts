import { createLogger, transports, format, level } from "winston";

let data = new Date()
let dia = String(data.getDate()).padStart(2, '0');
let mes = String(data.getMonth() + 1).padStart(2, '0');
let ano = data.getFullYear();

const logger = createLogger({
    format: format.printf((info) => {
        return `[${info.level}]: [ ${dia}/${mes}/${ano}:${data.getHours()}:${data.getMinutes()}:${data.getSeconds()} ] - ${info.message}`
    }),
    level: 'debug',
    transports: [
        new transports.Console(),
        new transports.File({filename: '../server/logs/info.log', level: 'info'}),
        new transports.File({filename: '../server/logs/error.log', level: 'error'})
    ]
})



export {logger}