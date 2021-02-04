import React from 'react';

export const LocationInfoPopup = ({ name, rank, totalRank, violations, percentile}) => {
    return (
        <div>
            <div className="row">
                <h1 className="popup-header">Native Name:</h1>
                <p className="popup-info">{name}</p>
            </div>
            <div className="row">
                <p className="popup-header">Rank:</p>
                <p className="popup-info">{rank} / {totalRank}</p>
            </div>
            <div className="row">
                <p className="popup-header"># of Violations:</p>
                <p className="popup-info">{violations}</p>
            </div>
        </div>
    )
}
