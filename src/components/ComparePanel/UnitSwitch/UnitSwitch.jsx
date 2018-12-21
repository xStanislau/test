import React from 'react';
import './unitSwitch.css';

export const UnitSwitch = (props) => {
    return (
        <div className='unit-switch' onClick={props.handleUnitChange}>
            <div className='unit-switch__item'>IN</div>
            <div className='unit-switch__item'>CM</div>
        </div>
    )
};