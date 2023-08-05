import React, { useState, useContext } from 'react';
import { CurrentTaskView } from './CurrentTaskView';
import { NextTaskView } from './NextTaskView';
import './CurrentTaskPanel.css';

export function CurrentTaskPanel() {
    return (
        <div>
            <CurrentTaskView/>
            <NextTaskView/>


        </div>
    );
}