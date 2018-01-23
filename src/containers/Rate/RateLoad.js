import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SetInterval from './SetInterval'
import RateCurrent from './RateCurrent'
import ConverterCurrent from '../Converter/Converter'
import {Loading} from '../../components/Loading/Loading'
import {Error} from '../../components/Error/Error'
import { fetchApi } from '../../action/index'
import { BASE_URL, RATE_LINK, RATE } from '../../constants'

class Rate extends Component {

    static propTypes = {
        rate: PropTypes.object.isRequired,
        fetchApi: PropTypes.func,
        error: PropTypes.string,
        currencyRate: PropTypes.array
    }

    componentDidMount() {
        const {rate: {currencyRate, isLoading } = {}, fetchApi} = this.props
        if (!currencyRate && !isLoading) fetchApi( BASE_URL + RATE_LINK, RATE )
    }

    render() {
        const {location: {pathname}, rate: {error, currencyRate, isInvalid, isLoading, isLoaded} = {}} = this.props
        if (!isLoaded && !isInvalid && isLoading) {
            return <h2><Loading /></h2>
        }

        if (isInvalid) {
            return <div><Error error={error} /></div>
        }

        if (!currencyRate) {
            return null
        }

        if (pathname === '/nbu-react-redux/converter') {
            return (
                <div className="Converter">
                    <ConverterCurrent />
                    <RateCurrent condition={true}/>
                </div>
            )
        }

        return (
            <div className="Rate">
                <SetInterval />
                <RateCurrent />
            </div>
        );

    }
}

export default connect(({rate}) => ({
    rate
}),{fetchApi})(Rate)

