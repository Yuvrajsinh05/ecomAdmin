import React from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Category, Store, ShoppingBasket, Person, Receipt, MonetizationOn } from '@mui/icons-material';
import { BrandsCount, productCount } from '../operations/operation';

const QuickStats = ({stateData}) => {
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
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <Paper variant="outlined" square style={{ ...paperStyle, ...hoverEffect }}>
 
          <List>
            <ListItem>
              <ListItemIcon>
                   <Category style={{ color: '#ffa500' }} />
              </ListItemIcon>
              <div style={{display:'ruby'}}>
              <ListItemText  primary={`Total Categories `} /><br/>
              <ListItemText  primary={`${stateData?.cateBrandCount?.length} `} />
              </div>
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <Paper variant="outlined" square style={{ ...paperStyle, ...hoverEffect }}>
          <List>
            <ListItem>
              <ListItemIcon>
              <Store style={{ color: '#00ff00' }} />
              </ListItemIcon>
              <div style={{display:'ruby'}}>
              <ListItemText  primary={`Total Brands`} /><br/>
              <ListItemText  primary={BrandsCount(stateData)} />
              </div>
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <Paper variant="outlined" square style={{ ...paperStyle, ...hoverEffect }}>
          <List>
            <ListItem>
              <ListItemIcon>
              <ShoppingBasket style={{ color: '#ff00ff' }} />
              </ListItemIcon>
              <div style={{display:'ruby'}}>
              <ListItemText  primary={`Total Products`} /><br/>
              <ListItemText  primary={productCount(stateData)} />
              </div>
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <Paper variant="outlined" square style={{ ...paperStyle, ...hoverEffect }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Person style={{ color: '#00ffff' }} />
              </ListItemIcon>
              <div style={{display:'ruby'}}>
              <ListItemText  primary={`Total Users `} /><br/>
              <ListItemText  primary={`${stateData?.TotalUsers} `} />
              </div>
   
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <Paper variant="outlined" square style={{ ...paperStyle, ...hoverEffect }}>
          <List>
            <ListItem>
              <ListItemIcon>
              <Receipt style={{ color: '#ff0000' }} />
              </ListItemIcon>
              <div style={{display:'ruby'}}>
              <ListItemText  primary={`Total Orders `} /><br/>
              <ListItemText  primary={`${stateData?.ordersCount} `} />
              </div>
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <Paper variant="outlined" square style={{ ...paperStyle, ...hoverEffect }}>
          <List>
            <ListItem>
              <ListItemIcon>
              <MonetizationOn style={{ color: '#ffff00' }} />
              </ListItemIcon>
              <div style={{display:'ruby'}}>
              <ListItemText  primary={`Total Orders `} /><br/>
              <ListItemText  primary={`${stateData?.TotalAmount} `} />
              </div>
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default QuickStats;
