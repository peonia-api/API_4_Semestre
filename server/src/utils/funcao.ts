import AppDataSource from "../data-source";
import { Call } from "../entities/Call";
import { Committee } from "../entities/Committee";
import { GroupToCall } from "../entities/GroupToCall";
import { ConcreteSubject, UserObserver } from './observer';

const concreteSubject = new ConcreteSubject();

export const validateCommitteeFilter = async (idCommittee) => {
    const committeeRepository = AppDataSource.getRepository(Committee)
    const callRep = AppDataSource.getRepository(Call)
    const call = await callRep.findOneBy({ id: idCommittee })
    const allCommittee = await committeeRepository.findOneBy({ id: idCommittee })

    getGroupToCall(idCommittee);

    if (allCommittee.call.callStatus == "Em análise") {
        if (allCommittee.comiRiskCso == 3 || allCommittee.comiRiskRt == 3 || allCommittee.comiImpactCto == 0 || allCommittee.comiImpactHp == 0) {
            call.callStatus = "Arquivada"
            call.callDateFinalization = new Date();
            await callRep.save(call);
            concreteSubject.notifyObservers();
        }
        else if (allCommittee.comiImpactCto == null || allCommittee.comiImpactHp == null || allCommittee.comiRiskCso == null || allCommittee.comiRiskRt == null) {
            if (allCommittee.comiRiskCso < 3 && allCommittee.comiRiskRt == null && allCommittee.comiRiskCso != null) {
                call.avaliar = "RT"
                await callRep.save(call)
            }
            else if (allCommittee.comiImpactCto == null && allCommittee.comiRiskCso < 3 && allCommittee.comiRiskRt < 3 && allCommittee.comiRiskCso != null && allCommittee.comiRiskRt != null) {
                call.avaliar = "CTO"
                await callRep.save(call)
            }
            else if (allCommittee.comiImpactHp == null && allCommittee.comiRiskCso < 3 && allCommittee.comiRiskRt < 3 && allCommittee.comiImpactCto > 0 && allCommittee.comiRiskCso != null && allCommittee.comiRiskRt != null && allCommittee.comiImpactCto != null) {
                call.avaliar = "HP"
                await callRep.save(call)
            }
            // call.callStatus = "Em análise"
            // await callRep.save(call)
        }
        else {
            call.callStatus = "Aprovada"
            await callRep.save(call)
            concreteSubject.notifyObservers();
        }
    }
}

export const getGroupToCall = async (idgroupToCall: number) => {
    try {
        const groupToCallRepository = AppDataSource.getRepository(GroupToCall)
        const allgroupToCall = await groupToCallRepository.find({
            relations: { call: true },
            where: {
                call: { id: idgroupToCall },
            },
        })
        let listaCliente = [];
        allgroupToCall.forEach((item) => (listaCliente.push({ email: item.group.cliente, titulo: item.call.callTitle, status: item.call.callStatus })))

        listaCliente.forEach((item) => {
            const emails = item.email;
            console.log(emails);


            const observer = new UserObserver(emails, item.status, item.titulo);
            concreteSubject.addObserver(observer);
        });

        return listaCliente;
    } catch (err) {
        return "";
    }
};


