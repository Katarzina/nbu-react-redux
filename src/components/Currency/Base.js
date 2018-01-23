//import React from 'react'
import {USD_CURRENCY, EUR_CURRENCY, RUB_CURRENCY, UAH_CURRENCY, NULL_CURRENCY_VALUE} from "../../constants";
import get from 'lodash/get';

const getCurrencyRate = (arr , currency) => {
    if (currency === UAH_CURRENCY) return NULL_CURRENCY_VALUE
    const result = arr.filter( ({cc}) => {
        return (cc === currency)
    })

    return !get(result, '0.rate')
        ? NULL_CURRENCY_VALUE
        : get(result, '0.rate')
}

class CurrencyRate {

    constructor(currency, currencyRate, amount, selectedCurrency) {
        this.currency = currency;
        this.currencyRate = currencyRate;
        this.amount = amount;
        this.selectedCurrency = selectedCurrency;
    }

    rate = () => ( getCurrencyRate(this.currencyRate, this.currency) )

    _getSelectedRate = () => (
        (UAH_CURRENCY === this.selectedCurrency) ? 1 : getCurrencyRate(this.currencyRate, this.selectedCurrency)
    )

    calculate = () => (
        ((this._getSelectedRate() * this.amount) / this.rate()).toFixed(2)
    )
}

class CurrencyUah extends CurrencyRate {

    rate = () => (
        (this.selectedCurrency === this.currency) ? 1 : getCurrencyRate(this.currencyRate, this.selectedCurrency)
    )

    calculate = () => (
        (this.rate() * this.amount).toFixed(2)
    )
}

class CurrencyRub extends CurrencyRate {

    calculate = () => (
        ((this.amount / this.rate()) * this._getSelectedRate()).toFixed(2)
    )
}

const currencyFactory = (currencyType, ...payload) => {
        let factory = {}
        switch (currencyType) {
            case (USD_CURRENCY) :
            case (EUR_CURRENCY) :
                factory = new CurrencyRate(currencyType,...payload);
                break

            case (RUB_CURRENCY) :
                factory = new CurrencyRub(currencyType,...payload);
                break

            case (UAH_CURRENCY) :
                factory = new CurrencyUah(currencyType,...payload);
                break
            default :
                return factory
        }
    return factory
}

export {currencyFactory}
