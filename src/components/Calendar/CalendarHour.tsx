import React, { useState } from 'react';
import './CalendarHour.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default function CalendarHour() {
    return (
        <div className="calendar-hour">
            <div className='fifteen-min-block'></div>
            <div className='fifteen-min-block'></div>
            <div className='fifteen-min-block'></div>
            <p className='divider'></p>
        </div>

        // <div className="calendar-hour">
        //     <div className='fifteen-min-block'></div>
        //     <div className='fifteen-min-block'></div>
        //     <div className='fifteen-min-block'></div>
        //     <p className='divider'></p>
        // </div>   
    );
}
