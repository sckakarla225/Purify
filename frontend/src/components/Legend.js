import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

// COMPONENTS
import greenIcon from '../images/green_water_icon.png'; 
import yellowIcon from '../images/yellow_water_icon.png';
import redIcon from '../images/red_water_icon.png';

export const Legend = () => {

    return (
        <div className="legend-container">
            <div className="row">
                <img src={redIcon} style={{ height: 80, width: 60, display: "inline-block" }} />
                <p style={{ display: "inline-block" }}>Relatively High Risk</p>
            </div>
            <div className="row">
                <img src={yellowIcon} style={{ height: 80, width: 60, display: "inline-block" }} />
                <p style={{ display: "inline-block" }}>Relatively Moderate Risk</p>
            </div>
            <div className="row">
                <img src={greenIcon} style={{ height: 80, width: 60, display: "inline-block" }} />
                <p style={{ display: "inline-block" }}>Relatively Low Risk</p>
            </div>
        </div>
    )
}

