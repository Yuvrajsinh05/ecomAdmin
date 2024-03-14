"use client"
import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import QuickStats from './components/quickstate';
import Overview from './components/overview';
import CategoryPerformance from './components/performance';
import { getStateCalls } from './reqCall';

export default function Page() {
    const [stateData , setStateData] = useState([])

    useEffect(()=>{
        ApiCaller()
    },[])

    async function ApiCaller(){
        const statData = await getStateCalls()
        if(statData?.status==200){
            setStateData(statData?.data)
        }
    }

    console.log("stateData",stateData)
    return (
        <Grid container spacing={3}>
            <QuickStats stateData={stateData} />
            <Grid container mt={0} spacing={2}>
                <Overview stateData={stateData} />
                <CategoryPerformance />
            </Grid>

        </Grid>
    );
}
