import React from 'react';
import './TaskView.css';
import { Button } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import "../../styles/styles.css"

type TaskViewProps = {
    taskName: string;
    taskId: number;
    subTasks?: any[];
    isAlgoSort?: boolean;
    index?: number;
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
        <Draggable draggableId={(props.taskId).toString()} index={props.index ? props.index : 0} key={props.taskId}>
            {(provided) => (
                <div className='task-body' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={props.taskName} >
                    <button className='circleButton'></button>
                    <div className='task-header'>
                        <p>{props.taskName}</p>
                        {/* {props.isAlgoSort && <Button>✓</Button>}
                        {!props.isAlgoSort && <Button>✎</Button>} */}
                    </div>
                    <button className='basicButton'>✓</button>
                </div>
            )}

        </Draggable>
    );
}

