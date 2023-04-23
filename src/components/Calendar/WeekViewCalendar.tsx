import React, { useState } from 'react';

export default function WeekViewCalendar() {
    let [todayDate, setTodayDate] = useState(new Date());
    let daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // todo: today as a separate component and the rest of the days together
    return (
        <div className="week-view-calendar">
            <div className="week-view-calendar__header"> 

            </div>
            <div className="week-view-calendar__table">
                TABLE
            </div>
        </div>
    );
}