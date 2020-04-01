import React from 'react'
import ReactDom from 'react-dom'
import {Link, useHistory} from 'react-router-dom'
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
                    <button></button>
                </div>
            </header>
        </div>
    )
}

export default Dashboard