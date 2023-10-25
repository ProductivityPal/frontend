import React, { useState, useContext } from 'react';
import './NextTaskView.css';

type NextTaskProps = {
    taskName: string;
    startTime: Date;
    endTime?: Date;
}

export function NextTaskView(props: NextTaskProps) {
    return (
        <div className='TaskPanelContainer'>
            <p>Your next task:</p>
            <h2>{props.taskName}</h2>
                <p className="TimeLabel">11:30AM - 12:30AM</p>
        </div>
    );
}