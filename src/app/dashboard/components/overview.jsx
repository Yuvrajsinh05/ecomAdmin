"use client"

import { Grid, Paper, Typography, styled } from '@mui/material';
import RecentActivity from './server/orders';

import { Addproduct } from './client/addproduct';
import { Chats } from './client/chats';
import { Suspense } from 'react';
import { WiseProducts } from './server/wiseprods';
import { WiseProdSkeleton } from '../Loaders/wiseProdsSkeleton';

const CustomPaper = styled(Paper)({
  backgroundColor: '#1a1a1a',
  padding: '20px',
  borderRadius: '10px',
  position: 'relative',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
});

const Overview = () => {
  return (
    <Grid item xs={12} md={6} lg={7.5} sx={{ borderRadius: '20px' }}>
      <CustomPaper variant="outlined" square>
        <Typography variant="h6" align="center" gutterBottom sx={{ color: 'gray', padding: '0.3rem', backgroundColor: '#111113', borderRadius: '10px' }}>
          Overview
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Suspense fallback={<WiseProdSkeleton/>}>
              <WiseProducts />
            </Suspense>

          </Grid>
          <Grid item xs={12} md={4}>
            <Chats />
          </Grid>
          <Grid item xs={12} md={4}>
            <Addproduct />
          </Grid>
        </Grid>
      </CustomPaper>
      <Suspense fallback={"wait mother fuckr calling "}>
        <RecentActivity />
      </Suspense>

    </Grid>
  );
}

export default Overview;
