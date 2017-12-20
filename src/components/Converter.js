import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Currency from './Currency'
import { updateAmount, updateCurrency } from '../action'
import { USD, EUR, RUB, UAH, ARRAY_CURRENCY } from '../constants'

function Eur( current, amount, currency ) {

    this.currency = EUR

    this.rate = getCurrencyRate(current, this.currency)

    this.rateCurrency = (currency === UAH) ? 1 : getCurrencyRate(current, currency)

    this.calculate = (this.rateCurrency * amount / this.rate ).toFixed(2)

}

function Usd( current, amount, currency ) {

    this.currency = USD

    this.rate = getCurrencyRate(current, this.currency)

    this.rateCurrency = (currency === UAH) ? 1 : getCurrencyRate(current, currency)

    this.calculate = (this.rateCurrency * amount / this.rate ).toFixed(2)

}

function Uah( current, amount, currency ) {

    this.currency = UAH

    this.rate = (currency === UAH) ? 1 : getCurrencyRate(current, currency)

    this.calculate = (this.rate * amount).toFixed(2)

}

function Rub( current, amount, currency ) {

    this.currency = RUB

    this.rate = getCurrencyRate(current, this.currency)

    this.rateCurrency = (currency === UAH) ? 1 : getCurrencyRate(current, currency)

    this.calculate = (amount === 0) ? '0.00' : ((amount / this.rate ) * this.rateCurrency ).toFixed(2)

}

const createCurrencyList = (arr) => (
    arr.map((currency) => (
        <option className='option' key={currency} value={currency}>{currency}</option>
    ))
);

const getCurrencyRate = (arr , currency) => {
    if (currency === UAH) return 0.00
    const result = arr.filter( (item) => {
        return (item.cc === currency)
    })
    return (result[0].rate == null) ? 0.00 : result[0].rate
}

class Converter extends Component {
    static propTypes = {
        updateCurrency: PropTypes.func,
        updateAmount: PropTypes.func,
        current: PropTypes.array,
        currency : PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired
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
       // const arrayCurrency = choiceArrayCurrency(ARRAY_CURRENCY,currency)

        let UahFactory = new Uah(current, amount, currency);
        let UsdFactory = new Usd(current, amount, currency);
        let EurFactory = new Eur(current, amount, currency);
        let RubFactory = new Rub(current, amount, currency);

        return (
            <div>
            <form onChange={this.onChangeHandler}>
                <input type="text" placeholder="0.00" pattern="[.0-9]*" />
            </form>
            <select name="currency" value={currency} onChange={this.handleChangeCurrency}>
                {currencySelect}
            </select>
            <div><h4>Результат</h4>
                { (currency !== EurFactory.currency) ?
                    ( <Currency value = {EurFactory.calculate} currency={EurFactory.currency}
                                rate = {EurFactory.rate} /> ) : (<p></p>)
                }
                { (currency !== UsdFactory.currency) ?
                    ( <Currency value = {UsdFactory.calculate} currency={UsdFactory.currency}
                                rate = {UsdFactory.rate} /> ) : (<p></p>)
                }
                { (currency !== UahFactory.currency) ?
                    ( <Currency value = {UahFactory.calculate} currency={UahFactory.currency}
                                rate = {UahFactory.rate} /> ) : (<p></p>)
                }
                { (currency !== RubFactory.currency) ?
                    ( <Currency value = {RubFactory.calculate} currency={RubFactory.currency}
                                rate = {RubFactory.rate} /> ) : (<p></p>)
                }
            </div>
            </div>
        )
    }
}

export default connect(({rate}) => ({
    rate
}),{updateAmount, updateCurrency})(Converter)