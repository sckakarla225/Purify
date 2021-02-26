import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

// COMPONENTS
import greenIcon from '../images/green_water_icon.png'; 
import yellowIcon from '../images/yellow_water_icon.png';
import redIcon from '../images/red_water_icon.png';
import grayIcon from '../images/gray_water_icon.png'; 

export const Legend = () => {

    return (
        <div className="legend-container">
            <h1 className="legend-title" >WATER QUALITY RANK</h1>
            <div className="row">
                <img src={redIcon} className="legend-icon" />
                <p className="legend-description" >
                    Relatively High Risk
                </p>
            </div>
            <div className="row">
                <img src={yellowIcon} className="legend-icon"  />
                <p className="legend-description">
                    Relatively Moderate Risk
                </p>
            </div>
            <div className="row">
                <img src={greenIcon} className="legend-icon"  />
                <p className="legend-description">
                    Relatively Low Risk
                </p>
            </div>
            <div className="row">
                <img src={grayIcon} className="legend-icon" />
                <p className="legend-description">
                    NO DATA FOUND
                </p>
            </div>
        </div>
    )
}

