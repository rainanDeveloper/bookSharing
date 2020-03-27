import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/SignUp" component={SignUp}/>
            </Switch>
        </BrowserRouter>
    )
}