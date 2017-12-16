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
    return arrayCurrency.map( (arr) => {
        let rateCurrency = getCurrencyRate(current, arr)
        switch (arr) {
            case USD:
            case EUR:
                return { currency: arr, rate: rateCurrency , amount: (cur * amount / rateCurrency ).toFixed(2) }
            case UAH:
                return { currency: arr, rate: cur , amount: (cur * amount).toFixed(2) }
            case RUB:
                return { currency: arr, rate: rateCurrency , amount: (amount === 0) ? '0.00' : ((amount / rateCurrency ) * cur ).toFixed(2) }
            default:
                return
        }
    })

}

const createCurrencyList = (arr) => (
    arr.map((currency) => (
        <option className='option' key={currency} value={currency}>{currency}</option>
    ))
);

const getCurrencyRate = (arr, currency) => {
    if (currency === UAH) return 0.00
    const result = arr.filter( (item) => {
        return (item.cc === currency)
    })
    return (result[0].rate == undefined) ? 0.00 : result[0].rate
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
                {arrayResult.map(( result ) => {
                return <p>
                    <input readOnly="readonly" value={ result.amount} size="10" type="text" />
                    <span>{result.currency}</span>
                    <input value={result.rate} size="4" type="text" />
                </p>
                })}
            </div>
            </div>
        )
    }
}

export default connect(({rate}) => ({
    rate
}),{updateAmount, updateCurrency})(Converter)