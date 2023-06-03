require('dotenv').config();


// Interface Observer
interface Observer {
    update(email: string, status: string, titulo: string): void;
}

// Classe ConcreteSubject
class ConcreteSubject {
    private observers: Observer[] = [];

    public addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    public notifyObservers(email: string, status: string, titulo: string): void {
        console.log('Subject: Notifying observers...');
        this.observers.forEach((observer) => observer.update(email, status, titulo));
    }
}

// Classe UserObserver
class UserObserver implements Observer {
    private email: string;
    private status: string;
    private titulo: string;

    constructor(email: string, status: string, titulo: string) {
        this.email = email;
        this.status = status;
        this.titulo = titulo;
    }

    public update(email: string, status: string, titulo: string): void {

        let nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
                ciphers: 'SSLv3'
            },
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        var mailOptions = {
            from: '"Equipe Peônia - Ionic health" <peonia-api@outlook.com>', // sender address (who sends)
            to: this.email, // list of receivers (who receives)
            subject: 'Ionic health - Atualização de status de chamado ', // Subject line
            text: 'Olá', // plaintext body
            html: `<p>Olá, </p><p> Gentileza notar que o seu chamado <strong>${this.titulo}</strong> teve seu status alterado para: <strong>${this.status}</strong>.</p><p>Caso existam dúvidas, favor entrar em contato com o atendimento ao cliente <a href="https://pt-br.ionic.health/contato" target="_blank">clicando aqui</a>.</p><p>Atenciosamente,</p><p>Equipe Peonia - Ionic health.</p>` // html body
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }

            console.log('Message sent: ' + info.response);
        });
    }
}

export { ConcreteSubject, UserObserver };