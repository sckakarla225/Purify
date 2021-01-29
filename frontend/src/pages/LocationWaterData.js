import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// UI
import Drawer from '@material-ui/core/Drawer';

// COMPONENTS
import { Menu } from '../components/Menu';

export const LocationWaterData = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <Drawer anchor='right' open={menuOpen} onClose={() => setMenuOpen(false)}>
                <Menu />
            </Drawer>
            <button onClick={() => setMenuOpen(true)}>MENU</button>
            <h1>LOCATION WATER DATA</h1> 
            <Link to="/">GO TO HOME</Link>
        </div>
    )
}
