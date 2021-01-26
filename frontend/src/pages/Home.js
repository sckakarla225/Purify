import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Home = () => {
    return (
        <div>
            <h1>HOME</h1>
            <Link to="/map">GO TO MAP</Link>
        </div>
    )
}

// PROPS MANAGEMENT

// Home.defaultProps = {
//     title: "Purify",
//     data: [],
// }

// Home.propTypes = {
//     title: PropTypes.string, 
//     waterData: PropTypes.array,
// }
