import React, { useState, useEffect, useContext } from 'react';
import './ExpandingComponent.css';
import { Popover, Button } from '@mui/material';
import { deleteData, putData, postData, fetchData } from '../../utils/fetchUtils';
import { AddTaskModal } from './AddTaskModal';
import { Task } from '../../types/Task';
import expand from '../../images/expand_icon.svg'
import { CategoryContext } from '../../utils/CategoryContext';

type TaskViewProps = {
    task: Task;
    isExpandable: boolean;
    isEditView: boolean;
    subTasks?: any[];
    isAlgoSort?: boolean;
    index?: number;
    onComplete: () => void;
    openTaskModal: () => void;
    onUpdateTask: (task: Task) => void;
    duration?: number;
}

export function ExpandingComponent(props: TaskViewProps) {
    const categoryContext = useContext(CategoryContext)
    const [expanded, setExpanded] = useState(false)
    const [expandedCategory, setExpandedCategory] = useState(false)
    const [category, setCategory] = useState(props.task.category)
    const [taskColor, setTaskColor] = useState(convertCategoryToColor(props.task.category))
    const [subtaskName, setSubtaskName] = useState('')
    const [subtasks, setSubtasks] = useState(props.subTasks ? props.subTasks : [])
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [anchorElCategory, setAnchorElCategory] = React.useState<HTMLButtonElement | null>(null);

    const handlePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElCategory(anchorElCategory ? null : event.currentTarget);
    }

    const handleCloseCategory = () => {
        setAnchorElCategory(null);
    }

    const handleAddTaskClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const addNewTaskAction = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpenAddTaskModal(true);
        handleAddTaskClick(e);
    }

    const handleAddTaskClose = () => {
        setAnchorEl(null);
        setOpenAddTaskModal(false);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    useEffect(() => {
        const fetchSubtasks = fetchData<Task[]>(`http://localhost:8080/task/${props.task.id}/subtask`)
        fetchSubtasks((subtasks: Task[]) => {
            const subtaskList = subtasks.map((subtask) => subtask.name)
            // setSubtaskList(subtaskList)
            setSubtasks(subtasks)
        })
    }, []);

    function completeTask(taskId: number) {
        console.log("complete Task!" + taskId)
        putData<{}, number>(`http://localhost:8080/task/${taskId}`, { "completed": true })();

        props.onComplete()
    }

    function deleteTask(taskId: number) {
        console.log("delete Task!" + taskId)
        deleteData<{}, number>(`http://localhost:8080/task/${taskId}`, {})();

        props.onComplete()
    }

    const handleUpdateTask = (updatedTask: Task) => {
        props.onUpdateTask(updatedTask);
    }

    function sendCategory(category: string) {
        // get name for category
        const categoryName = categoryContext.getNameForCategory(category)
        putData<{}, number>(`http://localhost:8080/task/${props.task.id}`, { "category": categoryName })();
        setCategory(category)
        setTaskColor(convertCategoryToColor(category))
    }

    function addSubtask(subtaskName: string) {
        const newSubtask = {
            name: subtaskName,
            subtask: true,
            parent_id: props.task.id,
        }
        // todo add category

        setSubtasks([...subtasks, newSubtask]);

        // send to backend
        postData<{}, number>(`http://localhost:8080/task/subtask`, newSubtask)();
        setSubtaskName('')

    }

    return (
        <div className='expand-container' style={{
            height: props.duration ? props.duration : 'auto',
            opacity: props.task.completed ? 0.5 : 1,
            backgroundColor: taskColor + '88',
            border: (props.task.deadline >= new Date()) ? ('2px solid ' + taskColor) : ('2px solid ' + "#eb403488"),
        }}>

            <div className='task-header'
                style={{
                    opacity: props.task.completed ? 0.5 : 1,
                }}>
                {/* <Button sx={buttonLowStyle} onClick={() => deleteTask(props.task.id)}>x</Button> */}
                {/* {props.isExpandable && <img className="expand-icon" src={expand} alt="expand tasks view" onClick={() => setExpanded(!expanded)} />} */}
                {!props.task.completed && !props.isEditView && <Button className='basicButton' sx={buttonLowStyle} onClick={() => { completeTask(props.task.id) }}>✓</Button>}
                <button className={`circleButton ${category}`} onClick={handlePopover}>
                    <Popover
                        open={Boolean(anchorElCategory)}
                        onClose={handleCloseCategory}
                        anchorEl={anchorElCategory}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                    >
                        <div className='popover-menu'>
                            <button className='circleButton' onClick={() => sendCategory('beige')} />
                            <button className='circleButton green' onClick={() => sendCategory('green')} />
                            <button className='circleButton accent' onClick={() => sendCategory('accent')} />
                            <button className='circleButton grey' onClick={() => sendCategory('grey')} />
                        </div>
                    </Popover>
                </button>
                <div className='task-title-container'>
                    <div className='task-label'>{props.task.name}</div>
                    {/* {props.isExpandable && <img className="expand-icon" src={expand} alt="expand tasks view" onClick={() => setExpanded(!expanded)} />} */}
                    {props.isExpandable && <Button sx={subtaskButtonLowStyle} onClick={() => setExpanded(!expanded)}><img className="expand-icon material-icons grey-text" src={expand} />Subtasks</Button>}

                </div>
                {/* {props.isEditView && <Button className='basicButton' sx={buttonLowStyle} onClick={addNewTaskAction}>✎</Button>} */}
                <Button sx={buttonLowStyle} onClick={handleClick}>...</Button>
                <Popover
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                >
                    <div className='popover-menu'>
                        <Button sx={accentStyle} onClick={addNewTaskAction}>Edit</Button>
                        <Button sx={dangerStyle} onClick={() => deleteTask(props.task.id)}>Delete</Button>
                    </div>
                </Popover>

                {props.task.completed && <div />}
                <AddTaskModal
                    open={openAddTaskModal}
                    setOpen={setOpenAddTaskModal}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    handleClose={handleAddTaskClose}
                    addTask={() => console.log("")}
                    currentTask={props.task}
                    updateTask={(task: Task) => handleUpdateTask(task)}></AddTaskModal>
            </div>

            <div className={expanded ? "expandingComponentExpanded" : "expandingComponentHidden"}>
                <div>

                    <div className='subtasks'>{subtasks && subtasks.map((subtask) => (<li>{subtask.name}</li>))}</div>

                    <form className='subtask-form'>
                        <input type="text" className="input-style" value={subtaskName} onChange={(e) => setSubtaskName(e.target.value)} />
                        <Button type="button" sx={subtaskButtonLowStyle} onClick={() => { addSubtask(subtaskName) }}>Add</Button>
                    </form>
                </div>


            </div>


        </div>
    );
};

function convertCategoryToColor(category: string) {
    switch (category) {
        case 'green':
            return "#707247"
        case 'accent':
            return "#EE7F3B"
        case 'grey':
            return "#E5E5E5"
        default:
            return "#E7C3A1"
    }
}

const buttonLowStyle = {
    color: 'black',
    maxWidth: '6px',
    minWidth: '6px',
    "&:hover": { backgroundColor: "#FFFFFF50" },
}

const subtaskButtonLowStyle = {
    color: 'grey',
    // maxWidth: '12px',
    // minWidth: '12px',
    // maxHeight: '6px',
    // minHeight: '6px',
    fontSize: '12px',
    textTransform: 'none',
    "&:hover": { backgroundColor: "#FFFFFF50" },
}

const accentStyle = {
    color: '#EE7F3B',
    // backgroundColor: "#EE7F3B20",
    "&:hover": { backgroundColor: "#EE7F3B50" },
}

const dangerStyle = {
    color: '#D83C1A',
    // backgroundColor: "#D83C1A20",
    "&:hover": { backgroundColor: "#D83C1A50" },
}