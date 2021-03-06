import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchApi, updateDay, updateMonth, updateYear } from '../../action'
import { BASE_URL, MONTHS, RATE_LINK_DATE, RATE } from '../../constants'
import { years , days } from '../../share/share'

const createYearList = (array) => (
    array.map((year) => (
        <option className='option' key={year} value={year}>{year}</option>
    ))
);

const createMonthList = (array) => (
    array.map((month, index) => (
        <option className='option' key={month} value={index}>{month}</option>
    ))
);
const createDaysList = (array) => (
    array.map((day) => (
        <option className='option' key={day} value={day}>{day}</option>
    ))
);

class Interval extends Component {

    static propTypes = {
        fetchApi: PropTypes.func,
        updateDay: PropTypes.func,
        updateMonth: PropTypes.func,
        updateYear: PropTypes.func,
        rate : PropTypes.object,
    }

    getCorrectMonth = (month) => (
        (month < 10) ? '0'+ month : month
    )

	onClickHandler = (ev) => {

        let {rate: {day, month, year} = {}} = this.props
        const correctMonth = this.getCorrectMonth(++month)
        this.props.fetchApi(BASE_URL + RATE_LINK_DATE + year + correctMonth + day + '&json', RATE)

        return false
    }

    handleChangeDay = ( {target : {value}} ) => {
        this.props.updateDay(value);

        return false;
    }

    handleChangeMonth = ({target : {value}}) => {
        this.props.updateMonth(value);

        return false
    }

    handleChangeYear = ({target : {value}}) => {
        this.props.updateYear(value)
        return false;
    }


    render() {
        const {rate: {day, month, year} = {}} = this.props,
              daysSelect = createDaysList(days()),
              monthsSelect = createMonthList(MONTHS),
              yearsSelect = createYearList(years())
		return (
            <div>
                <select name="day" value={day} onChange={this.handleChangeDay}>
                    {daysSelect}
                </select>

                <select name="month" value={month} onChange={this.handleChangeMonth}>
                    {monthsSelect}
                </select>

                <select name="year" value={year} onChange={this.handleChangeYear}>
                    {yearsSelect}
                </select>

                <button onClick={this.onClickHandler}>Показать</button>

            </div>
		)
	}
}

export default connect(({rate}) => ({
    rate
}),{
    fetchApi,
    updateDay,
    updateMonth,
    updateYear,
})(Interval)