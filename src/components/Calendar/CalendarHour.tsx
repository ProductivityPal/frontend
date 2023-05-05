import React, { useState } from 'react';
import './CalendarHour.css';

export default function CalendarHour() {
    return (
        <div className="calendar-hour">
            <div className='fifteen-min-block'></div>
            <div className='fifteen-min-block'></div>
            <div className='fifteen-min-block'></div>
            <p className='divider'></p>
        </div>   
    );
}
