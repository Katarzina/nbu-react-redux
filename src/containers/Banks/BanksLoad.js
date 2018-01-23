import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import BanksCurrent from './BanksFilter'
import SearchBar from './SearchBar'
import {Loading} from '../../components/Loading/Loading'
import {Error} from '../../components/Error/Error'
import {fetchApi} from '../../action/index'
import {BANKS_LINK, BANKS} from '../../constants'

class Banks extends Component {

    static propTypes = {
        banks: PropTypes.object,
        fetchApi: PropTypes.func,
        error: PropTypes.string,
        balance: PropTypes.array
    }

    componentDidMount() {
        const {banks: {balance, isLoading} = {}, fetchApi} = this.props
        if (!balance && !isLoading) fetchApi(BANKS_LINK, BANKS)
    }

    render() {
        const {banks: {error, balance, isInvalid, isLoading, isLoaded } = {}} = this.props

        if (!isLoaded && !isInvalid && isLoading) {
            return <h2><Loading /></h2>
        }

        if (isInvalid) {
            return <Error error={error}/>
        }

        if (!balance) {
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

export default connect(({banks}) => ({
    banks
}),{fetchApi})(Banks)

