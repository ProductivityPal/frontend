import React, { useState, useContext, useEffect } from 'react';
import { CurrentTaskView } from './CurrentTaskView';
import { NextTaskView } from './NextTaskView';
import './CurrentTaskPanel.css';
import { fetchData } from '../../utils/fetchUtils';
import { Task, converDbTaskToTask } from '../../types/Task';


const fetchCalendarTasks = fetchData<Task[]>('http://localhost:8080/calendar/6');
export function CurrentTaskPanel() {
    const [currentTask, setCurrentTask] = useState<Task>()
    const [nextTask, setNextTask] = useState<Task>()

    useEffect(() => {

        let now = new Date()

        // Function to filter out past tasks
        const filterPastTasks = (tasks: any) => {
            return tasks.filter((task: any) => new Date(task.date) > now);
        };

        // Function to sort tasks by date
        const sortTasksByDate = (tasks: Task[]) => {
            return tasks.sort((a: Task, b: Task) => {
                const dateA = a.startDate ? new Date(a.startDate) : new Date();
                const dateB = b.startDate ? new Date(b.startDate) : new Date();
                return dateA.getTime() - dateB.getTime();
            });
        };

        // get calendar tasks
        // sort by date, and filtering out past tasks
        // check if the first event is happening now
        // get the first / second task from the list ( based on condition before) for nextTaskComponent
        fetchCalendarTasks((calendarTasksList: Task[]) => {
            calendarTasksList.map((calendarTask: any) => converDbTaskToTask(calendarTask.task))
            const sortedTasks = filterPastTasks(sortTasksByDate(calendarTasksList))

            if (sortedTasks.length > 0 && new Date(sortedTasks[0].startDate) <= now) {
                // Get the second task if the first is happening now
                setCurrentTask(sortedTasks[0])
                console.log("CURRENT TASK: " + (currentTask ? currentTask.name : ""))
                setNextTask(sortedTasks[1] || null);
                console.log("Next TASK: " + (nextTask ? nextTask.name : ""))

              } else {
                // Get the first task
                setNextTask(sortedTasks[0] || null);
                console.log("Next TASK: " + (nextTask ? nextTask.name : ""))

            }
            // TODO: add check for next task of the day / you are caught up for the day!
    })
    }, []);

    return (
        <div className="current-task-panel">
            <CurrentTaskView />
            <NextTaskView />
        </div>
    );
}