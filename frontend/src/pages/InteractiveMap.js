import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import PropTypes from 'prop-types';
import '../App.css';

// UI
import Drawer from '@material-ui/core/Drawer';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

// COMPONENTS
import { Menu } from '../components/Menu';
import { LocationInfoPopup } from '../components/LocationInfoPopup';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

export const InteractiveMap = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [viewport, setViewport] = useState({
        latitude: 36.7783, 
        longitude: -119.4179, 
        zoom: 14, 
        width: "100vw", 
        height: "100vh",
    });
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locations, setLocations] = useState([]);

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
            <ReactMapGL 
                {...viewport}
                mapboxApiAccessToken="pk.eyJ1Ijoic2tha2FybGEiLCJhIjoiY2tra2Y1eDd5MGE0dTJ3cGR6dW00azFleSJ9.5uqzvYCVIra99ZGYP--NhQ"
                onViewportChange={(viewport) => setViewport(viewport)}
            >
                <MenuRoundedIcon
                    style={{ fontSize: 50 }}
                    onClick={() => setMenuOpen(false)}
                ></MenuRoundedIcon>
                {/* {locations.map((location) => (
                    <Marker key={location.id} latitude={location.coordinates[0]} longitude={location.coordinates[1]}>
                        <IconButton color="primary" disableFocusRipple={true} onClick={() => {
                            setSelectedLocation(location); 
                        }}>
                            <ErrorIcon />
                        </IconButton>
                    </Marker>
                ))} */}
                {/* {selectedLocation ? (
                    <Popup
                        latitude={selectedLocation.coordinates[0]}
                        longitude={selectedLocation.coordinates[1]}
                        onClose={() => {
                        setSelectedLocation(null);
                        }}
                    >
                        <LocationInfoPopup />
                    </Popup>
                ) : null} */}
            </ReactMapGL>
        </div>
    )
}
