import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';

export const Menu = () => {
    return (
        <div>
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
            <p>CA Water Data Challenge</p>
        </div>
    )
}
