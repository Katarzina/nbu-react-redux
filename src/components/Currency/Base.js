import {EUR, RUB} from "../../constants";
import get from 'lodash/get';

class BaseCurrency {
    currency = ''
    rate = () => {
    }
    calculate = () => {
    }
}

const CURRENCY_TYPES = [
    USD_CURRENCY,
    EUR_CURRENCY,
    RUB_CURRENCY,
    UAH_CURRENCY
];

const
    USD_CURRENCY = 'USD',
    BASE_CURRENCY = 'USD',
    EUR_CURRENCY = 'EUR',
    RUB_CURRENCY = 'RUB',
    UAH_CURRENCY = 'UAH';


const BASE_CURRENCY_VALUE = '0.00';

class CurrencyRate extends BaseCurrency {

    current = [];
    currency = BASE_CURRENCY;
    amount = 0;


    getRate = () => {

        if (BASE_CURRENCY === this.currency) {
            return BASE_CURRENCY_VALUE;
        }

        const res = this.current.filter(({cc}) => (
            cc === this.currency
        ))

        return get(res, '0.rate') === null
            ? BASE_CURRENCY_VALUE
            : get(res, '0.rate')
    }

    getCurrencyRate = () => {
        if(UAH_CURRENCY === this.currency) {
            return 1;
        }

        return this.getRate()
    }

    calculate = () => (
        ( (this.rateCurrency * this.amount) / this.getRate() ).toFixed(2)
    )
}

class CarrencyEur extends CurrencyRate {

    currency = EUR_CURRENCY;


    constructor(current, amount, currency){
        super();

        this.current = current;
        this.amount = amount;
        this.currency = currency;

    }


}

class CurrencyFactory {
    static run(currencyType) {
        switch (currencyType) {
            case (USD_CURRENCY) :
                break
            case (EUR_CURRENCY) :
                break
            case (RUB_CURRENCY) :
                break
            case (UAH_CURRENCY) :
                break
        }
    }
}

export {
    BaseCurrency
}