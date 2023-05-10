export const log = (data: any) => {
    return data.reduce((list: any, res: any) => {
      res.comiRiskCso != null && list.push({id: res.id, type: "CSO", nota: res.comiRiskCso, descricao: res.comiRiskCsoAvaliation});
      res.comiRiskRt != null && list.push({id: res.id, type: "RT", nota: res.comiRiskRt, descricao: res.comiRiskRtAvaliation});
      res.comiImpactCto != null && list.push({id: res.id, type: "CTO", nota: res.comiImpactCto, descricao: res.comiImpactCtoAvaliation});
      res.comiImpactHp != null && list.push({id: res.id, type: "HP", nota: res.comiImpactHp, descricao: res.comiImpactoHpAvaliation});
      return list;
    }, []);
  }