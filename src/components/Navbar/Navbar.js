import React, { Component } from 'react';
//import logo from './logo.svg'
import './Navbar.css'
import Rate from '../../components/Rate'
import Converter from '../../containers/Converter'
import Budget from '../../containers/Budget'
import {Switch, Route, BrowserRouter, NavLink} from 'react-router-dom'

class Navbar extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="Navbar">
                    <div className="mainMenu">
                        <div><NavLink activeStyle={{color: 'red'}} to="/rate">Курс валют НБУ</NavLink></div>
                        <div><NavLink activeStyle={{color: 'red'}} to="/balance">Конвертер валют</NavLink></div>
                        <div><NavLink activeStyle={{color: 'red'}} to="/budget">Бюджет</NavLink></div>
                    </div>
                    <Switch>
                        <Route path="/rate" component={Rate}/>
                        <Route path="/converter" component={Converter}/>
                        <Route path="/budget" component={Budget}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Navbar