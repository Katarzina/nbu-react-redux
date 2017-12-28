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

    constructor(current, amount, selectedCurrency) {
        this.current = current;
        this.amount = amount;
        this.selectedCurrency = selectedCurrency;
    }

    rate = () => ( getCurrencyRate(this.current, this.currency) )

    getSelectedRate = () => (
        (UAH_CURRENCY === this.selectedCurrency) ? 1 : getCurrencyRate(this.current, this.selectedCurrency)
    )

    calculate = () => (
        ((this.getSelectedRate() * this.amount) / this.rate()).toFixed(2)
    )
}

class CurrencyEur extends CurrencyRate {

    currency = EUR_CURRENCY;

}

class CurrencyUsd extends CurrencyRate {

    currency = USD_CURRENCY;

}

class CurrencyUah extends CurrencyRate {

    currency = UAH_CURRENCY;

    rate = () => (
        (this.selectedCurrency === UAH_CURRENCY) ? 1 : getCurrencyRate(this.current, this.selectedCurrency)
    )

    calculate = () => (
        (this.rate() * this.amount).toFixed(2)
    )
}

class CurrencyRub extends CurrencyRate {

    currency = RUB_CURRENCY;

    calculate = () => (
        ((this.amount / this.rate()) * this.getSelectedRate()).toFixed(2)
    )
}

const currencyFactory = (currencyType, current, amount, currency) => {
        let factory = {}
        switch (currencyType) {
            case (USD_CURRENCY) :
                factory = new CurrencyUsd(current, amount, currency);
                break

            case (EUR_CURRENCY) :
                factory = new CurrencyEur(current, amount, currency);
                break

            case (RUB_CURRENCY) :
                factory = new CurrencyRub(current, amount, currency);
                break

            case (UAH_CURRENCY) :
                factory = new CurrencyUah(current, amount, currency);
                break
            default :
                break
        }
    return factory
}

export {currencyFactory}
