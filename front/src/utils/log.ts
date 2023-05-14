export const log = (data: any) => {
    return data.reduce((list: any, res: any) => {
      res.comiRiskCso != null && list.push({id: res.id, type: "CSO", nota: res.comiRiskCso, descricao: res.comiRiskCsoAvaliation, tipoChamado: res.call.callType});
      res.comiRiskRt != null && list.push({id: res.id, type: "RT", nota: res.comiRiskRt, descricao: res.comiRiskRtAvaliation, tipoChamado: res.call.callType});
      res.comiImpactCto != null && list.push({id: res.id, type: "CTO", nota: res.comiImpactCto, descricao: res.comiImpactCtoAvaliation, tipoChamado: res.call.callType});
      res.comiImpactHp != null && list.push({id: res.id, type: "HP", nota: res.comiImpactHp, descricao: res.comiImpactoHpAvaliation, tipoChamado: res.call.callType});
      return list;
    }, []);
  }
