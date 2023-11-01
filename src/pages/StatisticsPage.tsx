import { Grid } from '@mui/material';
import React from 'react';
import { NavigationMenu } from '../components/NavigationMenu/NavigationMenu';
import { DateFiltering } from '../components/Statistics/DateFiltering';
import { DonutChart } from '../components/Statistics/DonutChart';
import { BarChart } from '../components/Statistics/BarChart';
import { LineChart } from '../components/Statistics/LineChart';
import './StatisticsPage.css';

function StatisticsPage() {
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
                            <BarChart></BarChart>

                        </div>
                        
                    </div>
                </Grid>
                <Grid xs={4} md={5}>
                    <div className='column-container'>
                    <div className='chart-container'>
                        <LineChart></LineChart>
                    </div>

                        
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default StatisticsPage;