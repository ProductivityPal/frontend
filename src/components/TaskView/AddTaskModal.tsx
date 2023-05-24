import React from "react";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { postData } from "../../utils/fetchUtils";
import './AddTaskModal.css';
import { N } from "@fullcalendar/core/internal-common";
import { Task } from "../../types/Task";


type AddTaskModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: (anchorEl: HTMLButtonElement | null) => void;
    handleClose: () => void;
    addTask: (task: Task) => void;
}
type NewTaskProps = {
    name: String;
    priority: Number;
    difficulty: String;
    deadline: Date;
    likeliness: String;
    isParent: Boolean;
    completionTime: Number;
    timeEstimate: Number;
    appUser: {
        id: Number;
    };
}

const postNewTask = (newTask: NewTaskProps) => postData<{}>('http://localhost:8080/task/?id=1', newTask);

export function AddTaskModal(props: AddTaskModalProps) {
    const [taskName, setTaskName] = React.useState('');
    const [priority, setPriority] = React.useState(1);
    const [difficulty, setDifficulty] = React.useState('MEDIUM');
    const [deadline, setDeadline] = React.useState(new Date());
    const [likeliness, setLikeliness] = React.useState('NEUTRAL');
    const [isParent, setIsParent] = React.useState(false);
    const [timeEstimate, setTimeEstimate] = React.useState(0);
   
    const onSave = () => {
        const newTaskData = {
            name: taskName,
            priority,
            difficulty,
            deadline,
            likeliness,
            isParent,
            completionTime: 0,
            timeEstimate,
            appUser: {
                id: 3,
            },
        };
        postNewTask(newTaskData)(() =>{
            // props.addTask({
            //     id: number;
            //     name: string;
            //     description?: string;
            //     priority: number;
            //     difficulty: Difficulty;
            //     likeliness: Likeliness;
            //     deadline: Date;
            //     timeEstimate: number;
            //     completionTime?: number;
            //     isSubtask: boolean;
            //     isParent: boolean;
            //     isCompleted: boolean;
            //     parentId?: number;
            // })
        });
        
        // setTaskName('');
        // setPriority(1);
        // setDifficulty('MEDIUM');
        // setDeadline(new Date());
        // setLikeliness('NEUTRAL');
        // setIsParent(false);
        props.handleClose();
    };

    const buttonImportantStyle = {
        backgroundColor: '#fa9c1b',
        color: 'white',
    }
    const buttonMediumStyle = {
        backgroundColor: '#fa9c1b',
        color: 'white',
    }
    const buttonLowStyle = {
        backgroundColor: '#fa9c1b',
        color: 'white',
    }
    const subtasksButton = {
        backgroundColor: '#296d98',
        color: 'white',
        width: '100%',
    }
    const inputStyle = {
        width: '95%',
        padding: '5px',
        margin: '5px',
    }


    return (
        <div>
            <Popover
                open={props.open}
                anchorEl={props.anchorEl}
                onClose={props.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div className="add-task-header" >
                
                    <h3>Add new Task</h3>
                    <Button onClick={props.handleClose}>X</Button>
                </div>
                <div className="add-task-body">
                    <div className="add-task-body-row">
                        <div className="add-task-body-row-label">Task name</div>
                        <Input sx={inputStyle} type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                    </div>
                    <div className="add-task-body-row">
                        <div className="add-task-body-row-label">Choose Priority:</div>
                        <div className="add-task-body-row-buttons">
                            <Button sx={buttonImportantStyle} onClick={() => {setPriority(5)}}>5</Button>
                            <Button sx={buttonImportantStyle} onClick={() => {setPriority(4)}}>4</Button>
                            <Button sx={buttonMediumStyle} onClick={() => {setPriority(3)}}>3</Button>
                            <Button sx={buttonLowStyle} onClick={() => {setPriority(2)}}>2</Button>
                            <Button sx={buttonLowStyle} onClick={() => {setPriority(1)}}>1</Button>
                        </div>     
                    </div>
                    <div className="add-task-body-row">
                        <div className="add-task-body-row-label">Choose Difficuty:</div>
                        <div className="add-task-body-row-buttons">
                            <Button sx={buttonLowStyle} onClick={() => {setDifficulty("EASY")}} variant="contained">Easy</Button>
                            <Button sx={buttonMediumStyle} onClick={() => {setDifficulty("MEDIUM")}}>Medium</Button>
                            <Button sx={buttonImportantStyle} onClick={() => {setDifficulty("HARD")}}>Hard</Button>
                            <Button sx={buttonImportantStyle} onClick={() => {setDifficulty("EXTRA HARD")}}>Extra Hard</Button>
                        </div>   
                         
                    </div>
                    <div className="add-task-body-row">
                        <div className="add-task-body-row-label">When is the deadline?</div>
                        <Input sx={inputStyle} type="date" value={deadline} onChange={(e) => setDeadline(new Date(e.target.value))} />
                         
                    </div>
                    <div className="add-task-body-row">
                        <div className="add-task-body-row-label">How much do you like this task?</div>
                        <div className="add-task-body-row-buttons">
                            <Button sx={buttonLowStyle} onClick={() => {setLikeliness("LOVE")}}>Love</Button>
                            <Button sx={buttonLowStyle} onClick={() => {setLikeliness("LIKE")}}>Like</Button>
                            <Button sx={buttonMediumStyle} onClick={() => {setLikeliness("NEUTRAL")}}>Neutral</Button>
                            <Button sx={buttonImportantStyle} onClick={() => {setLikeliness("DISLIKE")}}>Dislike</Button>
                            <Button sx={buttonImportantStyle} onClick={() => {setLikeliness("HATE")}}>Hate</Button>
                        </div>   
                         
                    </div>
                    <div className="add-task-body-row">
                        <div className="add-task-body-row-label">How long will it take?</div>
                        <Input sx={inputStyle} type="number" value={timeEstimate} onChange={(e) => setTimeEstimate(parseInt(e.target.value))}/>
                    </div>
                    {/* <div className="add-task-body-row">
                        <Button sx={subtasksButton}>Add Subtaks +</Button>
                    </div> */}
                    <div className="add-task-body-row">
                        <Button sx={subtasksButton} onClick={onSave}>Save This Task</Button>
                    </div>
                </div>

            </Popover>
        </div>);
}