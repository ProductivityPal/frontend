import React from 'react';
import {useState} from 'react'
import expand from '../../images/expand_icon.svg'
import './ExpandingComponent.css';
import { dividerClasses } from '@mui/material';

export function ExpandingComponent() {
    const [expanded, setExpanded] = useState(false)
    return(
        <div className='expand-container'>
            <div onClick={() => setExpanded(!expanded)}>Sophie</div>
            <div className={expanded ? "expandingComponentExpanded"  : "expandingComponentHidden"}>
                test
            </div>
        </div>
    );
}
// {/* <img className="logo" src={expand} alt="expand tasks view" /> */}
// {/* <button className='circleButton'></button> */}
// {/* <div className='task-header'> */}
//     {/* <p>{props.taskName}</p> */}
//     {/* {props.isAlgoSort && <Button>✓</Button>}
//     {!props.isAlgoSort && <Button>✎</Button>} */}
// {/* </div> */}
// {/* <Button className='basicButton' onClick={() => { completeTask(props.taskId) }}>✓</Button> */}