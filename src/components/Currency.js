import React from 'react'
import PropTypes from 'prop-types'

const Current = (props) => {
	const {value, currency, rate} = props
		return  <p>
                <input readOnly="readonly" value= {value} size="10" type="text" />
                <span>{currency}</span>
                <input value={rate} size="4" type="text" />
            </p>
}

Current.PropTypes = {
    value: PropTypes.number,
    currency: PropTypes.string,
    rate: PropTypes.number
}

export default Current