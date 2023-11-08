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
    isExpandable: boolean;
    taskName: string;
    taskId: number;
    completed: boolean;
    isEditView: boolean;
    category: string;
    subTasks?: any[];
    isAlgoSort?: boolean;
    index?: number;
    onComplete: () => void;
    openTaskModal: () => void;
    duration?: number;
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


    return (
        <Draggable draggableId={(props.taskId).toString()} index={props.index ? props.index : 0} key={props.taskId}>
            {(provided) => (
                <div className='task-body' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={props.taskName} >
                    <ExpandingComponent duration={props.duration} key={props.taskId} 
                    isExpandable={props.isExpandable} 
                    taskName={props.taskName} 
                    category={props.category} 
                    isEditView={props.isEditView} 
                    completed={props.completed} 
                    taskId={props.taskId} 
                    index={props.index} 
                    isAlgoSort={props.isAlgoSort} 
                    onComplete={() => props.onComplete()} 
                    openTaskModal={() => props.openTaskModal()}/>
                </div>
            )}

        </Draggable>
    );
}
