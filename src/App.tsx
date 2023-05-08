import React from 'react';
import './App.css';
import WeekViewCalendar from './components/Calendar/WeekViewCalendar';
import { TaskContainerView } from './components/TaskView/TaskContainerView';
import { Grid } from '@mui/material';
import './App.css';

function App() {
  return (
    <div className="App">
      <Grid container spacing={0}>
        <Grid xs={0.5} md={0.5}>
          Nav
        </Grid>
        <Grid xs={4} md={2}>
          <TaskContainerView/>
        </Grid>
        <Grid xs={2} md={7}>
          <WeekViewCalendar />
        </Grid>
        <Grid xs={4} md={2}>
          Right panel
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
