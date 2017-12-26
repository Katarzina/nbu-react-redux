import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ConverterCurrent from '../components/Converter'
import RateCurrent from '../components/RateCurrent'
import {Loading} from '../components/Loading/Loading'
import {Error} from '../components/Error/Error'
import { isLoaded } from '../reducer/loading'
import { fetchApi } from '../action/index'
import { BASE_URL, RATE_LINK, RATE } from '../constants'

class Converter extends Component {

    static propTypes = {
        rate: PropTypes.object
    }

    componentDidMount() {
        const {isLoaded, rate: {isLoading} = {}, fetchApi} = this.props
        console.log(isLoaded,isLoading)
        if (!isLoaded && !isLoading) fetchApi(BASE_URL + RATE_LINK, RATE)
    }

    render() {
        const {isLoaded, rate: {error, current, isInvalid, isLoading} = {}} = this.props
        if (isLoading) {
            return (
                <h2><Loading /></h2>
            )
        }

        if (isInvalid) {
            return (
                <Error error={error} />
            )
        }

       if ((!current) && !isLoaded) {
            return null
        }

        return (
            <div className="Converter">
                <ConverterCurrent />
                <RateCurrent condition={true} />
            </div>
        );
    }
}

export default connect(({loading, rate}) => ({
    isLoaded : isLoaded(loading),
    rate
}),{fetchApi})(Converter)

