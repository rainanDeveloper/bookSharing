import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'
import logo from '../../logo.svg'

function Login() {
    return (
      <div className="LoginForm">
        <h1 className="projectTitle"><img src={logo} alt=""/><p>Book<span>Sharing</span></p></h1>
        <form>
          <input placeholder="E-mail"/>
          <input placeholder="Login"/>
          <input type="password" placeholder="Senha"/>
          <p>Já possui uma conta? <a href="/">Login</a></p>
          <button className="loginButton">Login</button>
        </form>
      </div>
    );
  }
  
  export default Login;