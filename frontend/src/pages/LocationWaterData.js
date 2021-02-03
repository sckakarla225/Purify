import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import logo from '../logo.svg';
import PropTypes from 'prop-types';
import '../App.css';

// UI
import Drawer from '@material-ui/core/Drawer';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

// COMPONENTS
import { Menu } from '../components/Menu';
import { requirePropFactory } from '@material-ui/core';

export const LocationWaterData = () => {
    const { locationID } = useParams();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <Drawer anchor='left' open={menuOpen} onClose={() => setMenuOpen(false)}>
                <div>
                    <div className="row">
                        <MenuRoundedIcon
                            style={{ fontSize: 50 }}
                            onClick={() => setMenuOpen(false)}
                        ></MenuRoundedIcon>
                    </div>
                    <div className="row">
                        <img src={logo} className="menu-logo" />
                        <h1 className="menu-header">PURIFY</h1>
                        <div className="menu-buttons-container">
                            <Link to="/" className="menu-buttons">HOME</Link>
                            <Link to="/map" className="menu-buttons">WATER MAP</Link>
                        </div>
                    </div>
                    <p>CA Water Data Challenge</p>
                </div>
            </Drawer>
            <MenuRoundedIcon
                style={{ fontSize: 50 }}
                onClick={() => setMenuOpen(true)}
            ></MenuRoundedIcon>
            <h1>LOCATION WATER DATA</h1> 
            <Link to="/">GO TO HOME</Link>
        </div>
    )
}
