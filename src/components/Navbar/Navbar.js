import React from 'react';
//import './Navbar.css'
import Rate from '../../components/Rate'
import Converter from '../../containers/Converter/ConverterLoad'
import Banks from '../../containers/Banks/Banks'
import {Switch, Route, BrowserRouter, NavLink} from 'react-router-dom'
import {PropTypes} from 'prop-types';

const Link = ({color = 'red', to, children}) => (
    <div><NavLink activeStyle={{color: color}} to={to}>{children}</NavLink></div>
);
Link.propTypes = {
    color: PropTypes.string,
    to: PropTypes.string,
    children: PropTypes.string
}
Link.defaultProps = {
    color: 'red',
    to: '/',
    children : ''
}

const Navbar = () => (
    <BrowserRouter>
        <div className="Navbar">
            <div className="mainMenu">
                <Link to={'/'}> Курс валют НБУ </Link>
                <Link to={'/converter'}> Конвертер валют </Link>
                <Link to={'/balance'}> Платежный баланс Украины </Link>
            </div>
            <Switch>
                <Route exact path="/" component={Rate} />
                <Route path="/converter" component={Converter}/>
                <Route path="/balance" component={Banks}/>
            </Switch>
        </div>
    </BrowserRouter>
);

Navbar.propTypes = {};
Navbar.defaultProps = {};

export {
    Navbar,
    Link
}
