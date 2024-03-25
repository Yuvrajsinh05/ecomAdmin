import React from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Skeleton } from '@mui/material';
import { Category, Store, ShoppingBasket, Person, Receipt, MonetizationOn } from '@mui/icons-material';

const QuickStatsSkeleton = () => {
  const paperStyle = {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: '5px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
    transition: 'transform 0.3s ease',
  };

  const hoverEffect = {
    '&:hover': {
      transform: 'scale(1.05)',
    },
  };

  return (
    <Grid container spacing={2}>
      {[...Array(6)].map((_, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
          <Paper variant="outlined" square style={{ ...paperStyle, ...hoverEffect }}>
            <List>
              <ListItem>
                <ListItemIcon>
                  {index === 0 && <Category style={{ color: '#ffa500' }} />}
                  {index === 1 && <Store style={{ color: '#00ff00' }} />}
                  {index === 2 && <ShoppingBasket style={{ color: '#ff00ff' }} />}
                  {index === 3 && <Person style={{ color: '#00ffff' }} />}
                  {index === 4 && <Receipt style={{ color: '#ff0000' }} />}
                  {index === 5 && <MonetizationOn style={{ color: '#ffff00' }} />}
                </ListItemIcon>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {index === 0 ? (
                    <>
                      <ListItemText primary={<Skeleton width={100} variant="text" />} />
                      <ListItemText primary={<Skeleton variant="text" />} />
                    </>
                  ) : (
                    <>
                      <ListItemText primary={<Skeleton  width={100} variant="text" />} sx={{ color: 'rgba(255,255,255,0.5)' }} />
                      <ListItemText primary={<Skeleton variant="text" />} sx={{ color: 'rgba(255,255,255,0.5)' }} />
                    </>
                  )}
                </div>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickStatsSkeleton;
