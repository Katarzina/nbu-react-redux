import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { updateRate } from '../action'
import {connect} from 'react-redux'
import { USD, EUR, RUB, ARRAY_MAIN_CURRENCY } from '../constants'

import {stateSelector, currentSelector} from '../reducer/rate'

/**
* Filter rate data by currency
*/

const choiceCurrency = (rates, arrayCurrency) => {
    return rates.filter( (rate) => {
        for (let i = 0; i < arrayCurrency.length; i++) {
            if (rate.cc === arrayCurrency[i]) {
                return true;
            }
        }
       return false
    })
}

class RateCurrent extends Component {
    static propTypes = {
        current: PropTypes.array,
        rate : PropTypes.object,
        updateRate: PropTypes.func
    }

    sorted = { сс: true, txt: true, r030: true, rate: true  }

    sort(type) {
        const { current, updateRate } = this.props;

        // get sorting order
        const isSorted = this.sorted[type];

       // console.log(isSorted)

        // set direction
        let direction = isSorted ? 1 : -1;

        // create new data array for update state
        // and make sorting
        const sorted = [].slice.call(current).sort((a, b) => {
            // чтобы сортировка всегда была одинаковой учтём все условия
            // функция может вернуть 0, 1 или -1, в зависимости от возвращаемого
            // значения метод массивов sort сделает свой выбор
            if (a[type] === b[type]) { return 0; }
            return a[type] > b[type] ? direction : direction * -1;
        })
        this.sorted[type] = !isSorted;

        updateRate(sorted)

    }

    render() {

        const { current, condition } = this.props
        let rateCurrency = (condition) ? choiceCurrency( current, ARRAY_MAIN_CURRENCY) : current

        return (
            <div>
                <table className="currency-table">
                    <thead>
                    <tr>
                        <th onClick={() => this.sort('r030')}><span className="title" title="Отсортировать">Код</span></th>
                        <th className="title" onClick={() => this.sort('cc')}>Валюта</th>
                        <th className="title" onClick={() => this.sort('txt')}>Название </th>
                        <th className="title" onClick={() => this.sort('rate')}>Курс</th>
                        <th>Дата</th>
                    </tr>
                    </thead>
                    <tbody>
                {rateCurrency.map(( exchange) => {
                if ((exchange.cc === USD || exchange.cc === EUR || exchange.cc === RUB) && !condition) {
                    return <tr className="currencyRed" key={exchange.r030}>
                        <td className="rate">{exchange.r030}</td>
                        <td className="rate">{exchange.cc}</td>
                        <td className="rate">{exchange.txt}</td>
                        <td className="rate">{exchange.rate}</td>
                        <td className="rate">{exchange.exchangedate}</td>
                    </tr>
                } else {
                    return <tr key={exchange.r030}>
                        <td className="rate">{exchange.r030}</td>
                        <td className="rate">{exchange.cc}</td>
                        <td className="rate">{exchange.txt}</td>
                        <td className="rate">{exchange.rate}</td>
                        <td className="rate">{exchange.exchangedate}</td>
                    </tr>
                }

                })}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default connect((state) => ({
   rate: stateSelector(state),
   current : currentSelector(state)
}), {updateRate})(RateCurrent)

