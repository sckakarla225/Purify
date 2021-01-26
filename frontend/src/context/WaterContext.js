import React, { createContext, useState } from 'react';

export const WaterContext = createContext();

export const WaterContextProvider = (props) => {

    return (
        <WaterContext.Provider>
            { props.children }
        </WaterContext.Provider>
    )
}