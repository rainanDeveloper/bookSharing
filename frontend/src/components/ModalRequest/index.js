import React, {useState, useEffect} from 'react'
import Autocomplete from 'react-autocomplete'
import api from '../../services/api'
import {FiX, FiSave} from 'react-icons/fi'

import './styles.css'

function ModalRequest(){

    const [authorList, setAuthorList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [bookList, setBookList] = useState([])

    const [book, setBook] = useState('')
    const [bookId, setBookId] = useState('')
    const [author, setAuthor] = useState('')
    const [authorId, setAuthorId] = useState('')
    const [category, setCategory] = useState('')
    const [categoryId, setCategoryId] = useState('')

    useEffect(()=>{
      api.get('/category', {}).then(response=>{
        let catArray = []
        const categories = response.data
        categories.map(category=>{
          catArray.push({value: category.id, label: category.cat_desc})
        })
        setCategoryList(catArray)
      })
    }, [])

    useEffect(()=>{
      api.get('/author', {}).then(response=>{
        let authArray = []
        const authors = response.data
        authors.map(author=>{
          authArray.push({value: author.id, label: author.auth_name})
        })
        setAuthorList(authArray)
      })
    }, [])

    useEffect(()=>{
      api.get(`/book/search/?author=${authorId}&category=${categoryId}`, {}).then(response=>{
        let bookArray = []
        const books = response.data
        books.map(book=>{
          bookArray.push({value: book.id, label: book.bk_title})
        })
        setBookList(bookArray)
      })
    }, [authorId, categoryId])

    function handleCloseModal(){
        const modal = document.querySelector("div div.modal")

        modal.classList.remove('active')
    }

    return (
        <div className="modalContent">
            <button className="close" onClick={handleCloseModal}><FiX size="20px" color="#aaa"/></button>
            <header><h1>Solicitação</h1></header>
            <div className="formSolicitacao">
                <form>
                    <div className="input-group">
                        <Autocomplete
                        inputProps={{ placeholder: 'Categoria'}}
                        items={categoryList}
                          shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                          getItemValue={item => item.label}
                        renderItem={(item, highlighted) =>
                            <div
                              key={item.id}
                              style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                            >
                              {item.label}
                            </div>
                          } value={category} onChange={event=>setCategory(event.target.value)} onSelect={value => setCategory(value)} placeholder="Categoria"/>
                        <Autocomplete
                        inputProps={{ placeholder: 'Autor'}}
                        items={authorList}
                          shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                          getItemValue={item => item.label}
                        renderItem={(item, highlighted) =>
                            <div
                              key={item.id}
                              style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                            >
                              {item.label}
                            </div>
                          }
                        value={author} onChange={event=>setAuthor(event.target.value)} onSelect={value => setAuthor(value)} placeholder="Autor"/>
                    </div>
                    <Autocomplete
                    inputProps={{ placeholder: 'Livro', required: true}}
                    wrapperProps={{style: {width:"100%"}}}
                    items={bookList}
                      shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                      getItemValue={item => item.label}
                    renderItem={(item, highlighted) =>
                        <div
                          key={item.id}
                          style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                        >
                          {item.label}
                        </div>
                      } value={book} onChange={event=>setBook(event.target.value)} onSelect={value => setBook(value)} placeholder="Livro"/>
                    <button><FiSave size="20px" color="white"/> Salvar</button>
                </form>
            </div>
        </div>
    )
}

export default ModalRequest