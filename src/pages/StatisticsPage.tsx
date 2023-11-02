import { Grid } from '@mui/material';
import React from 'react';
import { NavigationMenu } from '../components/NavigationMenu/NavigationMenu';
import { DateFiltering } from '../components/Statistics/DateFiltering';
import { DonutChart } from '../components/Statistics/DonutChart';
import { BarChart } from '../components/Statistics/BarChart';
import { EnergyChart } from '../components/Statistics/EnergyChart';
import './StatisticsPage.css';

function StatisticsPage() {
    const categoryData = [
        ["Category", "Done Tasks", "Not done tasks"],
        ["Category 1", 100, 80],
        ["Category 2", 50, 60],
        ["Category 3", 70, 10],
        ["Category 4", 10, 90],
    ];

    const averageTimeData = [
        ["Category", "Average Time"],
        ["Category 1", 120],
        ["Category 2", 90],
        ["Category 3", 200],
        ["Category 4", 30],
    ];
    return (
        <div>
            <Grid container spacing={0}>
                <Grid xs={0.5} md={0.5}>
                    <NavigationMenu />
                </Grid>
                <Grid xs={4} md={6}>
                    <div className='column-container'>
                        <DateFiltering></DateFiltering>
                        <div className='chart-container'>
                        <DonutChart></DonutChart>


                        </div>
                        <div className='chart-container'>
                            <BarChart title={"Tasks per category"} data={categoryData}></BarChart>
                        </div>
                        
                    </div>
                </Grid>
                <Grid xs={4} md={5}>
                    <div className='column-container'>
                    <div className='chart-container timeline'>
                        <h5>Energy Levels</h5>
                        <EnergyChart></EnergyChart>
                    </div>
                    <div className='chart-container'>
                        <BarChart title={"Average estimated time per category"} data={averageTimeData}></BarChart>
                    </div>

                        
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default StatisticsPage;