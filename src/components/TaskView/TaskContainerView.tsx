import React, { useState} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import './TaskContainerView.css';
import { TaskView } from './TaskView';
import { Button } from '@mui/material';
import { tasksList as mockedTasksList} from '../../data/tasks';

export function TaskContainerView() {

    const [tasksList, setTasksList] = useState(mockedTasksList);
    const [currentView, setCurrentView] = useState('ListView'); 
    const toggleListView = () => {
        setCurrentView('ListView');
        // todo: after click on ListView button, show ListView and change button color
    }
    const toggleSortedView = () => {
        setCurrentView('SortedView');
        // todo: after click on SortedView button, show SortedView and change button color
    }
    const addNewTask = () => {
        // setTasksList(sortTasksList([...tasksList, mockedNewTask]));
    }

    return (
        <div className="task-view">
            <div className='tasks-container'>
                <Stack spacing={2} alignItems="center">
                    <ToggleButtonGroup aria-label="Medium sizes">
                        <ToggleButton key={1} value="1" onClick={toggleListView}>ListView</ToggleButton>,
                        <ToggleButton key={2} value="2" onClick={toggleSortedView}>SortedView </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                { currentView === 'ListView' && <div>
                    {tasksList.map((task) => (<TaskView key={task.id} taskName={task.title} subTasks={task.subtasks}/>))}
                    <Button onClick={addNewTask}>Add new task</Button>
                </div> }
                { currentView === 'SortedView' && <div>SortedView</div> }

            </div>
        </div>
    );
}