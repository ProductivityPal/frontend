import React from 'react';
import { useState } from 'react'
import expand from '../../images/expand_icon.svg'
import './ExpandingComponent.css';
import { dividerClasses } from '@mui/material';
import { putData } from '../../utils/fetchUtils';
import { Button } from '@mui/material';
import { Menu } from '@mui/material';
import { postData } from "../../utils/fetchUtils";

type TaskViewProps = {
    isExpandable: boolean;
    taskName: string;
    taskId: number;
    completed: boolean;
    subTasks?: any[];
    isAlgoSort?: boolean;
    index?: number;
    onComplete: () => void;
    duration?: number;
}


export function ExpandingComponent(props: TaskViewProps) {
    const [expanded, setExpanded] = useState(false)
    const [expandedCategory, setExpandedCategory] = useState(false)
    const [category, setCategory] = useState('default')
    const [subtaskName, setSubtaskName] = useState('')
    const [subtasks, setSubtasks] = useState(props.subTasks ? props.subTasks : [])

    function completeTask(taskId: number) {
        console.log("complete Task!" + taskId)
        putData<{}, number>(`http://localhost:8080/task/${taskId}`, { "completed": true })();

        props.onComplete()

    }
    function sendCategory(category: string) {
        // send category to backend
        putData<{}, number>(`http://localhost:8080/task/${props.taskId}`, { "category": category })();
        setCategory(category)

    }
    function addSubtask(subtaskName: string) {
        const newSubtask = {
            name: subtaskName,
            isSubtask: true,
            parentId: props.taskId,
        }
        // todo add category

        setSubtasks([...subtasks, newSubtask]);

        // send to backend
        postData<{}, number>(`http://localhost:8080/task/subtask`, newSubtask)();
        console.log("SENDING SUBTASK")

        setSubtaskName('')

    }

    return (
        <div className='expand-container' style={props.duration ? { height: props.duration } : {}}>

            <div className='task-header' style={{
                opacity: props.completed ? 0.5 : 1,
                // backgroundColor: category,
            }}>
                {props.isExpandable && <img className="expand-icon" src={expand} alt="expand tasks view" onClick={() => setExpanded(!expanded)} />}
                <button className={`circleButton ${category}`} onClick={() => setExpandedCategory(!expandedCategory)}>
                    {expandedCategory && <div className='category-menu'>
                        <button className='circleButton' onClick={() => sendCategory('default')} />
                        <button className='circleButton green' onClick={() => sendCategory('green')} />
                        <button className='circleButton accent' onClick={() => sendCategory('accent')} />
                        <button className='circleButton grey' onClick={() => sendCategory('grey')} />
                    </div>}
                </button>
                <div className='task-label'>{props.taskName}</div>
                {!props.completed && <Button className='basicButton' onClick={() => { completeTask(props.taskId) }}>✓</Button>}
            </div>

            <div className={expanded ? "expandingComponentExpanded" : "expandingComponentHidden"}>
                <div>
                    {subtasks && subtasks.map((subtask, index) => (
                        <p key={index}>* {subtask.name}</p>
                    ))}
                    <form>
                        <input type="text" value={subtaskName} onChange={(e) => setSubtaskName(e.target.value)} />
                        <button type="button" onClick={() => { addSubtask(subtaskName) }}>Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
}