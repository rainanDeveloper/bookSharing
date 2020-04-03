import React from 'react'
import ReactDom from 'react-dom'
import {Link, useHistory} from 'react-router-dom'
import {FiSettings} from 'react-icons/fi'
import api from '../../services/api'
import './styles.css'
import logo from '../../logo.svg'

function Dashboard(){

    const accessToken = localStorage.getItem('access-token')

    return (
        <div className="DashBoard">
            <header>
                <h1 className="projectTitle"><img src={logo} alt=""/><p>Book<span>Sharing</span></p></h1>
                <div className="menu">
                    <div className="profilePic">
                        <img src="./profile.png" alt=""/>
                    </div>
                    <button><FiSettings color="white" size="25px"/></button>
                </div>
            </header>
            <div className="dash-itens">
                <h1>Solicitações</h1>
                <ul>
                    <li>
                        <h1>O mundo assumbrado por demônios</h1>
                        <h2>A ciência vista como uma vela no escuro</h2>
                        <p>Autor: Carl Sagan</p>
                    </li>
                    <li>
                        <h1>Titulo</h1>
                        <h2>Subtitulo</h2>
                    </li>
                    <li>
                        <h1>Titulo</h1>
                        <h2>Subtitulo</h2>
                    </li>
                    <li>
                        <h1>Titulo</h1>
                        <h2>Subtitulo</h2>
                    </li>
                    <li>
                        <h1>Titulo</h1>
                        <h2>Subtitulo</h2>
                    </li>
                    <li>
                        <h1>Titulo</h1>
                        <h2>Subtitulo</h2>
                    </li>
                    <li>
                        <h1>Titulo</h1>
                        <h2>Subtitulo</h2>
                    </li>
                    <li>
                        <h1>Titulo</h1>
                        <h2>Subtitulo</h2>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Dashboard