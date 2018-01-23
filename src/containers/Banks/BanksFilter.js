import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {stateSelectorBanks, currentSelectorBanks} from '../../reducer/banks'

import isNumber from 'lodash/isNumber';

const isTotal = (val) => val === 'total';

const sum = (arr) => (
    arr.reduce((acc, {t023, value}) => {
        if (isTotal(t023) && isNumber(value)) {
            return acc += value
        }
        return acc;
    }, 0)
);

const getIndicators = (current) => (
    current.filter(({t023}) => isTotal(t023))
        .map(({txt,dt,value}) => (
        <tr key={txt}>
            {[dt, txt, value].map((item, index) => (
                <td key={index}>{item}</td>
            ))}
        </tr>
    ))
)

class BanksFilter extends Component {
    static propTypes = {
        balance: PropTypes.array,
        banks: PropTypes.object
    }

    static defaultProps = {
        balance: [],
        banks: {}
    }

    render() {
        const {balance} = this.props;
        return (
            <div>
                <h2>Платежный баланс Украины</h2>
                <table className="currency-table">
                    <thead>
                    <tr>
                        <th className="title">Дата</th>
                        <th className="title">Назва</th>
                        <th className="title">Значение млн.дол</th>
                    </tr>
                    </thead>
                    <tbody>
                    {getIndicators(balance)}
                    <tr>
                        <td/>
                        <td>Total</td>
                        <td>{sum(balance)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect((state) => ({
    banks: stateSelectorBanks(state),
    balance: currentSelectorBanks(state)
}))(BanksFilter)