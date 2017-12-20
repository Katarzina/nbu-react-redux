import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {stateSelectorBanks, currentSelectorBanks} from '../reducer/banks'

const sumValue = ((arrayValue, ifPositive) => {
    let sum = 0;
    arrayValue.forEach( function (elem) {
        if (ifPositive) {
            if (elem.t023 === "total" && elem.value > 0) {
                sum += elem.value;
            }
        } else {
            if (elem.t023 === "total" && elem.value < 0) {
                sum += elem.value;
            }
        }
    })
    return sum
    })

class Banks extends Component {
    static propTypes = {
        current: PropTypes.array,
    }

    render() {
        const { current }  = this.props
        let ifPositive = true;
        return (
            <div>
                <table className="currency-table">
                    <thead>
                    <tr>
                        <th className="title">Дата</th>
                        <th className="title">Назва</th>
                        <th className="title">Значение млн.дол</th>
                    </tr>
                    </thead>
                    <tbody>
                    { current.map( indicators => {
                        if (indicators.t023 === "total" && (indicators.value > 0 || indicators.value === 0 )) {
                        return <tr key={indicators.txt}>
                        <td className="rate">{indicators.dt}</td>
                        <td className="rate">{indicators.txt.substring(0, 80)}</td>
                        <td className="rate">{indicators.value}</td>
                        </tr>
                        } else {
                            return <tr></tr>
                        }
                    })}
                    <tr><td></td><td>Total</td><td>{sumValue(current, ifPositive)}</td></tr>
                    {current.map( indicators => {
                        if (indicators.t023 === "total" && indicators.value < 0 ) {
                            return <tr key={indicators.txt}>
                                <td className="rate">{indicators.dt}</td>
                                <td className="rate">{indicators.txt.substring(0, 80)}</td>
                                <td className="rate">{indicators.value}</td>
                            </tr>
                        } else {
                            return <tr></tr>
                        }

                    })}
                    <tr><td></td><td>Total </td><td>{sumValue(current, !ifPositive)}</td></tr>

                    </tbody>
                </table>
            </div>
        )
    }

}

export default connect((state) => ({
    banks: stateSelectorBanks(state),
    current : currentSelectorBanks(state)
}))(Banks)