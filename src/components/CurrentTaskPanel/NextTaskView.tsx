import React, { useState, useContext } from 'react';
import './NextTaskView.css';

export function NextTaskView() {
    return (
        <div className='TaskPanelContainer'>
            <p>Your next task:</p>
            <h2>Prepare Presentation</h2>
                <p className="TimeLabel">11:30AM - 12:30AM</p>
        </div>
    );
}