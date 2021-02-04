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
            <h1 className="legend-title" style={{ fontSize: 18, textAlign: "center"}}>WATER QUALITY RANK</h1>
            <div className="row">
                <img src={redIcon} style={{ height: 50, width: 40, display: "inline-block" }} />
                <p className="legend-description" style={{ 
                    display: "inline-block", 
                    fontSize: 16, 
                    verticalAlign: 'middle',
                    marginTop: -15,
                    marginLeft: 10,
                }}>
                    Relatively High Risk
                </p>
            </div>
            <div className="row">
                <img src={yellowIcon} style={{ height: 50, width: 40, display: "inline-block" }} />
                <p className="legend-description" style={{ 
                    display: "inline-block",
                    marginTop: -15,
                    verticalAlign: 'middle',
                    fontSize: 16, 
                    marginLeft: 10,
                }}>
                    Relatively Moderate Risk
                </p>
            </div>
            <div className="row">
                <img src={greenIcon} style={{ height: 50, width: 40, display: "inline-block" }} />
                <p className="legend-description" style={{ 
                    display: "inline-block",
                    marginTop: -15,
                    verticalAlign: 'middle',
                    fontSize: 16, 
                    marginLeft: 10,
                }}>
                    Relatively Low Risk
                </p>
            </div>
        </div>
    )
}

