import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/Login'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
            </Switch>
        </BrowserRouter>
    )
}