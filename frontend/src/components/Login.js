import React from 'react';
import ReactDOM from 'react-dom';
import '../css/Login.css'
import logo from '../logo.svg'

function Login() {
    return (
      <div className="LoginForm">
        <h1 className="projectTitle"><img src={logo} alt=""/><p>Book<span>Sharing</span></p></h1>
        <label htmlFor="Login">Login</label>
        <input id="Login" name="Login" type="text"/>
        <label htmlFor="Senha">Senha</label>
        <input id="Senha" name="Senha" type="password"/>
        <p>Não tem uma conta? <a href="#">Cadastre-se</a></p>
        <button>Login</button>
      </div>
    );
  }
  
  export default Login;