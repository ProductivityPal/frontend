import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, useColorScheme } from '@mui/material';
import './SettingsView.css'
import { deleteData, postData, putData } from '../../utils/fetchUtils';
import { CategoryContext, CategoryProvider } from '../../utils/CategoryContext';

function Settings() {
    const categoryContext = useContext(CategoryContext)
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [categoryNames, setCategoryNames] = useState({
        beige: 'beige',
        accent: 'accent',
        green: 'green',
        grey: 'grey',
    });

    const handleSaveUserSettings = () => {
        const newLoginData = {
            username: username,
            password: password,
        }

        putData<{}, number>(`http://localhost:8080/settings/login`, newLoginData)();
    }

    const handleSaveCategorySettings = () => {
        putData<{}, number>(`http://localhost:8080/settings/category`, categoryNames)();
        categoryContext.updateCategoryNames(categoryNames)
        console.log("categoryNames", categoryNames)
    }

    const handleAccountDeletion = () => {
        deleteData(`http://localhost:8080/settings/deleteAccount`, {})();
        localStorage.removeItem('jwt');
        window.location.href = "/register";
    }

    const sumbitButton = {
        backgroundColor: '#EE7F3B',
        color: 'white',
        "&:hover": { backgroundColor: "#EE7F3B80" },
        width: '100%',
    }

    const dangerButton = {
        backgroundColor: '#C44536',
        color: 'white',
        "&:hover": { backgroundColor: "#C4453680" },
        width: '100%',
    }

    useEffect(() => {
        const categories = categoryContext.getCategoryNames();
        const updatedCategoryNames: { beige: string; accent: string; green: string; grey: string; } = {
            beige: categories.beige,
            accent: categories.accent,
            green: categories.green,
            grey: categories.grey,
        };
        setCategoryNames(updatedCategoryNames);
    }, []);

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
            <h3 className='title-label'>Category names </h3>
            {Object.entries(categoryNames).map(([category, value]) => {
                console.log(category, value);
                return (
                    <div className='category-container'>
                        <div className={`circleButton settings ${category}`} />
                        <TextField
                            key={category}
                            label={`Name for ${value}`}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={(e) =>
                                setCategoryNames((prevCategoryNames) => ({
                                    ...prevCategoryNames,
                                    [category]: e.target.value,
                                }))
                            }
                        />

                    </div>
                )
            })}
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
