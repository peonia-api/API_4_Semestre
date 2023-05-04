import AppDataSource from "../data-source";
import { Call } from "../entities/Call";
import { Committee } from "../entities/Committee";

export const validateCommitteeFilter = async (idCommittee) => {
    console.log(idCommittee);

    const committeeRepository = AppDataSource.getRepository(Committee)
    const callRep = AppDataSource.getRepository(Call)
    const call = await callRep.findOneBy({id: idCommittee})
    const allCommittee = await committeeRepository.findOneBy({id: idCommittee})
    
    if(allCommittee.call.callStatus == "Aprovada"){
        return JSON.stringify({id: allCommittee.id, arquivada: false})
    }
    else if(allCommittee.call.callStatus == "Em desenvolvimento"){
        return JSON.stringify({id: allCommittee.id, arquivada: false})
    }
    else{
        if (allCommittee.comiRiskCso == 3) {
            call.callStatus = "Arquivada"
            await callRep.save(call)
        }
        else if (allCommittee.comiRiskRt == 3) {
            call.callStatus = "Arquivada"
            await callRep.save(call)
        }
        else if (allCommittee.comiImpactCto == 0) {
            call.callStatus = "Arquivada"
            await callRep.save(call)
        }
        else if (allCommittee.comiImpactHp == 0) {
            call.callStatus = "Arquivada"
            await callRep.save(call)
        }
        else if(allCommittee.comiImpactCto == null || allCommittee.comiImpactHp == null || allCommittee.comiRiskCso == null || allCommittee.comiRiskRt == null){
            if(allCommittee.comiRiskCso < 3 && allCommittee.comiRiskRt == null && allCommittee.comiRiskCso != null){
                call.avaliar = "RT"
                await callRep.save(call)
            }
            else if(allCommittee.comiImpactCto == null && allCommittee.comiRiskCso < 3 && allCommittee.comiRiskRt < 3 && allCommittee.comiRiskCso != null && allCommittee.comiRiskRt != null){
                call.avaliar = "CTO"
                await callRep.save(call)
            }
            else if(allCommittee.comiImpactHp == null && allCommittee.comiRiskCso < 3 && allCommittee.comiRiskRt < 3 && allCommittee.comiImpactCto > 0 && allCommittee.comiRiskCso != null && allCommittee.comiRiskRt != null && allCommittee.comiImpactCto != null){
                call.avaliar = "HP"
                await callRep.save(call)
            }
            call.callStatus = "Em análise"
            await callRep.save(call)
        }
        else{
            call.callStatus = "Aprovada"
            await callRep.save(call)
        }
    }
}

export const getComiteTipo = async (tipo) => {
    const committeeRepository = AppDataSource.getRepository(Committee)
    const callRepository = AppDataSource.getRepository(Call)
   
    if(tipo == "CSO"){
        const feature = await callRepository.findBy({ callType: "feature", callStatus: "Em análise", avaliar: "CSO" })
        return feature
    }else if(tipo == "RT"){
        const feature = await callRepository.findBy({ callType: "feature", callStatus: "Em análise", avaliar: "RT" })
        return feature
    }
    else if(tipo == "CTO"){
        const feature = await callRepository.findBy({ callType: "feature", callStatus: "Em análise", avaliar: "CTO" })
        return feature
    }
    else if(tipo == "HP"){
        const feature = await callRepository.findBy({ callType: "feature", callStatus: "Em análise", avaliar: "HP" })
        return feature
    }
    
}