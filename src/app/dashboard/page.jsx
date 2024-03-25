
import { Grid } from '@mui/material';
import QuickStats from './components/quickstate';
import Overview from './components/overview';
import { getStateCalls } from './reqCall';
import QuickStatsSkeleton from './Loaders/quickStateSkeletons';
import { Suspense } from 'react';

export default async function Page() {
    const stateData = await getStateCalls()
    console.log("stateData", stateData)
    return (
        <Grid container spacing={3}>
            <Suspense fallback={<QuickStatsSkeleton />}>
                {stateData ? <QuickStats stateData={stateData} /> : <QuickStatsSkeleton />}
            </Suspense>
            <Grid container mt={0} spacing={2}>
                <Overview stateData={stateData} />
            </Grid>
        </Grid>
    );
}



//\
//         <CategoryPerformance />
//    