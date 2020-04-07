import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiSettings, FiTrash2} from 'react-icons/fi'
import api from '../../services/api'
import './styles.css'
import logo from '../../logo.svg'

function Dashboard(){
    const [requests, setRequests] = useState([])

    const history = useHistory()

    const accessToken = localStorage.getItem('access-token')

    useEffect(()=>{
        api.get('book/request',{
            headers:{
                'x-access-token': accessToken
            }
        }).then(response=>{
            setRequests(response.data)
        })
    }, [accessToken])

    async function deleteRequest(id){
        try {
            await api.delete(`book/request/${id}`, {
                headers:{
                    'x-access-token': accessToken
                }
            })
    
            setRequests(requests.filter(request=>request.id!==id))
        } catch (error) {
            alert(`Não foi possível deletar solicitação! ${error}`)
        }
    }

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
                    {requests.map(request=>(
                        <li key={request.id}>
                            <h1>{request.bk_title}</h1>
                            <h2>{request.bk_subtitle}</h2>
                            <p>{request.auth_name}</p>

                            <button className="Delete" onClick={()=>deleteRequest(request.id)}><FiTrash2 color="#ccc" size="25px"/></button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Dashboard