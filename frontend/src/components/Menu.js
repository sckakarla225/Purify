import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';

// UI
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

export const Menu = ({ closeMenu }) => {
    return (
        <div>
            <div className="row">
                <MenuRoundedIcon
                    style={{ fontSize: 50 }}
                ></MenuRoundedIcon>
            </div>
            <div className="row">
                <img src={logo} className="menu-logo" />
                <h1 className="menu-header">PURIFY</h1>
                <div className="menu-buttons-container">
                    <Link 
                        to="/"
                        className="menu-buttons"
                    >
                        HOME
                    </Link>
                    <Link 
                        to="/map"
                        className="menu-buttons"
                    >
                        WATER MAP
                    </Link>
                </div>
            </div>
            <p>CA Water Data Challenge</p>
        </div>
    )
}
