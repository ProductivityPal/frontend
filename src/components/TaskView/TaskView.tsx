import React from 'react';
import './TaskView.css';
import { Button } from '@mui/material';
// import type { Task } from '../../data/tasks';

type TaskViewProps = {
    taskName: string;
    subTasks?: any[];
}

export function TaskView(props: TaskViewProps) {
    const [SubtasksShowState, setSubtasksShowState] = React.useState('Show subtasks');
    const toggleSubtasks = () => {
        if (SubtasksShowState === 'Show subtasks') {
            setSubtasksShowState('Hide subtasks');
        } else {
            setSubtasksShowState('Show subtasks');
        }
    }

    return (
    <div className='task-body'>
        <div className='task-header'>
            <p>{props.taskName}</p>
            <Button>✎</Button>
            
        </div>
        {SubtasksShowState === 'Hide subtasks' && 
        props.subTasks && props.subTasks.map((subtask) =>
          (<div className='subtask-body' key={subtask.id}>{subtask.title}</div>))}
        <Button onClick={toggleSubtasks}>{SubtasksShowState}</Button>
    </div> 
    );
}

