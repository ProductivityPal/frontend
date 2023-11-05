import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavigationMenu } from '../components/NavigationMenu/NavigationMenu';
import { DateFiltering } from '../components/Statistics/DateFiltering';
import { DonutChart } from '../components/Statistics/DonutChart';
import { BarChart } from '../components/Statistics/BarChart';
import { EnergyChart } from '../components/Statistics/EnergyChart';
import './StatisticsPage.css';
import { fetchData } from '../utils/fetchUtils';
import dayjs, { Dayjs } from 'dayjs';
import { Stats, StatsCategory } from '../types/Stats';

function StatisticsPage() {
    const [doneTasks, setDoneTasks] = useState(0)
    const [undoneTasks, setUndoneTasks] = useState(0)
    const [categoryTasks, setCategoryTasks] = useState<any[]>([])
    const [averageTimeTasks, setAverageTimeTasks] = useState<any[]>([])


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
    useEffect(() => {
        const queryParams = {
            start_date: String(dayjs().subtract(1, 'month').format('YYYY-MM-DD')) + "T00:00",
            end_date: String(dayjs().format('YYYY-MM-DD')) + "T23:59",
        };
        const fetchStatistics2 = fetchData<Stats>('http://localhost:8080/statistic', queryParams);

        fetchStatistics2((stats: Stats) => {
            setDoneTasks(stats.done)
            setUndoneTasks(stats.undone)

            const categoryTasks = stats.categories.map((sc) => ([
                sc.name,
                sc.done,
                sc.undone,
            ]))
            setCategoryTasks(categoryTasks);

            const averageTimeTasks = stats.categories.map((sc) => ([
                sc.name,
                sc.averageEstimatedTime,
                sc.averageCompletionTime,
            ]))
            setAverageTimeTasks(averageTimeTasks);
        })
        console.log("STATY: ", categoryTasks, averageTimeTasks)

    }, []);
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
                            <DonutChart doneTasks={doneTasks} undoneTasks={undoneTasks}></DonutChart>


                        </div>
                        <div className='chart-container'>
                            {categoryTasks.length > 0 && <BarChart title={"Tasks per category"} data={categoryTasks}></BarChart>}
                            {categoryTasks.length == 0 && <h1 className='title'>No Data yet</h1>}
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
                            {averageTimeTasks.length > 0 && <BarChart title={"Average estimated time per category"} data={averageTimeTasks}></BarChart>}
                            {averageTimeTasks.length == 0 && <h1 className='title'>No Data yet</h1>}
                        </div>


                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default StatisticsPage;