import React from 'react';
import './TaskView.css';
import { Button } from '@mui/material';
import { useDrag } from 'react-dnd';
import { Task } from '@mui/icons-material';
import { Draggable } from 'react-beautiful-dnd';

type TaskViewProps = {
    taskName: string;
    taskId: number;
    subTasks?: any[];
    isAlgoSort?: boolean;
    index?: number;
}

export function TaskView(props: TaskViewProps) {
    // const [{isDragging}, drag] = useDrag(() => ({
    //     type: "task",
    //     collect: monitor => ({
    //       isDragging: !!monitor.isDragging(),
    //     }),
    //   }))
    // const [{ isDragging }, drag] = useDrag({
    //     item: { type: "task", taskName: props.taskName },
    //     collect: (monitor) => ({
    //       isDragging: monitor.isDragging(),
    //     }),
    //   });
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
                    <div className='task-header'  >
                        <p>{props.taskName}</p>
                        {/* {props.isAlgoSort && <Button>✓</Button>}
                        {!props.isAlgoSort && <Button>✎</Button>} */}
                    </div>
                </div>
            )}

        </Draggable>

        // {props.subTasks && SubtasksShowState === 'Hide subtasks' && props.subTasks.map((subtask, index) =>
        // (
        //     <Draggable key={subtask.id} draggableId={subtask.id} index={index}>
        //         {(provided) => (
        //             <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='subtask-body' key={subtask.id}>
        //                 {subtask.title}
        //                 <Button onClick={toggleSubtasks}>{SubtasksShowState}</Button>
        //             </div>
        //         )}
        //     </Draggable>

        // ))
        // }
    );
}

