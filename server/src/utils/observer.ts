import emailjs from '@emailjs/browser';

// Interface Observer
interface Observer {
    update(): void;
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

    public notifyObservers(): void {
        for (const observer of this.observers) {
            observer.update();
        }
    }
}

// Classe UserObserver
class UserObserver implements Observer {
    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    public update(): void {

        const templateParams = {
            email: this.email,
            // Outros parâmetros do e-mail, se necessário
        };

        emailjs.send(
            "gmailMessage",
            "template_rngpv1h",
            templateParams,
            "w4LxBZJlq08EuppL3"
        ).then((response) => {
            console.log('E-mail enviado com sucesso!', response);
        }).catch((error) => {
            console.error('Erro ao enviar o e-mail:', error);
        });
    }
}

export { ConcreteSubject, UserObserver };