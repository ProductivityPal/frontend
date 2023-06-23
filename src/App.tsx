import React from 'react';
import './App.css';
import WeekViewCalendar from './components/Calendar/WeekViewCalendar';
import { TaskContainerView } from './components/TaskView/TaskContainerView';
import { NavigationMenu } from './components/NavigationMenu/NavigationMenu';
import { Grid } from '@mui/material';
import './App.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function App() {
  return (
    <div className="App">
              <DragDropContext onDragEnd={(result, provided) => {
            console.log("onDragEnd");
        }}>
            
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
          Right panel
        </Grid>
      </Grid>
      </DragDropContext>

    </div>
  );
}

export default App;
