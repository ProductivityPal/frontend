import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import './SettingsView.css'
import { deleteData, postData } from '../../utils/fetchUtils';

function Settings() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [categoryNames, setCategoryNames] = useState({
        category1: 'default',
        category2: 'accent',
        category3: 'green',
        category4: 'grey',
    });

    const handleSaveUserSettings = () => {
        const newLoginData = {
            username: username,
            password: password,
        }

        postData<{}, number>(`http://localhost:8080/settings/login`, newLoginData)();
    }

    const handleSaveCategorySettings = () => {
        postData<{}, number>(`http://localhost:8080/settings/category`, categoryNames)();
    }

    const handleAccountDeletion = () => {
        deleteData(`http://localhost:8080/settings/deleteAccount`, {})();
        localStorage.removeItem('jwt');
        window.location.href = "/register";
    }

    const sumbitButton = {
        backgroundColor: '#EE7F3B',
        color: 'white',
        "&:hover": {backgroundColor: "#EE7F3B80"},
        width: '100%',
    }

    const dangerButton = {
        backgroundColor: '#C44536',
        color: 'white',
        "&:hover": {backgroundColor: "#C4453680"},
        width: '100%',
    }

    return (
        <Container maxWidth="sm">
            <h3 className='title-label'>User settings </h3>
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" sx={sumbitButton} onClick={handleSaveUserSettings} disabled={!username && !password}>
                Save User Changes
            </Button>
            {/* <Typography className='title-label' variant="h5" gutterBottom>
                Category names
            </Typography> */}
            <h3 className='title-label'>Category names </h3>
            {Object.keys(categoryNames).map((category) => (
                <div className='category-container'>
                    <div className={`circleButton settings ${categoryNames[category as keyof typeof categoryNames]}`} />
                    <TextField
                        key={category}
                        label={`Name for ${categoryNames[category as keyof typeof categoryNames]}`}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        // value={category}
                        onChange={(e) =>
                            setCategoryNames((prevCategoryNames) => ({
                                ...prevCategoryNames,
                                [category]: e.target.value,
                            }))
                        }
                    />

                </div>

            ))}
            <Button variant="contained" sx={sumbitButton} onClick={handleSaveCategorySettings}>
                Save Category Changes
            </Button>
            <h3 className='title-label'>Danger zone! Delete your account forever</h3>
            <Button variant="contained" sx={dangerButton} onClick={handleAccountDeletion}>
                Delete My Account
            </Button>
        </Container>
    );
};

export default Settings;
