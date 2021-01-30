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
            <Drawer 
                anchor='left' 
                open={menuOpen} 
                onClose={() => setMenuOpen(false)}
            >
                <Menu />
            </Drawer>
            <button onClick={() => setMenuOpen(true)}>MENU</button>
            <h1>HOME</h1>
            <iframe id="igraph" scrolling="no" style={{ border:"none" }} seamless="seamless" src="https://plotly.com/~amotiani22/33.embed" height="525" width="100%"></iframe>
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