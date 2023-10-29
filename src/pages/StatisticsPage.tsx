import { Grid } from '@mui/material';
import React from 'react';
import { NavigationMenu } from '../components/NavigationMenu/NavigationMenu';
import { DateFiltering } from '../components/Statistics/DateFiltering';
import { DonutChart } from '../components/SharedComponents/DonutChart';
import { BarChart } from '../components/SharedComponents/BarChart';

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
                        <DonutChart></DonutChart>
                        <BarChart></BarChart>
                    </div>
                </Grid>
                <Grid xs={4} md={5}>
                <div className='column-container'>Column 2
                        

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default StatisticsPage;