import { Calls } from "./call";

export const initialValues = {
    comiImpactCto: 0,
    comiImpactHp: 0,
    comiCostSquad: 0,
    comiRiskRt: 0,
    comiRiskCso: 0
}

export interface Committee {
    id: number;
    comiImpactCto: number;
    comiImpactHp: number;
    comiCostSquad: number;
    comiRiskRt: number;
    comiRiskCso: number;
    call: Calls;
}