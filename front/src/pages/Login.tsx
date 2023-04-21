import React, { useContext, useState } from "react";
import "../App.css";
import "../styles/Login.css";
import { AuthContext } from "../contexts/auth";

function Login(){
    
    const { login } = useContext(AuthContext)

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = (e:any) => {
        e.preventDefault()
        console.log("submint", {email, password});
       
        login(email, password)
    }
    const changeInput = (e: any) =>{
        e.style.backgroundColor = "#54C5CE";
    }

    return(
        <div className='d-flex flex-center flex-column flex-column-fluid'>
            <div className="row col-md-12">
                <div className="col-md-6">
                </div>
                <div className="col-md-6 background-login">
                    <div>
                    </div>
                    <div className="container row col-md-12 d-flex justify-content-center">
                        <img              
                        src="https://uploads-ssl.webflow.com/60dcc4691817e11aa93685ab/636cfbef568f863947dd4951_logo-color.svg"
                        alt="Logotipo de IONIC Health"
                        className="logo-login" />
                        <div className="card mt-5 w-50 ml-5">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group text-dark fw-bolder mb-3 font-padrao-titulo">
                                        <label htmlFor="email">Usuário</label>
                                        <input 
                                            type="text" 
                                            className="form-control input-login"
                                            value={email}
                                            onChange={e =>{setEmail(e.target.value); changeInput(e.target)}}
                                            id="email" 
                                            placeholder="Insira o nome de usuário" />
                                    </div>
                                    <div className="form-group text-dark fw-bolder mb-3 font-padrao-titulo">
                                        <label htmlFor="password">Senha</label>
                                        <input 
                                            type="password" 
                                            className="form-control input-login"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)} 
                                            id="password" 
                                            placeholder="Insira a senha"/>
                                    </div>
                                    <div className="d-flex justify-content-center mt-2">
                                        <button 
                                        type="submit" 
                                        className="btn btn-login"
                                        >Entrar</button>
                                    </div>
                                    <div className="d-flex justify-content-center mt-2">
                                        <a href="">Esqueceu a senha?</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
   
}

export default Login;
