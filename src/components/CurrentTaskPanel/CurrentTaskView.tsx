import React, { useState, useContext } from 'react';
import './CurrentTaskView.css';
import { Button } from '@mui/material';

type CurrentTaskProps = {
    taskName?: string;
    subTasks?: any[];
    startTime: Date;
    endTime?: Date;
    onComplete: () => void;
}

export function CurrentTaskView(props: CurrentTaskProps) {
    const buttonStyle = {
        backgroundColor: '#F8DEB3',
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
                <h1>{props.taskName}</h1>
                <p className="TimeLabel">{props.startTime.getHours()}</p>
            </div>
            <div>---------------------</div>
            <li>Choose color palette</li>
            <li>Divide into sections</li>
            <li>Create components</li>
            <div className='ButtonContainer'>
                <Button sx={buttonStyle}>Start Timer</Button>
                {/* <Button sx={buttonStyle}>Add subtask</Button> */}
                <Button sx={buttonStyle}>✔️</Button>
            </div>
        </div>
        
    );
}