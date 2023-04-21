export const VerifyType = (tipo:any) => {
    
    if(tipo === "SQUAD"){
        return "/comiteSquad/"
    }
    else if(tipo === "CSO"){
        return "/comiteCso/"
    }
    else if(tipo === "RT"){
        return "/comiteRt/"
    }
    else if(tipo === "CTO"){
        return "/comiteCto/"
    }
    else if(tipo === "HP"){
        return "/comiteHp/"
    }
    
}