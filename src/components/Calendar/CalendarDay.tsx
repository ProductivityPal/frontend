import React, { useState } from 'react';
import { Grid } from '@mui/material';
import './CalendarDay.css';
import CalendarHour from './CalendarHour';

type CalendarDayProps = {
    date: Date,
    isToday?: boolean;
}

export default function CalendarDay(calendarDayProps: CalendarDayProps) {
    
    return (
        <div className="calendar-day">
            <div className="calendar-day__body">
                <div className="calendar-day__body__events">
                    <p className='divider'></p>
                    {Array.from(Array(23)).map((_, index) => (
                        <CalendarHour/>
                    ))}

                </div>
            </div>
        </div>
    );
}