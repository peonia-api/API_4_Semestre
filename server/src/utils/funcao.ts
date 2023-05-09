import AppDataSource from "../data-source";
import { Call } from "../entities/Call";
import { Committee } from "../entities/Committee";

export const validateCommitteeFilter = async (idCommittee) => {
    const committeeRepository = AppDataSource.getRepository(Committee)
    const callRep = AppDataSource.getRepository(Call)
    const call = await callRep.findOneBy({ id: idCommittee })
    const allCommittee = await committeeRepository.findOneBy({ id: idCommittee })

    if (allCommittee.call.callStatus == "Em análise") {
        if (allCommittee.comiRiskCso == 3 || allCommittee.comiRiskRt == 3 || allCommittee.comiImpactCto == 0 || allCommittee.comiImpactHp == 0) {
            call.callStatus = "Arquivada"
            call.callDateFinalization = newDate();
            await callRep.save(call)
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
        }
    }
}
function newDate(): Date {
    throw new Error("Function not implemented.");
}

