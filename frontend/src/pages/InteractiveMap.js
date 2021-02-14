import React, { useState, useContext, useEffect } from 'react';
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
import { Legend } from '../components/Legend';
import SvgIcon from '@material-ui/core/SvgIcon';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import greenIcon from '../images/green_water_icon.png'; 
import yellowIcon from '../images/yellow_water_icon.png';
import redIcon from '../images/red_water_icon.png';

// CONTEXT
import { WaterContext } from '../context/WaterContext';

export const InteractiveMap = (props) => {
    const { locations, getLocations } = useContext(WaterContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [viewport, setViewport] = useState({
        latitude: 36.7783, 
        longitude: -119.4179, 
        zoom: 5, 
        width: "100vw", 
        height: "100vh",
    });
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedLocationID, setSelectedLocationID] = useState("");

    const determineRisk = (percentile) => {
        if (percentile >= 60) {
            return (
                <img src={redIcon} style={{ height: 30 }} />
            )
        } else if (percentile <= 60 & percentile >= 10) {
            return (
                <img src={yellowIcon} style={{ height: 30 }} />
            )
        } else if (percentile <= 10) {
            return (
                <img src={greenIcon} style={{ height: 30 }} />
            )
        } else {
            return "Error"
        }
    }

    return (
        <div>
           <Drawer 
                anchor='left' 
                open={menuOpen} 
                onClose={() => setMenuOpen(false)}
                style={{ overflow: 'hidden' }}
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
                    <p 
                        className="menu-water-header"
                        style={{ textAlign: "center", marginTop: 40, fontSize: 14 }}
                    >
                        CA Water Data Challenge
                    </p>
                    <p 
                        className="menu-names"
                        style={{ textAlign: "center", margin: 15, fontSize: 14 }}
                    >
                        Ansh Motiani, Aditya Gupta, <br /> Samhith Kakarla
                    </p>
                </div>
            </Drawer>
            <ReactMapGL 
                {...viewport}
                mapboxApiAccessToken="pk.eyJ1Ijoic2tha2FybGEiLCJhIjoiY2tra2R6OXd6MDFlczJwbGpydzQ4anluYyJ9.N10YB_-af_8C_VwmNxyqYw"
                mapStyle="mapbox://styles/skakarla/ckkke1moj2q2h17qqrot5m99a"
                onViewportChange={(viewport) => setViewport(viewport)}
            >
                <MenuRoundedIcon
                    style={{ fontSize: 50, marginLeft: 30, marginTop: 10 }}
                    onClick={() => setMenuOpen(false)}
                ></MenuRoundedIcon>
                <Legend />
                {locations ? Object.values(locations).map((location) => {
                    const currentIndex = Object.values(locations).indexOf(location);
                    const locationID = Object.keys(locations)[currentIndex]; 
                    if (location["Latitude"] === null) {
                        return ""
                    } else {
                        return (
                            <Marker key={locationID} latitude={location["Latitude"]} longitude={location["Longitude"]}>
                                <IconButton color="primary" disableFocusRipple={true} onClick={() => {
                                    setSelectedLocation(location); 
                                    setSelectedLocationID(location["PWSID"]);
                                    console.log(location);
                                    console.log(locationID);
                                }}>
                                    {determineRisk(location["Percentile"])}
                                </IconButton>
                            </Marker>
                        )
                    }
                }) : ""}
                {selectedLocation ? (
                    <Popup
                        latitude={selectedLocation["Latitude"]}
                        longitude={selectedLocation["Longitude"]}
                        onClose={() => {
                        setSelectedLocation(null);
                        }}
                    >
                        <LocationInfoPopup 
                            name={selectedLocation["Native Name"]} 
                            rank={selectedLocation["Rank"]}
                            totalRank={selectedLocation["Total Rank"]}
                            violations={selectedLocation["Native Violations"]}
                            selectedLocationID={selectedLocationID.toString()}
                        />
                    </Popup>
                ) : null}
            </ReactMapGL>
        </div>
    )
}
