import React from 'react';
import {Link} from 'react-router-dom'
import ReactDOM from 'react-dom';
import './styles.css'
import logo from '../../logo.svg'

function Login() {
    return (
      <div className="SignUp">
        <section>
          <h1 className="projectTitle"><img src={logo} alt=""/><p>Book<span>Sharing</span></p></h1>
        </section>
        <div className="LoginForm">
          <form>
            <input placeholder="E-mail"/>
            <input placeholder="Login"/>
            <input type="password" placeholder="Senha"/>
            <input placeholder="Nome"/>
            <div className="input-group">
              <input placeholder="CFP"/>
              <input type="date"/>
            </div>
            <p>Já possui uma conta? <Link to="/">Login</Link></p>
            <button className="loginButton">Login</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Login;