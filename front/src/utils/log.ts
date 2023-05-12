export const log = (data: any) => {
    return data.reduce((list: any, res: any) => {
      res.comiRiskCso != null && list.push({id: res.id, type: "CSO", nota: res.comiRiskCso, descricao: res.comiRiskCsoAvaliation});
      res.comiRiskRt != null && list.push({id: res.id, type: "RT", nota: res.comiRiskRt, descricao: res.comiRiskRtAvaliation});
      res.comiImpactCto != null && list.push({id: res.id, type: "CTO", nota: res.comiImpactCto, descricao: res.comiImpactCtoAvaliation});
      res.comiImpactHp != null && list.push({id: res.id, type: "HP", nota: res.comiImpactHp, descricao: res.comiImpactoHpAvaliation});
      return list;
    }, []);
  }

export const getDifferentElements = (arr1:any, arr2:any) => {
  return arr1.filter((elem:any) => !arr2.includes(elem)).concat(arr2.filter((elem:any) => !arr1.includes(elem)));
}