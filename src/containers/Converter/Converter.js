import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CurrentCurrency from '../../components/Currency/CurrentCurrency'
import { updateAmount, updateCurrency } from '../../action'
import { ARRAY_CURRENCY, NULL_CURRENCY_VALUE, PATTERN } from '../../constants'
import { currencyFactory } from '../../components/Currency/Base'

const createCurrencyList = (arr) => (
    arr.map((currency) => (
        <option className='option' key={currency} value={currency}>{currency}</option>
    ))
);

class Converter extends Component {
    static propTypes = {
        updateCurrency: PropTypes.func,
        updateAmount: PropTypes.func,
        current: PropTypes.array,
        currency : PropTypes.string,
        amount: PropTypes.number
    }

    static defaultProps = {
        current: [],
        currency : '',
        amount: NULL_CURRENCY_VALUE
    }

    onChangeHandler = (ev) => {
        if (ev.target.validity.valid) this.props.updateAmount(ev.target.value);
        return false
    }

    handleChangeCurrency = ({target : {value}}) => {
        this.props.updateCurrency(value);
        return false
    }

    render() {
        const {rate: {current, amount, currency} = {}} = this.props;
        const currencySelect = createCurrencyList(ARRAY_CURRENCY)
        let factory = []

        return (
            <div>
            <form onChange={this.onChangeHandler}>
                <input type="text" placeholder={NULL_CURRENCY_VALUE.toFixed(2)} pattern={PATTERN} />
            </form>
            <select name="currency" value={currency} onChange={this.handleChangeCurrency}>
                {currencySelect}
            </select>
            <div><h4>Результат</h4>
                {ARRAY_CURRENCY.map((currencyItem,index) => {
                    if(currency !== currencyItem) {
                        factory = currencyFactory(currencyItem, current, amount, currency)
                        return <CurrentCurrency key={index} value={factory.calculate()} currency={factory.currency}
                        rate={factory.rate()} />
                    }
                    return null
                })
                }
            </div>
            </div>
        )
    }
}

export default connect(({rate}) => ({
    rate
}),{updateAmount, updateCurrency})(Converter)