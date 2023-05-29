import emailjs from '@emailjs/browser'

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
        console.log('Subject: Notifying observers...');
        this.observers.forEach((observer) => observer.update());
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

    public update(): void {

        var templateParams = {
            email: this.email,
            status: this.status,
            titulo: this.titulo
        };

        emailjs
            .send(
                "gmailMessage",
                "template_zcvasqh",
                templateParams,
                "w4LxBZJlq08EuppL3"
            )
            .then((response) => {
                console.log("SUCCESS!", response.status, response.text);
            }).catch((err) => {
                console.log("FAILED...", err);
            });
    }
}

export { ConcreteSubject, UserObserver };