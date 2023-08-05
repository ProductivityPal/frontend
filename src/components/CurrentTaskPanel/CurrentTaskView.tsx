import React, { useState, useContext } from 'react';
import './CurrentTaskView.css';
import { Button } from '@mui/material';

export function CurrentTaskView() {
    const buttonStyle = {
        backgroundColor: 'rgb(239, 204, 125)',
        color: 'white',
        width: '30%',
        'border-radius': '50px',
        'font-size': 'x-small',
        'margin-right': '2px',
        height: '30px',
        'line-height': '12px',
        // 'font-style': 'normal'
        'margin-top': '5px',
        'margin-bottom': '5px'


    }
    return (
        <div className='TaskPanelContainer'>
            <p>Your current task:</p>
            <div>
                <h1>Create UI</h1>
                <p className="TimeLabel">11:30AM - 12:30AM</p>
            </div>
            <div>---------------------</div>
            <li>Choose color palette</li>
            <li>Divide into sections</li>
            <li>Create components</li>
            <div className='ButtonContainer'>
                <Button sx={buttonStyle}>Start Timer</Button>
                <Button sx={buttonStyle}>Add subtask</Button>
                <Button sx={buttonStyle}>✔️</Button>
            </div>
        </div>
        
    );
}