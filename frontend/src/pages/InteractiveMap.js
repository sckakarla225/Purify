import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// UI
import Drawer from '@material-ui/core/Drawer';

// COMPONENTS
import { Menu } from '../components/Menu';

export const InteractiveMap = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <Drawer anchor='right' open={menuOpen} onClose={() => setMenuOpen(false)}>
                <Menu />
            </Drawer>
            <button onClick={() => setMenuOpen(true)}>MENU</button>
            <h1>INTERACTIVE MAP</h1>
            <Link to="/data/1">GO TO LOCATION DATA</Link>
        </div>
    )
}
