import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'
import './styles.css'
import logo from '../../logo.svg'

function Login() {

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [date, setDate] = useState('')
    
    const geolocationOptions = {
      timeout: 10000
    };

    let usr_latitude=0
    let usr_longitude=0

    navigator.geolocation.getCurrentPosition((position)=>{
      usr_latitude=position.coords.latitude
      usr_longitude=position.coords.longitude

      console.log(`Position: ${usr_latitude}:${usr_longitude}`)
    }, (error)=>{
      console.error(`Error during position aquiring: ${error.message}`)
    }, geolocationOptions)


    function CpfMask(CPF) {
      setCpf(CPF.replace(/^(\d{3})/g,'$1.').replace(/^(\d{3})\.(\d{3})/g,'$1.$2.').replace(/^(\d{3})\.(\d{3})\.(\d{3})/g,'$1.$2.$3-'))
    }

    async function handleSignUp(event){
      event.preventDefault()

      try {
        const response = await api.post('/users/', {
          usr_login: login,
          usr_pass: pass,
          usr_name: name,
          usr_email: email,
          usr_cpf: cpf,
          usr_data_nasc: date,
          usr_latitude,
          usr_longitude 
        })

        history.push('/')
      } catch (error) {
        alert('Não foi possível criar usuário!')
      }
    }

    return (
      <div className="SignUp">
        <section>
          <h1 className="projectTitle"><img src={logo} alt=""/><p>Book<span>Sharing</span></p></h1>
          <p>Deseja entrar em uma comunidade onde pessoas compartilham conhecimento na sua forma mais pura?</p>
          <span>Cadastre-se!</span>
        </section>
        <div className="LoginForm">
          <form onSubmit={handleSignUp}>
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