import React from 'react';
import '../App.css';

export const StandingPlace = ({ rank, violationName, violationAmount }) => {
    return (
        <div className="violation-container">
            <p 
                style={{ display: "inline-block" }}
                className="violation-name"
            >
                {violationName} - 
            </p>
            <p 
                className="violation-amount"
            >
                {violationAmount}
            </p>
        </div>
    )
}
