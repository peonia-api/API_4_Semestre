import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import "../styles/Login.css";
import axios from "axios";
//import emailjs from "emailjs-com";
import  emailjs  from  '@emailjs/browser'

import { URIuser } from "../enumerations/uri";
import { Users } from "../types/user";
import { Navigate } from "react-router-dom";
import { senhaAlterada } from "../controllers";

const Swal = require("sweetalert2");

function RedefinirSenha() {

  const email = window.location.href.split("/")[4];
  console.log(email);

  const [userPassword, setuserPassword] = useState("");

  const handleRedefine = (e: any) => {
    e.preventDefault();
    console.log("submit", { userPassword });
  };

  const changeInput = (e: any) => {
    e.style.backgroundColor = "#54C5CE";
  };

  async function redefinirSenha() {
      await axios.put(`${URIuser.ALTERA_SENHA}`, {userEmail:email, userPassword: userPassword}).then((res) => {
        senhaAlterada().then((res) => {
          window.location.assign("/login");
        })
      })
  }

  return (
    <div className="d-flex flex-center flex-column flex-column-fluid">
      <div className="row col-md-12">
        <div className="col-md-6"></div>
        <div className="col-md-6 background-login">
          <div></div>
          <div className="container row col-md-12 d-flex justify-content-center">
            <div className="card mt-5 w-50 ml-5">
              <div className="card-body">
                <form onSubmit={handleRedefine}>
                  <div className="form-group text-dark fw-bolder mb-3 font-padrao-titulo">
                    <label htmlFor="password">Nova senha:</label>
                    <input
                      type="password"
                      className="form-control input-login"
                      value={userPassword}
                      onChange={(e) => setuserPassword(e.target.value)}
                      id="password"
                      placeholder="Insira a nova senha pretendida"
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <button
                      type="submit"
                      className="btn btn-login"
                      onClick={redefinirSenha}
                    >
                      Cadastrar a nova senha
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RedefinirSenha;
