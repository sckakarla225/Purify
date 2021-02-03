import React, { createContext, useState } from 'react';
import data from '../waterdata_3.json';

export const WaterContext = createContext();

export const WaterContextProvider = (props) => {
    const [locations, setLocations] = useState({});

    const getLocations = () => {
        setLocations(data);
    }

    return (
        <WaterContext.Provider value={{ locations, getLocations }}>
            { props.children }
        </WaterContext.Provider>
    )
}