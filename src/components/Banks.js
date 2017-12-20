import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {stateSelectorBanks, currentSelectorBanks} from '../reducer/banks'

import isNumber from 'lodash/isNumber';

//
// const sumValue = ((arrayValue, ifPositive) => {
//     let sum = 0;
//     arrayValue.forEach(function (elem) {
//         if (ifPositive) {
//             if (elem.t023 === "total" && elem.value > 0) {
//                 sum += elem.value;
//             }
//         } else {
//             if (elem.t023 === "total" && elem.value < 0) {
//                 sum += elem.value;
//             }
//         }
//     })
//     return sum
// })

const isTotal = (val) => val === 'total';

const sum = (arr) => (
    arr.reduce((acc, {to023, value}) => {
        if (isTotal(to023) && isNumber(value)) {
            return acc += value
        }
        return acc;
    }, 0)
);


const getIndicators = (current) => (
    current.map(({t023,txt, dt, value}) => {
        if(isTotal(t023) && value >= 0) {
            return(
                <tr key={txt}>
                    <td className="rate">{dt}</td>
                    <td className="rate">{txt.substring(0, 80)}</td>
                    <td className="rate">{value}</td>
                </tr>
            )
        }

        return (<tr/>)
    })
)
/*

{current.map(indicators => {
                        if (indicators.t023 === "total" && (indicators.value > 0 || indicators.value === 0)) {
                            return <tr key={indicators.txt}>
                                <td className="rate">{indicators.dt}</td>
                                <td className="rate">{indicators.txt.substring(0, 80)}</td>
                                <td className="rate">{indicators.value}</td>
                            </tr>
                        } else {
                            return <tr></tr>
                        }
                    })}

*/


const POSITIVE = true;


class Banks extends Component {
    static propTypes = {
        current: PropTypes.array,
        banks: PropTypes.object
    }

    static defaultProps = {
        current : [],
        banks : {}
    }

    render() {
        const {current} = this.props;

        const _indicatorsTemplate = getIndicators(current);
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
                    {_indicatorsTemplate}
                    <tr>
                        <td/>
                        <td>Total</td>
                        <td>{sum(current, POSITIVE)}</td>
                    </tr>
                    {_indicatorsTemplate}
                    <tr>
                        <td/>
                        <td>Total</td>
                        <td>{sum(current, !POSITIVE)}</td>
                    </tr>

                    </tbody>
                </table>
            </div>
        )
    }

}

export default connect((state) => ({
    banks: stateSelectorBanks(state),
    current: currentSelectorBanks(state)
}))(Banks)