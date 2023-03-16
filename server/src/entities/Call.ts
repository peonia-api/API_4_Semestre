import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Hotfix } from "./Hotfix";
import { Arquivo } from "./Arquivo";
import { Feature } from "./Feature";

@Entity({name:"call"})
export class Call {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 4})
    callType: string;


    @Column({nullable: false, length: 250})
    callDescription: string;

    @Column({nullable: true})
    callAttachments: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @OneToMany(() => Hotfix, (hotfix) => hotfix.id)
    hotfix: Hotfix[];

    @OneToMany(() => Feature, (feature) => feature.id)
    feature: Feature[];

    @OneToMany(() => Arquivo, (arquivo) => arquivo.id)
    arquivo: Arquivo[];


  
}
