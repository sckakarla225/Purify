import React, { useState, useContext } from 'react';
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

// CONTEXT
import { WaterContext } from '../context/WaterContext';

export const InteractiveMap = () => {
    const { locations } = useContext(WaterContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [viewport, setViewport] = useState({
        latitude: 36.7783, 
        longitude: -119.4179, 
        zoom: 14, 
        width: "100vw", 
        height: "100vh",
    });
    const [selectedLocation, setSelectedLocation] = useState(null);

    const renderLocations = () => {
        Object.values(locations).map((location) => {
            const currentIndex = Object.values(locations).indexOf(location);
            const locationID = Object.keys(locations)[currentIndex]; 
            return (
                <Marker key={locationID} latitude={location["Latitude"]} longitude={location["Longitude"]}>
                    {/* <IconButton color="primary" disableFocusRipple={true} onClick={() => {
                        setSelectedLocation(location); 
                    }}>
                        <ErrorIcon />
                    </IconButton> */}
                </Marker>
            )
        })
    };

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
                {locations ? renderLocations : ""}
                {selectedLocation ? (
                    <Popup
                        latitude={selectedLocation.latitude}
                        longitude={selectedLocation.longitude}
                        onClose={() => {
                        setSelectedLocation(null);
                        }}
                    >
                        <LocationInfoPopup />
                        <Link to={`/data/${selectedLocation.id}`}>SEE DATA!</Link>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </div>
    )
}
