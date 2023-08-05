import React from 'react';
// import './App.css';
import WeekViewCalendar from '../components/Calendar/WeekViewCalendar';
import { TaskContainerView } from '../components/TaskView/TaskContainerView';
import { NavigationMenu } from '../components/NavigationMenu/NavigationMenu';
import { Grid } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import { useContext, useState } from 'react';
import { addTask, moveTask, setTasks, TasksCalendarContext } from '../utils/tasksCalendarContext';
import { CurrentTaskPanel } from '../components/CurrentTaskPanel/CurrentTaskPanel';

 function CalendarPage() {

  const [calendar, setCalendar] = useState({ tasksList: [] });
  const calendarContext = { calendar, moveTask: moveTask(setCalendar), addTask: addTask(setCalendar), setTasks: setTasks(setCalendar) }

  return (
    <div className="App">
      <DragDropContext onDragEnd={(result, provided) => {
        if(result.source && result.destination) {
          try {
            calendarContext.moveTask(result.source, result.destination, parseInt(result.draggableId))
          } catch(e) {
            console.error("could not move task", e);
          }
        }
      }}>
        <TasksCalendarContext.Provider value={calendarContext}>
          <Grid container spacing={0}>
            <Grid xs={0.5} md={0.5}>
              <NavigationMenu />
            </Grid>
            <Grid xs={4} md={2}>
              <TaskContainerView />
            </Grid>
            <Grid xs={2} md={7}>
              <WeekViewCalendar />
            </Grid>
            <Grid xs={4} md={2}>
              <CurrentTaskPanel/>
            </Grid>
          </Grid>
        </TasksCalendarContext.Provider>
      </DragDropContext>
    </div>
  );
}

export default CalendarPage;
