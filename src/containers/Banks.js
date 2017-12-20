import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import BanksCurrent from '../components/Banks'
import SearchBar from '../components/SearchBar'
import Loading from '../components/Loading/Loading'
import Error from '../components/Error/Error'
import { isLoaded } from '../reducer/loading'
import { fetchApi } from '../action/index'
import { BANKS_LINK, BANKS } from '../constants'


class Banks extends Component {

    static propTypes = {
        rate: PropTypes.object
    }

    componentDidMount() {
        const {isLoaded, balance: {isLoading} = {}, fetchApi} = this.props
        console.log(isLoaded,isLoading)
        if (!isLoaded && !isLoading) fetchApi(BANKS_LINK,BANKS)
    }

    render() {
        const {isLoaded, banks: {error, current, isInvalid, isLoading} = {}} = this.props
       // console.log(current)
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
            <div className="Rate">
                <SearchBar />
                <BanksCurrent />
            </div>
        );
    }
}

export default connect(({loading, banks}) => ({
    isLoaded : isLoaded(loading),
    banks
}),{fetchApi})(Banks)

