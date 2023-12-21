import React, { useState, useEffect, useContext } from 'react';
import './ExpandingComponent.css';
import { Popover, Button } from '@mui/material';
import { deleteData, putData, postData, fetchData } from '../../utils/fetchUtils';
import { AddTaskModal } from './AddTaskModal';
import { Task } from '../../types/Task';
import expand from '../../images/chevron_icon.png'
import done from '../../images/done_icon.png'
import dots from '../../images/dots_icon.png'
import edit from '../../images/edit_icon.png'
import del from '../../images/delete_icon.png'
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
    const [categoryName, setCategoryName] = useState(props.task.category)
    const [taskColor, setTaskColor] = useState(convertCategoryToColor(props.task.category))
    const [subtaskName, setSubtaskName] = useState('')
    const [subtasks, setSubtasks] = useState(props.subTasks ? props.subTasks : [])
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [anchorElCategory, setAnchorElCategory] = React.useState<HTMLButtonElement | null>(null);
    const [isCompleted, setIsCompleted] = useState(props.task.completed)

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
        putData<{}, number>(`http://localhost:8080/task/${taskId}`, { "completed": true })(() => {
            setIsCompleted(true)
        });

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
        console.log("CategoryName!", categoryName)
        putData<{}, number>(`http://localhost:8080/task/${props.task.id}`, { "category": categoryName })();
        setCategory(category)
        setCategoryName(categoryName)
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
            opacity: isCompleted ? 0.5 : 1,
            backgroundColor: taskColor + '88',
            border: (new Date(props.task.deadline) >= new Date()) ? ('2px solid ' + taskColor) : ('2px solid ' + "#eb403488"),
        }}>

            <div className='task-header'
                style={{
                    opacity: isCompleted ? 0.5 : 1,
                }}>
                <div className='task-title-container'>
                    <h2 className='task-label'>{props.task.name}</h2>
                </div>
                <Button sx={buttonLowStyle} onClick={handleClick}><img className="expand-icon" src={dots} /></Button>
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
                        <Button sx={boldStyle} onClick={() => { completeTask(props.task.id) }}><img className="expand-icon" src={done} />Done</Button>
                        <Button sx={accentStyle} onClick={addNewTaskAction}><img className="expand-icon" src={edit} />Edit</Button>
                        <Button sx={dangerStyle} onClick={() => deleteTask(props.task.id)}><img className="expand-icon" src={del} />Delete</Button>
                    </div>
                </Popover>

            </div>
            <div className='subtasks-button'>
                <button className={`circleButton ${category} oval`} onClick={handlePopover}>
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
                {props.isExpandable && <Button sx={subtaskButtonLowStyle} onClick={() => setExpanded(!expanded)}><img className="expand-icon material-icons grey-text" src={expand} />Subtasks</Button>}
            </div>

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
    maxWidth: '50px',
    minWidth: '50px',
    maxHeight: '20px',
    minHeight: '20px',
    "&:hover": { backgroundColor: "#FFFFFF50" },
}

const subtaskButtonLowStyle = {
    color: 'grey',
    // maxWidth: '12px',
    // minWidth: '12px',
    maxHeight: '6px',
    minHeight: '6px',
    fontSize: '12px',
    textTransform: 'none',
    "&:hover": { backgroundColor: "#FFFFFF50" },
}

const boldStyle = {
    color: '#6A7569',
    "&:hover": { backgroundColor: "#6A756950" },
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