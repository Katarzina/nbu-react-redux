import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { updateRate } from '../../action'
import {connect} from 'react-redux'
import { ARRAY_MAIN_CURRENCY } from '../../constants'
import {stateSelector, currentSelector} from '../../reducer/rate'

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

const Rate = ({children}) => (
    <td className="rate">{children}</td>
)

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
                {rateCurrency.map(({r030,cc,txt,rate,exchangedate}) => {
                    const isColorRed = ARRAY_MAIN_CURRENCY.includes(cc) && !condition
                    return <tr className={(isColorRed)?"currencyRed":""} key={r030}>
                            {[r030,cc,txt,rate,exchangedate].map((item, index) => (
                                <Rate key={index}>{item}</Rate>
                            ))}
                        </tr>

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

