import React, { useState, useContext } from 'react'; 
import { Link } from 'react-router-dom';
import '../App.css';

// UI
import Drawer from '@material-ui/core/Drawer';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

// COMPONENTS
import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { LocationInfoPopup } from '../components/LocationInfoPopup';
import { Legend } from '../components/Legend';
import logo from '../logo.svg';
import redWater from './red_water_icon.png'; 
import greenWater from './green_water_icon.png'; 
import yellowWater from './yellow_water_icon.png'; 
import grayWater from './gray_water_icon.png'; 

// CONTEXT
import { WaterContext } from '../context/WaterContext';
import { requirePropFactory } from '@material-ui/core';


export const LeafletMap = () => {
    const { locations } = useContext(WaterContext); 
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedLocationID, setSelectedLocationID] = useState("");

    const determineRisk = (percentile) => {
        if (percentile === 0) {
            const grayIcon = new L.Icon({
                iconUrl: grayWater, 
                iconSize: [25, 35], 
            });
            
            return grayIcon; 
        } else if (percentile >= 60) {
            const redIcon = new L.Icon({
                iconUrl: redWater, 
                iconSize: [25, 35], 
            });

            return redIcon; 
        } else if (percentile <= 60 & percentile >= 10) {
            const yellowIcon = new L.Icon({
                iconUrl: yellowWater, 
                iconSize: [25, 35], 
            });
            
            return yellowIcon; 
        } else if (percentile <= 10) {
            const greenIcon = new L.Icon({
                iconUrl: greenWater, 
                iconSize: [25, 35], 
            });
            
            return greenIcon; 
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
            
            <div className="map-info-container">
                <div>
                    <div className="row">
                        <MenuRoundedIcon
                            style={{ fontSize: 30, marginLeft: 15, marginTop: 10 }}
                            onClick={() => setMenuOpen(true)}
                        ></MenuRoundedIcon>
                    </div>
                    <div className="row">
                        <img src={logo} className="menu-logo" />
                        <h1 className="menu-header">PURIFY</h1>
                    </div>
                    <p style={{ textAlign: "center", marginTop: 20 }}>CA Water Data Challenge</p>
                    <Legend />
                </div>
            </div>

            <MapContainer center={[36.7783, -119.4179]} zoom={6} className="leaflet-map-container">
                <TileLayer
                    url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}@2x.png?key=O6Gasq5pOk061crD9m5G"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {locations ? Object.values(locations).map((location) => {
                    const currentIndex = Object.values(locations).indexOf(location);
                    const locationID = Object.keys(locations)[currentIndex]; 

                    if (location["Latitude"] === null) {
                        return ""
                    } else {
                        return (
                            <Marker 
                                key={locationID}
                                position={[location["Latitude"], location["Longitude"]]}
                                onClick={() => {
                                    setSelectedLocation(location);
                                    setSelectedLocationID(location["PWSID"]);
                                    console.log(location);
                                    console.log(locationID);
                                }}
                                icon={determineRisk(location["Percentile"])}
                            >
                                <Popup>
                                    <LocationInfoPopup 
                                        name={location["Native Name"]} 
                                        rank={location["Rank"]}
                                        totalRank={location["Total Rank"]}
                                        violations={location["Native Violations"]}
                                        selectedLocationID={location["PWSID"].toString()}
                                    />
                                </Popup>
                            </Marker>
                        )
                    }
                }) : ""}
                {/* {selectedLocation && (
                    <Popup
                        position={[selectedLocation["Latitude"], selectedLocation["Longitude"]]}
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
                )} */}
            </MapContainer>
        </div>
    )
}
