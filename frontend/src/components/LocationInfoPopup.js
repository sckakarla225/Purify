import React from 'react';

export const LocationInfoPopup = ({ name, rank, totalRank, violations, percentile}) => {
    return (
        <div>
            <div className="row">
                <h1>Native Name</h1>
                <p>{name}</p>
            </div>
            <div className="row">
                <p>Rank</p>
                <p>{rank} / {totalRank}</p>
            </div>
            <div className="row">
                <p># of Violations</p>
                <p>{violations}</p>
            </div>
        </div>
    )
}
