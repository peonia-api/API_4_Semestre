import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { URIuser, api } from "../enumerations/uri";



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

                localStorage.setItem('userEmail', JSON.stringify(loggedUser))
                localStorage.setItem('token', token)

                console.log(res);
                

                api.defaults.headers.Authorization = `Bearer ${token}`
                api.defaults.headers.common = { Authorization: `Bearer ${token}` }
                api.defaults.withCredentials = true
                setUser(loggedUser)
                navigate("/")

            })
            .catch((err) => {                
                alert("Erro ao entrar"); //colocar o swall
            })
        }catch(err){

        }
        
    }

    const logout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("token")
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