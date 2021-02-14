import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import PropTypes from 'prop-types';
import '../App.css';

// UI
import Drawer from '@material-ui/core/Drawer';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// COMPONENTS
import { Menu } from '../components/Menu';

// CONTEXT
import { WaterContext } from '../context/WaterContext';

export const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { getLocations } = useContext(WaterContext);

    useEffect(() => {
        getLocations(); 
    }, []);

    return (
        <div className="home-page-container">
            <Drawer 
                anchor='left' 
                open={menuOpen} 
                onClose={() => setMenuOpen(false)}
            >
                <div>
                    <div className="row">
                        <MenuRoundedIcon
                            style={{ fontSize: 30, marginLeft: 15, marginTop: 10 }}
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
                    <p style={{ textAlign: "center", marginTop: 50 }}>CA Water Data Challenge</p>
                    
                </div>
            </Drawer>
            <MenuRoundedIcon 
                onClick={() => setMenuOpen(true)}
                style={{ fontSize: 50, marginLeft: 30, marginTop: 10 }}
            ></MenuRoundedIcon>
            <h1 className="home-header-tag">
                Native American communities in California have a 30% higher risk of poor water quality than non-native communities.
            </h1>
            <div style={{ marginLeft: 80 }}>
                <iframe 
                    id="igraph" 
                    scrolling="no" 
                    style={{ border: "none", marginRight: 100 }} 
                    seamless="seamless" 
                    src="https://plotly.com/~amotiani22/33.embed" 
                    height="300" width="750"
                    logo="false"
                    link="false"
                    modebar="false"
                >
                </iframe>
            </div>
            <Link to="/map" className="home-button">
                SEE INTERACTIVE MAP 
                <NavigateNextIcon
                    style={{ fontSize: 30, marginLeft: 15 }}
                />
            </Link>
        </div>
    )
}
