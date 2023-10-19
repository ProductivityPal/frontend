import React from 'react';
import { useState } from 'react'
import expand from '../../images/expand_icon.svg'
import './ExpandingComponent.css';
import { dividerClasses } from '@mui/material';
import { putData } from '../../utils/fetchUtils';
import { Button } from '@mui/material';
import { Menu } from '@mui/material';

type TaskViewProps = {
    taskName: string;
    taskId: number;
    subTasks?: any[];
    isAlgoSort?: boolean;
    index?: number;
    onComplete: () => void;
}




export function ExpandingComponent(props: TaskViewProps) {
    const [expanded, setExpanded] = useState(false)
    const [expandedCategory, setExpandedCategory] = useState(false)
    const [category, setCategory] = useState('default')
    const [subtaskName, setSubtaskName] = useState('')
    const [subtasks, setSubtasks] = useState(props.subTasks ? props.subTasks: [])

    function completeTask(taskId: number) {
        console.log("complete Task!" + taskId)
        putData<{}, number>(`http://localhost:8080/task/${taskId}`, { "isCompleted": true })();
        // Deleting this task from the TaskContainerView.
        props.onComplete()

    }
    function addSubtask(subtaskName: string) {
        console.log("SOFIS")
        // FIX: create new subtask type with subtaskName
        setSubtasks([...subtasks, subtaskName]);
        setSubtaskName('')

    }

    return (
        <div className='expand-container'>

            <div className='task-header'>
                <img className="logo" src={expand} alt="expand tasks view" onClick={() => setExpanded(!expanded)} />
                <button className={`circleButton ${category}`} onClick={() => setExpandedCategory(!expandedCategory)}>
                    {expandedCategory && <div className='category-menu'>
                        <button className='circleButton' onClick={() => setCategory('default')} />
                        <button className='circleButton green' onClick={() => setCategory('green')} />
                        <button className='circleButton accent' onClick={() => setCategory('accent')} />
                        <button className='circleButton grey' onClick={() => setCategory('grey')} />
                    </div>}
                </button>
                <div>{props.taskName}</div>
                <Button className='basicButton' onClick={() => { completeTask(props.taskId) }}>✓</Button>
            </div>

            <div className={expanded ? "expandingComponentExpanded" : "expandingComponentHidden"}>
                <div>
                    {subtasks && subtasks.map((subtask, index) => (
                        <p key={index}>{subtask}</p>
                    ))}
                    <form>
                        <input type="text" value={subtaskName} onChange={(e) => setSubtaskName(e.target.value)}/>
                        <button type="button" onClick={() => {addSubtask(subtaskName)}}>Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
}