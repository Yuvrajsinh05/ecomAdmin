import { Grid } from '@mui/material';
import QuickStats from './components/server/quickstate';
import Overview from './components/overview';
import { getStateCalls } from './operations/reqCall';
import QuickStatsSkeleton from './Loaders/quickStateSkeletons';
import { Suspense } from 'react';
import CategoryPerformance from './components/client/performance';

export default async function Page() {
    const stateData = await getStateCalls()
    return (
        <Grid container spacing={3}>
            <Suspense fallback={<QuickStatsSkeleton />}>
                {stateData ? <QuickStats stateData={stateData} /> : <QuickStatsSkeleton />}
            </Suspense>
            <Grid container mt={0} spacing={2}>
                <Overview stateData={stateData} />
                    <CategoryPerformance />
            </Grid>
        </Grid>
    );
}
