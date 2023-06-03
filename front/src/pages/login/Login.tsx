import React, { useContext, useState } from "react";
import "../../App.css";
import "../../styles/Login.css";
import "../../styles/Responsivo.css";
import { AuthContext } from "../../contexts/auth";
//import emailjs from "emailjs-com";
import  emailjs  from  '@emailjs/browser'
import { solicitaEmail } from "../../controllers";
import { URIuser } from "../../enumerations/uri";
import { Users } from "../../types/user";
import axios from "axios";
const Swal = require("sweetalert2");

function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [EmailRecovery, setEmailRecovery] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit", { email, password });

    login(email, password);
  };
  const changeInput = (e: any) => {
    e.style.backgroundColor = "#54C5CE";
  };



  let paramsEmail = {
    email: EmailRecovery,
  };

  async function redefinirSenha() {
    const { value: emailRecovery } = await solicitaEmail();

    const emailRecebido = emailRecovery;
    console.log(emailRecebido);

    const localizaBanco = await axios.get(`${URIuser.PEGA_EMAIL_ESPECIFICO}${emailRecebido}`);
    
    const emailBanco = localizaBanco.data.Existe;
    console.log(emailBanco);

    if (emailBanco == true) {
       enviarLink(emailRecebido);
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Não foi possível localizar o e-mail na base dados. Verifique e tente novamente',
      })
    }
  }

  function enviarLink(email: string) {
    Swal.fire({
      icon: "success",
      title: 'Sucesso!!',
      text: 'Em instantes você receberá um e-mail contendo as instruções para redefinir a sua senha',
    })

    var templateParams = {
      email: email,
    };

    emailjs
      .send(
        "gmailMessage",
        "template_6lh0ahr",
        templateParams,
        "w4LxBZJlq08EuppL3"
      )
      .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
        }).catch((err) => {
          console.log("FAILED...", err);
        });
  }

  return (
      <div className="row col-md-12 login m-0">
        <div className="col-md-6"></div>
        <div className="col-md-6 background-login">
          <div></div>
          <div className="container row col-md-12 d-flex justify-content-center">
            <img
              src="https://uploads-ssl.webflow.com/60dcc4691817e11aa93685ab/636cfbef568f863947dd4951_logo-color.svg"
              alt="Logotipo de IONIC Health"
              className="logo-login"
            />
            <div className="card mt-5 w-50 ml-5 respLog">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group text-dark fw-bolder mb-3 font-padrao-titulo">
                    <label htmlFor="email">Usuário</label>
                    <input
                      type="text"
                      className="form-control input-login"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        changeInput(e.target);
                      }}
                      id="email"
                      placeholder="Insira o nome de usuário"
                    />
                  </div>
                  <div className="form-group text-dark fw-bolder mb-3 font-padrao-titulo">
                    <label htmlFor="password">Senha</label>
                    <input
                      type="password"
                      className="form-control input-login"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      placeholder="Insira a senha"
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <button type="submit" className="btn btn-login">
                      Entrar
                    </button>
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <button
                      title="btn_red_senha"
                      type="button"
                      id="btn_red_senha"
                      name="redButton"
                      className="btn btn-login"
                      onClick={redefinirSenha}
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;
