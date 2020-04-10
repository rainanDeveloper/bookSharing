import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {FiSettings, FiTrash2,FiPlus, FiLogOut, FiX, FiSave} from 'react-icons/fi'
import api from '../../services/api'
import './styles.css'
import logo from '../../logo.svg'

function Dashboard(){
    const [requests, setRequests] = useState([])
    const [modalContent, setModalContent] = useState(<div/>)

    const [book, setBook] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')

    const history = useHistory()

    const accessToken = localStorage.getItem('access-token')
    const username = localStorage.getItem('username')

    if(!accessToken){
        history.push('/')
    }

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

    function handleCloseModal(){
        const modal = document.querySelector("div div.modal")

        modal.classList.remove('active')
    }

    function handleModalAddRequest(){
        const modal = document.querySelector("div div.modal")

        setModalContent(
            <div className="modalContent">
                <button className="close" onClick={handleCloseModal}><FiX size="20px" color="#aaa"/></button>
                <header><h1>Solicitação</h1></header>
                <div className="formSolicitacao">
                    <form>
                        <div className="input-group">
                            <input value={category} onChange={event=>setCategory(event.target.value)} placeholder="Categoria"/>
                            <input value={author} onChange={event=>setAuthor(event.target.value)} placeholder="Autor"/>
                        </div>
                        <input value={book} onChange={event=>setBook(event.target.value)} placeholder="Livro"/>
                        <button><FiSave size="20px" color="white"/> Salvar</button>
                    </form>
                </div>
            </div>
        )

        modal.classList.add('active')
    }

    function handleModalAddShare(){
        const modal = document.querySelector("div div.modal")

        setModalContent(
            <div className="modalContent">
                <button className="close" onClick={handleCloseModal}><FiX size="20px" color="#aaa"/></button>
                <header><h1>Compartilhamento</h1></header>
                <div className="formCompartilhamento">
                    <form>
                        <div className="input-group">
                            <input value={category} onChange={event=>setCategory(event.target.value)} placeholder="Categoria"/>
                            <input value={author} onChange={event=>setAuthor(event.target.value)} placeholder="Autor"/>
                        </div>
                        <input value={book} onChange={event=>setBook(event.target.value)} placeholder="Livro"/>
                        <button><FiSave size="20px" color="white"/> Salvar</button>
                    </form>
                </div>
            </div>
        )

        modal.classList.add('active')
    }

    function handleSwitchDropdown(event){
        const dropdown = event.target.closest('div.dropdown')

        if(dropdown.classList.contains('active')){
            dropdown.classList.remove('active')
        }
        else{
            dropdown.classList.add('active')
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="generalContent">
            <div className="modal">
                {modalContent}
            </div>
            <div className="DashBoard">
                <header>
                    <h1 className="projectTitle"><img src={logo} alt=""/><p>Book<span>Sharing</span></p></h1>
                    <div className="menu">
                        <h1>Bem vindo {username}!</h1>
                        <div className="dropdown">
                            <button className="AddNew" onClick={handleSwitchDropdown}><FiPlus color="white" size="25px"/></button>
                            <div className="dropdown-content" onMouseLeave={handleSwitchDropdown}>
                                <ul>
                                    <li><button onClick={handleModalAddRequest}><FiPlus color="#ccc" size="20px"/> <p> Solicitação</p></button></li>
                                    <li><button onClick={handleModalAddShare}><FiPlus color="#ccc" size="20px"/> <p> Compartilhamento</p></button></li>
                                </ul>
                            </div>
                        </div>
                        <div className="dropdown">
                            <div className="profilePic" onClick={handleSwitchDropdown}>
                                <img width="100%" src="./profile.png" alt=""/>
                            </div>
                            <div className="dropdown-content" onMouseLeave={handleSwitchDropdown}>
                                <ul>
                                    <li><button>Alterar Foto de perfil</button></li>
                                </ul>
                            </div>
                        </div>
                        <div className="dropdown">
                            <button className="settings" onClick={handleSwitchDropdown}><FiSettings color="white" size="25px"/></button>
                            <div className="dropdown-content" onMouseLeave={handleSwitchDropdown}>
                                <ul>
                                    <li><button onClick={handleLogout}><FiLogOut color="#ccc" size="20px"/> Sair</button></li>
                                </ul>
                            </div>
                        </div>
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
        </div>
    )
}

export default Dashboard