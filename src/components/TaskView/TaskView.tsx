import React from 'react';
import './TaskView.css';
import { Button } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import "../../styles/styles.css"
import { putData } from '../../utils/fetchUtils';

type TaskViewProps = {
    taskName: string;
    taskId: number;
    subTasks?: any[];
    isAlgoSort?: boolean;
    index?: number;
    onComplete: () => void;
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
        function completeTask(taskId: number) {
            console.log("complete Task!" + taskId)
            putData<{}, number>(`http://localhost:8080/task/${taskId}`, { "completed": true })();
            // Deleting this task from the TaskContainerView.
            props.onComplete()

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
                                    <Button className='basicButton' onClick={() => {completeTask(props.taskId)}}>✓</Button>
                                                    </div>
                )}

            </Draggable>
        );
    }

