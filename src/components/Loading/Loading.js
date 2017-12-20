import React from 'react'
import {PropTypes} from "prop-types";




const propTypes = {
    error: PropTypes.string
};
const defaultProps = {
    error: ''
}

// get error from props
const Loading = ({error}) => (
    <div className="loading">Loading...</div>

);

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;
