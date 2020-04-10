import React, {useState} from 'react'
import api from '../../services/api'
import {FiX, FiSave} from 'react-icons/fi'

import './styles.css'

function ModalRequest(){
    
    const [book, setBook] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')

    function handleCloseModal(){
        const modal = document.querySelector("div div.modal")

        modal.classList.remove('active')
    }

    return (
        <div className="modalContent">
            <button className="close" onClick={handleCloseModal}><FiX size="20px" color="#aaa"/></button>
            <header><h1>Solicitação</h1></header>
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
}

export default ModalRequest