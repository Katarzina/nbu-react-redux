import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ARRAY_CURRENCY } from '../constants'
//import {connect} from 'react-redux'
//import {increment} from '../AC'

class Budget extends Component {
    static propTypes = {
    }

    render() {
        const { budget } = this.props
        //let rateCurrency = choiceCurrency(rate, ARRAY_CURRENCY)
          console.log(budget)
        return (
            <div className="WeatherCurrent">
                {budget.map(function( indicators, index ) {
                    return <div key={index}>
                        <div className="rate">{indicators.dt}</div>
                        <div className="rate">{indicators.txt}</div>
                        <div className="rate">{indicators.txten}</div>
                        <div className="rate">{indicators.value}</div>
                    </div>
                })}
            </div>
        )
    }


}

export default Budget