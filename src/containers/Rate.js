import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import RateCurrent from '../components/RateCurrent'
import Loading from '../components/Loading/Loading'
import Error from '../components/Error/Error'
import { isLoaded } from '../reducer/loading'
import { fetchApi } from '../action/index'
import { RATE_LINK, RATE } from '../constants'


class Rate extends Component {

    static propTypes = {
        rate: PropTypes.object.isRequired
    }

    componentDidMount() {
        const {isLoaded, rate: {isLoading} = {}, fetchApi} = this.props
        console.log(isLoaded,isLoading)
        if (!isLoaded && !isLoading) fetchApi( RATE_LINK, RATE )
    }

    render() {
        const {isLoaded, rate: {error, current, isInvalid, isLoading} = {}} = this.props
       // console.log('isInvalid',isInvalid, error, isLoading)
        if (isLoading) {
            return (
                <h2><Loading /></h2>
            )
        }

        if (isInvalid) {
            return (
                <div><Error error={error} /></div>
            )
        }

       if ((!current) && !isLoaded ) {
            return null
        }

        return (
            <div className="Rate">
                <RateCurrent />
            </div>
        );
    }
}

export default connect(({loading, rate}) => ({
    isLoaded : isLoaded(loading),
    rate
}),{fetchApi})(Rate)
