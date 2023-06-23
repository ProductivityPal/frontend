import React, { useState } from 'react';
import { Grid } from '@mui/material';
import './CalendarDay.css';
import CalendarHour from './CalendarHour';
import { Droppable } from 'react-beautiful-dnd';

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
                        <Droppable droppableId={"calendarHour"+index} key={index}>
                        {(provided) => (
                            <div className="calendar-hour" ref={provided.innerRef} {...provided.droppableProps}>
                                {provided.placeholder}
                            <CalendarHour/>
                            </div>

                        )}
                    </Droppable>
                    ))}

                </div>
            </div>
        </div>
    );
}