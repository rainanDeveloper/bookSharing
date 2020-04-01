import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Link, useHistory} from 'react-router-dom'
import './styles.css'
import logo from '../../logo.svg'

function Login() {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')

    // const history = useHistory()

    return (
      <div className="Login">
        <div className="LoginForm">
          <h1 className="projectTitle"><img src={logo} alt=""/><p>Book<span>Sharing</span></p></h1>
          <form>
            <input required={true} value={login} onChange={event=>setLogin(event.target.value)} placeholder="Login"/>
            <input required={true} value={pass} onChange={event=>setPass(event.target.value)} type="password" placeholder="Senha"/>
            <p>Não tem uma conta? <Link to="/SignUp">Cadastre-se</Link></p>
            <button className="loginButton">Login</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Login;