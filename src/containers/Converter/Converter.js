import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CurrentCurrency from '../../components/Currency/CurrentCurrency'
import { updateAmount, updateCurrency } from '../../action'
import { ARRAY_CURRENCY } from '../../constants'
import { currencyFactory } from '../../components/Currency/Base'

const createCurrencyList = (arrayCurrency) => (
    arrayCurrency.map((currency) => (
        <option className='option' key={currency} value={currency}>{currency}</option>
    ))
);

const selectFactory = (currencyRate, amount, currency) => {
    let factory = [],
        result = [],
        dataFactory = {}
    ARRAY_CURRENCY.forEach((currencyItem) => {
      if(currency !== currencyItem) {
        factory = currencyFactory(currencyItem, currencyRate, amount, currency)
        dataFactory = {
          calculate: factory.calculate(),
          currency: factory.currency,
          rate: factory.rate()
        }
        result.push(dataFactory)
      }
    })
    return result
}

export class Converter extends Component {
    static propTypes = {
      updateCurrency: PropTypes.func,
      updateAmount: PropTypes.func,
      currencyRate: PropTypes.array,
      currency: PropTypes.string,
      amount: PropTypes.number
    }

    static defaultProps = {
      current: [],
      currency : '',
      amount: 0
    }

    onChangeHandler = (ev) => {
      if (ev.target.validity.valid) this.props.updateAmount(ev.target.value);
      return false
    }

    handleChangeCurrency = ({target: {value}}) => {
      this.props.updateCurrency(value);
      return false
    }

    render() {
      const {rate: {currencyRate, amount, currency} = {}} = this.props,
            currencySelect = createCurrencyList(ARRAY_CURRENCY),
            resultFactory = selectFactory(currencyRate, amount, currency)
      return (
        <div>
          <form onChange={this.onChangeHandler}>
            <input type="text" placeholder="0.00" pattern="[.0-9]*" />
          </form>
          <select name="currency" value={currency} onChange={this.handleChangeCurrency}>
            {currencySelect}
          </select>
          <div><h4>Результат</h4>
            {resultFactory.map((item, index) => {
              return <CurrentCurrency key={item.currency} value={item.calculate} currency={item.currency}
                                    rate={item.rate}/>
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