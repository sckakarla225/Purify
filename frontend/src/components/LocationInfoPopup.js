import React from 'react';

export const LocationInfoPopup = ({ name, rank, totalRank, violations, percentile}) => {
    return (
        <div>
            <div className="row">
                <h1>Native Name</h1>
                <h1>{name}</h1>
            </div>
            <div className="row">
                <h1>Rank</h1>
                <h1>{rank} / {totalRank}</h1>
            </div>
            <div className="row">
                <h1># of Violations</h1>
                <h1>{violations}</h1>
            </div>
        </div>
    )
}
