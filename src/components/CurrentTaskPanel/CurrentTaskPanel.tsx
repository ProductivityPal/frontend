import React, { useState, useContext, useEffect } from 'react';
import { CurrentTaskView } from './CurrentTaskView';
import { NextTaskView } from './NextTaskView';
import './CurrentTaskPanel.css';
import { fetchData } from '../../utils/fetchUtils';
import { CalendarTask, converDbTaskToTask } from '../../types/Task';


const fetchCalendarTasks = fetchData<CalendarTask[]>('http://localhost:8080/calendar/7');
export function CurrentTaskPanel() {
    const [currentTask, setCurrentTask] = useState<CalendarTask>()
    const [nextTask, setNextTask] = useState<CalendarTask>()

    function completeTask() {

    }

    useEffect(() => {

        let now = new Date()

        // Function to filter out past tasks
        const filterPastTasks = (tasks: any) => {
            return tasks.filter((task: any) => new Date(task.startDate) > now);
        };

        // Function to sort tasks by date
        const sortTasksByDate = (tasks: any[]) => {
            return tasks.sort((a: any, b: any) => {
                const dateA = new Date(a.startDate);
                const dateB = new Date(b.startDate);
                return dateA.getTime() - dateB.getTime();
            });
        };

        // get calendar tasks
        // sort by date, and filtering out past tasks
        // check if the first event is happening now
        // get the first / second task from the list ( based on condition before) for nextTaskComponent
        fetchCalendarTasks((calendarTasksList: CalendarTask[]) => {
            calendarTasksList.map((calendarTask: any) => converDbTaskToTask(calendarTask.task))
            const sortedTasks = sortTasksByDate(calendarTasksList).filter((task: any) => new Date(task.startDate) > now)
            console.log("SORTED Calendar Tasks: ", sortedTasks)
            console.log("NOW", now)
            // console.log("FILTERED TAsks:", sortedTasks.filter((task: any) => new Date(task.startDate) > now))


            // if now >= startTime && now <= endTime
            if (sortedTasks.length > 0 && new Date(sortedTasks[0].startDate) <= now) {
                // Get the second task if the first is happening now
                setCurrentTask(sortedTasks[0])
                console.log("CURRENT TASK: " + (currentTask ? currentTask.task.name : ""))
                setNextTask(sortedTasks[1] || null);
                console.log("Next TASK: " + (nextTask ? nextTask.task.name : ""))

              } else {
                // Get the first task
                setNextTask(sortedTasks[0] || null);
                console.log("Next TASK: " + (sortedTasks[0].task.name))

            }
            // TODO: add check for next task of the day / you are caught up for the day!
    })
    }, []);

    return (
        <div className="current-task-panel">
            {currentTask && <CurrentTaskView taskName={currentTask.task.name} startTime={currentTask.startTime} onComplete={() => completeTask()}/>}
            {nextTask && <NextTaskView taskName={nextTask.task.name} startTime={nextTask.startTime}/>}
        </div>
    );
}