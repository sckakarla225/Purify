import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// UI
import Drawer from '@material-ui/core/Drawer';

// COMPONENTS
import { Menu } from '../components/Menu';

export const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <Drawer anchor='right' open={menuOpen} onClose={() => setMenuOpen(false)}>
                <Menu />
            </Drawer>
            <button onClick={() => setMenuOpen(true)}>MENU</button>
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
