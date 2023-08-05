import React from 'react';
import './App.css';
import WeekViewCalendar from './components/Calendar/WeekViewCalendar';
import { TaskContainerView } from './components/TaskView/TaskContainerView';
import { NavigationMenu } from './components/NavigationMenu/NavigationMenu';
import { Grid } from '@mui/material';
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';
import { useContext, useState } from 'react';
import { addTask, moveTask, setTasks, TasksCalendarContext } from './utils/tasksCalendarContext';
import { CurrentTaskPanel } from './components/CurrentTaskPanel/CurrentTaskPanel';
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import CalendarPage from './pages/CalendarPage';


 function App() {

  // const [calendar, setCalendar] = useState({ tasksList: [] });
  // const calendarContext = { calendar, moveTask: moveTask(setCalendar), addTask: addTask(setCalendar), setTasks: setTasks(setCalendar) }

  return (
    <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegistrationPage} />
        <Route path="/calendar" Component={CalendarPage} />
  </Routes>
  );
}

export default App;
