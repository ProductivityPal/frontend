import React, { useState, useContext } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import './TaskContainerView.css';
import { TaskView } from './TaskView';
import { Button } from '@mui/material';
import { tasksList as mockedTasksList } from '../../data/tasks';
import { Task } from '../../types/Task';
import { useEffect } from 'react';
import { fetchData, putData } from '../../utils/fetchUtils';
import { postData } from '../../utils/fetchUtils';
import { Add } from '@material-ui/icons';
import { AddTaskModal } from './AddTaskModal';
import { Droppable } from 'react-beautiful-dnd';
import { TasksCalendarContext } from '../../utils/tasksCalendarContext'

const fetchTasks = fetchData<Task[]>('http://localhost:8080/task/?id=5');
const fetchAlgoSortList = (id: String) => fetchData<Task[]>('http://localhost:8080/task/algosort?id=5');
const putEnergyLevel = (energyLevel: String) => putData<{}, number>(`http://localhost:8080/user/energyLevel/${energyLevel}?id=${5}`, {});
const TASK_LIST_COMPONENT_ID = "tasksList";

export function TaskContainerView() {

    // Tasks / Sorted View
    const { calendar, moveTask, addTask, setTasks } = useContext(TasksCalendarContext);
    const tasksList = calendar[TASK_LIST_COMPONENT_ID];

    // useEffect(() => {
    //     setTasks(TASK_LIST_COMPONENT_ID, [
    //         {
    //             id: 1,
    //             name: "abcd",
    //             description: "asdasdas",
    //             priority: 1,
    //             difficulty: 1,
    //             likeliness: "like",
    //             deadline: new Date(),
    //             timeEstimate: 60,
    //             isSubtask: false,
    //             isParent: false,
    //             isCompleted: false,
    //         },
    //         {
    //             id: 2,
    //             name: "dsfsd",
    //             description: "asdasdas",
    //             priority: 1,
    //             difficulty: 2,
    //             likeliness: "like",
    //             deadline: new Date(),
    //             timeEstimate: 60,
    //             isSubtask: false,
    //             isParent: false,
    //             isCompleted: false,
    //         },
    //         {
    //             id: 3,
    //             name: "aasdasdasbcd",
    //             description: "asdasdas",
    //             priority: 1,
    //             difficulty: "medium",
    //             likeliness: "like",
    //             deadline: new Date(),
    //             timeEstimate: 60,
    //             isSubtask: false,
    //             isParent: false,
    //             isCompleted: false,
    //         }
    //     ]);
    // }, [])
    const [currentView, setCurrentView] = useState('ListView');
    const [energyLevelPopupView, setEnergyLevelPopupView] = useState(true);

    // Adding new task
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleAddTaskClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAddTaskClose = () => {
        setAnchorEl(null);
        setOpenAddTaskModal(false);
    };


    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const toggleListView = () => {
        setCurrentView('ListView');
        // todo: after click on ListView button, show ListView and change button color
    }
    const toggleSortedView = () => {
        setTasks(TASK_LIST_COMPONENT_ID, []);
        setCurrentView('SortedView');
        // todo: after click on SortedView button, show SortedView and change button color
    }
    const addNewTask = () => {
        setOpenAddTaskModal(true);
        // setTasksList(sortTasksList([...tasksList, mockedNewTask]));
    }
    const showSortedTasksForEnergyLevel = (energyLevel: String) => {
        putEnergyLevel(energyLevel)();
        fetchAlgoSortList(energyLevel)((tasks) => setTasks(TASK_LIST_COMPONENT_ID, tasks), setIsLoading, setErrorMessage);
        setEnergyLevelPopupView(false);

    }

    const energyButtonLow = {
        backgroundColor: '#b90e0a',
        color: 'white',
    }
    const energyButtonMedium = {
        backgroundColor: '#fa9c1b',
        color: 'white',
    }
    const energyButtonHigh = {
        backgroundColor: '#3b8132',
        color: 'white',
    }

    useEffect(() => {
        fetchTasks((tasks: Task[]) => setTasks(TASK_LIST_COMPONENT_ID, tasks), setIsLoading, setErrorMessage);
    }, []);

    return (
        <div className="task-view">
            {/* todo: add subtasks, 
            add scroll to task container, 
            refresh tasks after adding new task, 
            check-off buttons, 
            make smaller toggle button */}
            <div className='tasks-container'>
                <Stack spacing={2} alignItems="center">
                    <ToggleButtonGroup aria-label="Medium sizes">
                        <ToggleButton key={1} value="1" onClick={toggleListView}>ListView</ToggleButton>,
                        <ToggleButton key={2} value="2" onClick={toggleSortedView}>SortedView </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                <Droppable droppableId={TASK_LIST_COMPONENT_ID} key={TASK_LIST_COMPONENT_ID}>
                    {(provided) => (
                        <div  {...provided.droppableProps} ref={provided.innerRef} >
                            {tasksList.map((task, index) => (<TaskView key={task.id} taskName={task.name} taskId={task.id} isAlgoSort={currentView !== 'ListView'} index={index} />))}
                            <Button onClick={addNewTask}>Add new task</Button>
                            {provided.placeholder}
                        </div>
                        
                    )}
                </Droppable>
                <AddTaskModal
                    open={openAddTaskModal}
                    setOpen={setOpenAddTaskModal}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    handleClose={handleAddTaskClose}
                    addTask={(task: Task) => addTask(TASK_LIST_COMPONENT_ID, task)}
                />
                {currentView === 'SortedView' && <div>
                    {energyLevelPopupView && <div className='energyPopupContainer'>Select your current energy level:
                        <br></br>
                        <Button style={energyButtonLow} onClick={() => showSortedTasksForEnergyLevel('LOW')}>Low</Button>
                        <Button style={energyButtonMedium} onClick={() => showSortedTasksForEnergyLevel('MEDIUM')}>Medium</Button>
                        <Button style={energyButtonHigh} onClick={() => showSortedTasksForEnergyLevel('HIGH')}>High</Button>
                    </div>}

                    { /*algoSortList.map((task) => (<TaskView key={task.id} taskId={task.id} taskName={task.name} isAlgoSort={true} />)) */}
                </div>}

            </div>
        </div>
    );
}