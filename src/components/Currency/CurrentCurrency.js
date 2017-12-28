import React from 'react'
import PropTypes from 'prop-types'

const currentCurrency = (props) => {
	const {value, currency, rate} = props
		return <p>
                <input readOnly="readonly" value= {value} size="10" type="text" />
                <span>{currency}</span>
                <input readOnly="readonly" value={rate} size="4" type="text" />
            </p>
}

currentCurrency.propTypes = {
    value: PropTypes.string,
    currency: PropTypes.string,
    rate: PropTypes.number
}

export default currentCurrency