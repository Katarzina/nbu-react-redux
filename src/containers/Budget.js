import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import BudgetCurrent from '../components/Budget'
import Loading from '../components/Loading/Loading'
import Error from '../components/Error/Error'
import { isLoaded } from '../reducer/loading'
import { fetchApi } from '../action/index'


class Budget extends Component {

    static propTypes = {
        rate: PropTypes.object
    }

    componentDidMount() {
        const {isLoaded, balance: {isLoading} = {}, fetchApi} = this.props
        console.log(isLoaded,isLoading)
        if (!isLoaded && !isLoading) fetchApi()
    }

    render() {
        const {isLoaded, rate: {error, current, isInvalid, isLoading} = {}} = this.props
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
                <BudgetCurrent balance={current} />
            </div>
        );
    }
}

export default connect(({loading, balance}) => ({
    isLoaded : isLoaded(loading),
    balance
}),{fetchApi})(Budget)

