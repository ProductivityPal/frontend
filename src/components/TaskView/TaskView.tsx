import React from 'react';
import './TaskView.css';
import { Button } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import "../../styles/styles.css"
import { putData } from '../../utils/fetchUtils';
import expand from '../../images/expand_icon.svg'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandingComponent } from './ExpandingComponent';


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

    const taskStyle = {
        // backgroundColor: '#E7C3A188',
        // color: 'white'

    }

        function completeTask(taskId: number) {
            console.log("complete Task!" + taskId)
            putData<{}, number>(`http://localhost:8080/task/${taskId}`, { "isCompleted": true })();
            // Deleting this task from the TaskContainerView.
            props.onComplete()

        }
        return (
            <Draggable draggableId={(props.taskId).toString()} index={props.index ? props.index : 0} key={props.taskId}>
                {(provided) => (
                    <div className='task-body' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={props.taskName} >
                        <ExpandingComponent />
                        {/* <img className="logo" src={expand} alt="expand tasks view" /> */}
                        {/* <button className='circleButton'></button> */}
                        {/* <div className='task-header'> */}
                            {/* <p>{props.taskName}</p> */}
                            {/* {props.isAlgoSort && <Button>✓</Button>}
                            {!props.isAlgoSort && <Button>✎</Button>} */}
                        {/* </div> */}
                        {/* <Button className='basicButton' onClick={() => { completeTask(props.taskId) }}>✓</Button> */}
                    </div>
                )}

            </Draggable>
        );
    }



    // <Accordion sx={taskStyle}>
    //                         {!props.subTasks! ? (
    //                             <AccordionSummary sx={taskStyle} expandIcon={<ExpandMoreIcon />} >
    //                                 {/* <button className='circleButton'></button> */}
    //                                 <div className='task-header'>
    //                                     <p>{props.taskName}</p>
    //                                     {/* {props.isAlgoSort && <Button>✓</Button>}
    //                                     {!props.isAlgoSort && <Button>✎</Button>} */}
    //                                 </div>
    //                                 <Button className='basicButton' onClick={() => { completeTask(props.taskId) }}>✓</Button>
    //                             </AccordionSummary>
    //                         ) : (
    //                             <div className='task-header'>
    //                                 <p>{props.taskName}</p>
    //                                 {/* {props.isAlgoSort && <Button>✓</Button>}
    //                                 {!props.isAlgoSort && <Button>✎</Button>} */}
    //                                 <Button className='basicButton' onClick={() => { completeTask(props.taskId) }}>✓</Button>
    //                             </div>
                                
    //                         )}
    //                         <AccordionDetails sx={taskStyle}>
    //                             <div>* Subtask 1</div>
    //                             <div>* Subtask 2</div>
    //                         </AccordionDetails>
    //                     </Accordion>
