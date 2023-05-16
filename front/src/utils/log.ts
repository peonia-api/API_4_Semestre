export const log = (data: any) => {
  console.log(data);
  const mergedata = data.feature.reduce((list: any, res: any) => {
      console.log(res);
      
      res.comiRiskCso != null && list.push({id: res.id, type: "CSO", nota: res.comiRiskCso, descricao: res.comiRiskCsoAvaliation, tipoChamado: res.call.callType});
      res.comiRiskRt != null && list.push({id: res.id, type: "RT", nota: res.comiRiskRt, descricao: res.comiRiskRtAvaliation, tipoChamado: res.call.callType});
      res.comiImpactCto != null && list.push({id: res.id, type: "CTO", nota: res.comiImpactCto, descricao: res.comiImpactCtoAvaliation, tipoChamado: res.call.callType});
      res.comiImpactHp != null && list.push({id: res.id, type: "HP", nota: res.comiImpactHp, descricao: res.comiImpactoHpAvaliation, tipoChamado: res.call.callType});
      return list;
      
    }, []);
    data.hotfix.reduce((list:any, res:any) => {
      console.log(res);
      
      list.push({id: res.id, type: "HP", nota: res.callPriority, descricao: res.HpDescription , tipoChamado: res.callType})
      return list
    }, mergedata)
    return mergedata
}

