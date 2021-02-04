import React from 'react';
import '../App.css';

export const StandingPlace = ({ violationName, violationAmount, nativeViolation }) => {
    const redStyle = {
        color: 'red', 
        fontWeight: 700, 
    }

    return (
        <div className="violation-container">
            <p 
                style={nativeViolation ? redStyle : {}}
                className="violation-name"
            >
                {violationName} - 
            </p>
            <p 
                className="violation-amount"
                style={nativeViolation ? redStyle : {}}
            >
                {violationAmount}
            </p>
        </div>
    )
}
