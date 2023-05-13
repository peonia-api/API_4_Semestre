import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { URIuser, api } from "../enumerations/uri";
import { avisoErroLogin } from "../controllers";



export const AuthContext = createContext({} as any);

export const AuthProvider = ({children}:any) => {
    const navigate = useNavigate()
    const [ user, setUser ] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try{
            const recoveredUser = localStorage.getItem('userEmail')
            const recoveredToken = localStorage.getItem('token')
            if (recoveredUser && recoveredToken) {
                
                setUser(JSON.parse(recoveredUser))
                api.defaults.headers.Authorization = `Bearer ${recoveredToken}`
                api.defaults.headers.common = { Authorization: `Bearer ${recoveredToken}` }
                api.defaults.withCredentials = true
            }
        }catch(err){

        }
        setLoading(false)
      }, []);


    const login = async (email:any, password:any) => {
        try{
            await axios.post(URIuser.LOGIN_USER, {userEmail: email, userPassword: password})
            .then((res) => {
                const loggedUser = res.data.userEmail
                const token = res.data.token
                const userType = res.data.userType
                const userName = res.data.userName
                const icone = res.data.icone

                localStorage.setItem('userEmail', JSON.stringify(loggedUser))
                localStorage.setItem('token', token)
                localStorage.setItem("userType",userType)
                localStorage.setItem("userName", userName)
                localStorage.setItem("icone", icone)
                console.log(res);
                

                api.defaults.headers.Authorization = `Bearer ${token}`
                api.defaults.headers.common = { Authorization: `Bearer ${token}` }
                api.defaults.withCredentials = true
                setUser(loggedUser)
                navigate("/")

            })
            .catch((err) => {     
                localStorage.removeItem("userEmail");
                localStorage.removeItem("token")    
                localStorage.removeItem("userType")
                localStorage.removeItem("userName")
                localStorage.removeItem("icone")
                avisoErroLogin()
            })
        }catch(err){

        }
        
    }

    
    const logout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("token")
        localStorage.removeItem("userType")
        localStorage.removeItem("userName")
        localStorage.removeItem("icone")
        api.defaults.headers.Authorization = null
        api.defaults.headers.common = { Authorization: `` }
        api.defaults.withCredentials = false
        setUser(null);
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{authenticated: Boolean(user), user, loading , logout, login}}>

            {children}
        </AuthContext.Provider>
    )
}

export const Private = ({ children }:any) => {
    const { authenticated, loading } = useContext(AuthContext);

    if(loading){
        return <div className="loading">Carregando...</div>
    }
    if(!authenticated){
        return <Navigate to={"/login"}/> 
    }

    return children;

}

export const VerifyDiretor = ({ children }:any) => {
    const tipo = localStorage.getItem("userType")

    if(tipo !== "Diretor"){
        return <Navigate to={"/LogAvaliacoes"}/>
    }

    return children;
}

export const VerifyCso = ({ children }:any) => {
    const tipo = localStorage.getItem("userType")

    if(tipo !== "CSO"){
        return <Navigate to={"/ListagemTipoUsuario"}/>
    }

    return children;
}

export const VerifyRT = ({ children }:any) => {
    const tipo = localStorage.getItem("userType")

    if(tipo !== "RT"){
        return <Navigate to={"/ListagemTipoUsuario"}/>
    }

    return children;
}

export const VerifyCTO = ({ children }:any) => {
    const tipo = localStorage.getItem("userType")

    if(tipo !== "CTO"){
        return <Navigate to={"/ListagemTipoUsuario"}/>
    }

    return children;
}

export const VerifyHP = ({ children }:any) => {
    debugger
    const tipo = localStorage.getItem("userType")

    if(tipo !== "HP"){
        return <Navigate to={"/ListagemTipoUsuario"}/>
    }

    return children;
}

export const VerifySQUAD = ({ children }:any) => {
    const tipo = localStorage.getItem("userType")

    if(tipo !== "SQUAD"){
        return <Navigate to={"/ListagemTipoUsuario"}/>
    }

    return children;
}

export const VerifyPADRAO = ({ children }:any) => {
    const tipo = localStorage.getItem("userType")

    if(tipo == "Padrao"){
        return <Navigate to={"/listagem"}/>
    }

    return children;
}


