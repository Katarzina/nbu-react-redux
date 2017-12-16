import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { updateAmount, updateCurrency } from '../action'
import { USD, EUR, RUB, UAH, ARRAY_CURRENCY } from '../constants'

const choiceArrayCurrency = (arrayCurrency, currency) => {
    return arrayCurrency.filter( (arr) => {
            return arr !== currency
    })
}




const calculateResult = (current, amount, currency) => {

    const arrayCurrency = choiceArrayCurrency(ARRAY_CURRENCY,currency)
    let cur = (currency === UAH) ? 1 : getCurrencyRate(current, currency)
    let uahAmount = (cur * amount).toFixed(2)
    let usd = getCurrencyRate(current, USD)
    let eur = getCurrencyRate(current, EUR)
    let rub = getCurrencyRate(current, RUB)
    let usdAmount = (cur * amount / usd ).toFixed(2)
    let eurAmount = (cur * amount / eur).toFixed(2)
    let rubAmount = (amount === 0) ? '0.00' : ((amount / rub) * cur ).toFixed(2)
    return arrayCurrency.map( (arr) => {
        switch (arr) {
            case USD:
                return [USD, usd , usdAmount]
            case EUR:
                return [EUR, eur , eurAmount]
            case UAH:
                return [UAH, cur , uahAmount]
            case RUB:
                return [RUB, rub , rubAmount]
            default:
                return [USD, usd , usdAmount]
        }
    })
}

const createCurrencyList = (arr) => (
    arr.map((currency) => (
        <option className='option' key={currency} value={currency}>{currency}</option>
    ))
);

const getCurrencyRate = (arr, currency) => {
    const result = arr.filter( (item) => {
        return (item.cc === currency)
    })
    return (result[0].rate === undefined) ? 0.00 : result[0].rate
}

class Converter extends Component {
    static propTypes = {
        updateCurrency: PropTypes.func,
        updateAmount: PropTypes.func,
        current: PropTypes.array,
        currency : PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired
    }

    onChangeHandler = ({target : {value}}) => {
        this.props.updateAmount(value);
        return false
    }

    handleChangeCurrency = ({target : {value}}) => {
        this.props.updateCurrency(value);
        return false
    }

    render() {
        const {rate: {current, amount, currency} = {}} = this.props;
        const currencySelect = createCurrencyList(ARRAY_CURRENCY)
        const arrayResult = calculateResult( current, amount, currency )

        return (
            <div>
            <form onChange={this.onChangeHandler}>
                <input type="text" placeholder="0.00" />
            </form>
            <select name="currency" value={currency} onChange={this.handleChangeCurrency}>
                {currencySelect}
            </select>
            <div>
                <h4>Результат</h4>
                <p>
                    <input readOnly="readonly" value={ arrayResult[0][2]} size="10" type="text" />
                    <span>{arrayResult[0][0]}</span>
                    <input value={arrayResult[0][1]} size="4" type="text" />
                </p>
                <p>
                    <input readOnly="readonly" value={ arrayResult[1][2]} size="10" type="text" />
                    <span>{arrayResult[1][0]}</span>
                    <input value={arrayResult[1][1]} size="4" type="text" />
                </p>
                <p>
                    <input readOnly="readonly" value={ arrayResult[2][2]} size="10" type="text" />
                    <span>{arrayResult[2][0]}</span>
                    <input value={arrayResult[2][1]} size="4" type="text" />
                </p>
            </div>
            </div>
        )
    }
}

export default connect(({rate}) => ({
    rate
}),{updateAmount, updateCurrency})(Converter)