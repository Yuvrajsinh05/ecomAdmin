import React from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText, styled } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomPaper = styled(Paper)({
  backgroundColor: '#1a1a1a',
  padding: '20px',
  borderRadius: '10px',
  position: 'relative',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
});

const data = [
  { category: 'Electronics', orders: 500, revenue: 50000 },
  { category: 'Clothing', orders: 300, revenue: 30000 },
  { category: 'Home & Garden', orders: 200, revenue: 20000 }
];

const CategoryPerformance = () => {
  return (
    <Grid item xs={12} md={6} lg={4.5} alignItems="center">
      <CustomPaper variant="outlined" square>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" align="center" gutterBottom sx={{ color: 'gray', flexGrow: 1 ,padding:'0.3rem' , backgroundColor:'#111113', borderRadius:'10px'}}>
            Category Performance
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
        <List sx={{ color: '#fff', mt: 2 }}>
          {data.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${item.category}: Total Orders: ${item.orders}, Total Revenue: $${item.revenue}`} />
            </ListItem>
          ))}
        </List>
      </CustomPaper>
    </Grid>
  );
}

export default CategoryPerformance;
