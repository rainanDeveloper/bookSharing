import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import ReactDOM from 'react-dom';
import './styles.css'
import logo from '../../logo.svg'

function Login() {

    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [date, setDate] = useState('')


    function CpfMask(CPF) {
      setCpf(CPF.replace(/^(\d{3})/g,'$1.').replace(/^(\d{3})\.(\d{3})/g,'$1.$2.').replace(/^(\d{3})\.(\d{3})\.(\d{3})/g,'$1.$2.$3-'))
    }

    return (
      <div className="SignUp">
        <section>
          <h1 className="projectTitle"><img src={logo} alt=""/><p>Book<span>Sharing</span></p></h1>
          <p>Deseja entrar em uma comunidade onde pessoas compartilham conhecimento na sua forma mais pura?</p>
          <span>Cadastre-se!</span>
        </section>
        <div className="LoginForm">
          <form>
            <input required={true} value={email} onChange={event=>setEmail(event.target.value)} type="email" placeholder="E-mail"/>
            <input required={true} value={login} onChange={event=>setLogin(event.target.value)} placeholder="Login"/>
            <input required={true} value={pass} onChange={event=>setPass(event.target.value)} type="password" placeholder="Senha"/>
            <input required={true} value={name} onChange={event=>setName(event.target.value)} placeholder="Nome"/>
            <div className="input-group">
              <input type="cpf" required={true} maxLength={14} value={cpf} onChange={event=>CpfMask(event.target.value.replace(/\D/g, ""))} pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" placeholder="CFP"/>
              <input value={date} required={true} onChange={event=>setDate(event.target.value)} type="date"/>
            </div>
            <p>Já possui uma conta? <Link to="/">Login</Link></p>
            <button className="loginButton">Cadastre-se</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Login;