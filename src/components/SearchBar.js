import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateFilter } from '../action'
import {stateSelectorBanks, currentSelectorBanks} from '../reducer/banks'


class SearchBar extends Component {

    PropTypes = {
        updateFilter: PropTypes.func,
        data: PropTypes.array
    }

    dataSearch = e => {

        const value = e.target.value.toLowerCase();
        const { updateFilter, banks: {data} = {} } = this.props

        const filter = data.filter( title => {
            return title.txt.toLowerCase().includes(value);
        });
        updateFilter(filter);
    };

    render() {
        return (
            <div>
                <input
                    value={this.value}
                    type="text"
                    placeholder="Search title..."
                    onChange={this.dataSearch}
                />
            </div>
        );
    }
};

export default connect((state) => ({
    banks: stateSelectorBanks(state),
    current : currentSelectorBanks(state)
}),{updateFilter})(SearchBar)