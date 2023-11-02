import React from "react";
import { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button } from "@mui/material";
import './DateFiltering.css';
import { putData } from "../../utils/fetchUtils";


export function DateFiltering() {
    const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(1, 'month'));
    const [endDate, setEndDate] = useState<Dayjs>(dayjs());

    const handleStartDateChange = (date: any) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: any) => {
        setEndDate(date);
    };

    const subtasksButton = {
        backgroundColor: '#EE7F3B',
        color: 'white',
        "&:hover": {backgroundColor: "#F8DEB3"},
        // width: '100%',
    }

    function updateDateRange() {
        // a moze get?
        // putData<{}, number>(`http://localhost:8080/dateRange`, { "startDate": startDate, "endDate": endDate })();
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="container">
            <DatePicker
                value={startDate}
                onChange={handleStartDateChange}
                format="DD/MM/YY"
            />
            <div className="label"> - </div>
            <DatePicker
                value={endDate}
                onChange={handleEndDateChange}
                minDate={startDate}
                format="DD/MM/YY"
            />
            <Button sx={subtasksButton} disabled={endDate < startDate} onClick={() => updateDateRange()}>Update</Button>
        </div>
        </LocalizationProvider>
    )
}