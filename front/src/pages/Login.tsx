import React, { useState } from "react";
import "../App.css";
import { Row } from "react-bootstrap";
import "../styles/Login.css";

class Login extends React.Component <any, any>{
    constructor(props:any){
        super(props)
        this.state = {
            nickName: "",
            password: ""
        }
    }

    sendLogin = (event:any) => {
        event.preventDefault();
        let data = {
            nickName: this.state.nickName,
            password: this.state.password
        }
        console.log("data", data)
    }

    render(){
        return(
            <div className='d-flex flex-center flex-column flex-column-fluid px-2'>
                <div className="row col-md-12">
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-6 background-login">
                        <div className="container d-flex justify-content-center">
                            <div className="card mt-5 w-50">
                                <div className="card-body">
                                    <form onSubmit={this.sendLogin}>
                                        <div className="form-group text-dark fw-bolder mb-3 font-padrao-titulo">
                                            <label htmlFor="nickName">Usuário</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                value={this.state.nickName}
                                                onChange={e => this.setState({nickName: e.target.value})}
                                                id="nickName" 
                                                placeholder="Insira o nome de usuário" />
                                        </div>
                                        <div className="form-group text-dark fw-bolder mb-3 font-padrao-titulo">
                                            <label htmlFor="password">Senha</label>
                                            <input 
                                                type="password" 
                                                className="form-control"
                                                value={this.state.password}
                                                onChange={e => this.setState({password: e.target.value})} 
                                                id="password" 
                                                placeholder="Insira a senha"/>
                                        </div>
                                        <button 
                                        type="submit" 
                                        className="btn btn-login"
                                        >Entrar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login;