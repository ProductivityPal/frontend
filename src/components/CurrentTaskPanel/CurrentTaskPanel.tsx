import React, { useState, useContext, useEffect } from 'react';
import { CurrentTaskView } from './CurrentTaskView';
import { NextTaskView } from './NextTaskView';
import './CurrentTaskPanel.css';
import { fetchData, putData } from '../../utils/fetchUtils';
import { CalendarTask, converDbTaskToTask, convetDbCalendarTaskToCalendarTask, Task } from '../../types/Task';
import { TasksCalendarContext } from '../../utils/tasksCalendarContext';

const convertKeyToDate = (key: string): Date | null => {

    try {
        const date = new Date();
        date.setFullYear(parseInt(key.split('-')[1]));
        date.setMonth(parseInt(key.split('-')[2]) - 1);
        date.setDate(parseInt(key.split('-')[3]));
        date.setMinutes(parseInt(key.split('-')[0].split(':')[1]))
        date.setHours(parseInt(key.split('-')[0].split(':')[0]))

        return date;
    } catch {
        return null;
    }

}

const fetchCalendarTasks = fetchData<CalendarTask[]>('http://localhost:8080/calendar/tasks');

export function CurrentTaskPanel() {
    const [currentTask, setCurrentTask] = useState<any | null>()
    const [nextTask, setNextTask] = useState<any | null>()
    const { calendar } = useContext(TasksCalendarContext);

    function handleTaskComplete(taskId: number) {
        console.log("complete Task!" + taskId)
        putData<{}, number>(`http://localhost:8080/task/${taskId}`, { "completed": true })();
        setCurrentTask(null)
    }

    function getTime(startTime: Date, endTime: Date) {
        const startFormattedMinutes = String(startTime.getMinutes()).padStart(2, "0");
        const endFormattedMinutes = String(endTime.getMinutes()).padStart(2, "0");

        return startTime.getHours() + ":" + startFormattedMinutes + " - "
            + endTime.getHours() + ":" + endFormattedMinutes;
    }

    useEffect(() => {
        const activeTasks = Object.entries(calendar)
            .flatMap(([key, value]) => value.map(task => {
                const startTime = key.includes("-") ? convertKeyToDate(key) : null;
                const endDate = startTime ? new Date(startTime.getTime() + (task.timeEstimate ? task.timeEstimate : 0) * 60 * 1000) : null;
                return ({
                    ...task,
                    startTime,
                    endDate,
                })
            }))
            .filter(task => !task.completed && task.startTime)
            .sort((task1, task2) => task1.startTime!.getTime() - task2.startTime!.getTime());
        const newCurrentTask = activeTasks[0] && activeTasks[0].startTime!.getTime() <= Date.now() && activeTasks[0].endDate!.getTime() >= Date.now() ? activeTasks[0] : null
        setCurrentTask(newCurrentTask)
        setNextTask(newCurrentTask ? activeTasks[1] : activeTasks[0]);
    }, [calendar])

    return (
        <div className="current-task-panel">
            {currentTask && <CurrentTaskView taskId={currentTask.id} taskName={currentTask.name} startTime={getTime((currentTask.startTime), currentTask.endDate)} onComplete={() => handleTaskComplete(currentTask.id)} />}
            {<NextTaskView taskName={nextTask ? nextTask.name : "You have no more tasks!"} startTime={nextTask ? getTime((nextTask.startTime), nextTask.endDate) : ""} />}
        </div>
    );
}