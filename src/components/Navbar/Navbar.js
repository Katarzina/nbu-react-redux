import React, { Component } from 'react';
//import logo from './logo.svg'
import './Navbar.css'
import Rate from '../../components/Rate'
import Converter from '../../containers/Converter'
import Banks from '../../containers/Banks'
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
                <Link to={'/banks'}> Банки Украины </Link>
            </div>
            <Switch>
                <Route exact path="/" component={Rate} />
                <Route path="/converter" component={Converter}/>
                <Route path="/banks" component={Banks}/>
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
//
// class Navbar extends Component {
//
//     render() {
//         return (
//             <BrowserRouter>
//                 <div className="Navbar">
//                     <div className="mainMenu">
//                         <div><NavLink activeStyle={{color: 'red'}} to="/">Курс валют НБУ</NavLink></div>
//                         <div><NavLink activeStyle={{color: 'red'}} to="/converter">Конвертер валют</NavLink></div>
//                         <div><NavLink activeStyle={{color: 'red'}} to="/banks">Банки Украины</NavLink></div>
//                     </div>
//                     <Switch>
//                         <Route exact path="/" component={Rate} />
//                         <Route path="/converter" component={Converter}/>
//                         <Route path="/banks" component={Banks}/>
//                     </Switch>
//                 </div>
//             </BrowserRouter>
//         )
//     }
// }
//
// export default Navbar