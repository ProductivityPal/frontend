import React, { useState, useContext, useEffect } from 'react';
import './CurrentTaskView.css';
import { Button, dividerClasses } from '@mui/material';
import { fetchData } from '../../utils/fetchUtils';
import { Task } from '../../types/Task';

type CurrentTaskProps = {
    taskId: number;
    taskName?: string;
    startTime: Date;
    endTime?: Date;
    onComplete: () => void;
}

export function CurrentTaskView(props: CurrentTaskProps) {
    const [subtaskList, setSubtaskList] = useState<String[]>([])
    const buttonStyle = {
        backgroundColor: '#F8DEB3',
        color: 'white',
        width: '30%',
        'border-radius': '50px',
        'font-size': 'x-small',
        'margin-right': '2px',
        height: '30px',
        'line-height': '12px',
        // 'font-style': 'normal'
        'margin-top': '5px',
        'margin-bottom': '5px'


    }
    useEffect(() => {
        // const fetchSubtasks = fetchData<Task[]>(`http://localhost:8080/${props.taskId}/subtask`)
        // fetchSubtasks((subtasks: Task[]) => {
        //     const subtaskList = subtasks.map((subtask) => subtask.name)
        //     setSubtaskList(subtaskList)

        // })
    });
    
    return (
        <div className='TaskPanelContainer'>
            <p>Your current task:</p>
            <div>
                <h1>{props.taskName}</h1>
                <p className="TimeLabel">{"10"}</p>
            </div>
            <hr></hr>
            <div>{subtaskList && subtaskList.map((subtask) => (<li>subtask.name</li>))}</div>

            <div className='ButtonContainer'>
                <Button sx={buttonStyle}>Start Timer</Button>
                {/* <Button sx={buttonStyle}>Add subtask</Button> */}
                <Button sx={buttonStyle}>✔️</Button>
            </div>
        </div>
        
    );
}