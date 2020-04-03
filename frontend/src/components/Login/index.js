import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'
import './styles.css'
import logo from '../../logo.svg'

function Login() {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')

    const history = useHistory()

    async function handleLogin(event) {
      event.preventDefault()

      try {
        const response = await api.post('/users/login', {
          usr_login: login,
          usr_pass: pass
        })

        localStorage.setItem('access-token', response.data.token)

        history.push('/dashboard')
      } catch (error) {
        alert('Não foi possível fazer login')
      }
    }

    return (
      <div className="Login">
        <div className="LoginForm">
          <h1 className="projectTitle"><img src={logo} alt=""/><p>Book<span>Sharing</span></p></h1>
          <form onSubmit={handleLogin}>
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