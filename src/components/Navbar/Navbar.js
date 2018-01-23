import React from 'react';
import RateLoad from '../../containers/Rate/RateLoad'
import BanksLoad from '../../containers/Banks/BanksLoad'
import {Switch, Route, BrowserRouter, NavLink} from 'react-router-dom'
import {PropTypes} from 'prop-types'

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
                <Link to={'/nbu-react-redux/'}> Курс валют НБУ </Link>
                <Link to={'/nbu-react-redux/converter'}> Конвертер валют </Link>
                <Link to={'/nbu-react-redux/balance'}> Платежный баланс Украины </Link>
            </div>
            <Switch>
                <Route exact path="/nbu-react-redux/" component={RateLoad} />
                <Route path="/nbu-react-redux/converter" component={RateLoad} />
                <Route path="/nbu-react-redux/balance" component={BanksLoad} />
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
