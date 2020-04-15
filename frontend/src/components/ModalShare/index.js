import Autocomplete from 'react-autocomplete'
import React, {useState, useEffect} from 'react'
import api from '../../services/api'
import {FiX, FiSave} from 'react-icons/fi'

import './styles.css'

function ModalShare(){

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
          catArray.push({id: category.id, label: category.cat_desc})
        })
        setCategoryList(catArray)
      })
    }, [])

    useEffect(()=>{
      api.get('/author', {}).then(response=>{
        let authArray = []
        const authors = response.data
        authors.map(author=>{
          authArray.push({id: author.id, label: author.auth_name})
        })
        setAuthorList(authArray)
      })
    }, [])

    useEffect(()=>{
      api.get(`/book/search/?author=${authorId}&category=${categoryId}`, {}).then(response=>{
        let bookArray = []
        const books = response.data
        books.map(book=>{
          bookArray.push({id: book.id, label: book.bk_title})
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
            <header><h1>Compartilhamento</h1></header>
            <div className="formCompartilhamento">
                <form>
                    <div className="input-group">
                        <Autocomplete
                        inputProps={{ placeholder: 'Categoria'}}
                        items={categoryList}
                          shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                          getItemValue={item => {return item.label+"|-|"+item.id}}
                        renderItem={(item, highlighted) =>
                            <div
                              key={item.id}
                              style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                            >
                              {item.label}
                            </div>
                          } value={category} onChange={event=>{
                            setCategory(event.target.value)
                            setCategoryId('')
                          }} onSelect={value => {
                            setCategory(value.replace(/^(.{1,})\|\-\|.{1,}$/g, '$1'))
                            setCategoryId(value.replace(/^.{1,}\|\-\|(.{1,})$/g, '$1'))
                            }}/>
                        <Autocomplete
                        inputProps={{ placeholder: 'Autor'}}
                        items={authorList}
                          shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                          getItemValue={item => {return item.label+"|-|"+item.id}}
                        renderItem={(item, highlighted) =>
                            <div
                              key={item.id}
                              style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                            >
                              {item.label}
                            </div>
                          }
                        value={author} onChange={event=>{
                          setAuthor(event.target.value)
                          setAuthorId('')
                        }} onSelect={value => {
                          setAuthor(value.replace(/^(.{1,})\|\-\|.{1,}$/g, '$1'))
                          setAuthorId(value.replace(/^.{1,}\|\-\|(.{1,})$/g, '$1'))
                          }}/>
                    </div>
                    <Autocomplete
                    inputProps={{ placeholder: 'Livro', required: true}}
                    wrapperProps={{style: {width:"100%"}}}
                    items={bookList}
                      shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                      getItemValue={item => {return item.label+"|-|"+item.id}}
                    renderItem={(item, highlighted) =>
                        <div
                          key={item.id}
                          data-item={item.id}
                          style={{ backgroundColor: highlighted ? '#eee' : 'white', padding: '10px'}}
                        >
                          {item.label}
                        </div>
                      } value={book} onChange={event=>setBook(event.target.value)} onSelect={value => {
                        setBook(value.replace(/^(.{1,})\|\-\|.{1,}$/g, '$1'))
                        setBookId(value.replace(/^.{1,}\|\-\|(.{1,})$/g, '$1'))
                        }}/>
                    <button><FiSave size="20px" color="white"/> Salvar</button>
                </form>
            </div>
        </div>
    )
}

export default ModalShare