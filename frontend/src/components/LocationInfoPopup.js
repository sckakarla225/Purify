import React from 'react';
import { Link } from 'react-router-dom';

export const LocationInfoPopup = (props) => {
    return (
        <div>
            <div className="row">
                <h1 className="popup-header">Native Name:</h1>
                <p className="popup-info">{props.name}</p>
            </div>
            <div className="row">
                <p className="popup-header">Rank:</p>
                <p className="popup-info">{props.rank} / {props.totalRank}</p>
            </div>
            <div className="row">
                <p className="popup-header"># of Violations:</p>
                <p className="popup-info">{props.violations}</p>
            </div>
            <Link
                className="explore-data-button" 
                to={`/data/${props.selectedLocationID}`}
            >
                EXPLORE DATA!
            </Link>
        </div>
    )
}
