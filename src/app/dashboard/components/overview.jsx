"use client"

import React, { Suspense, useState } from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText, IconButton, Modal, Backdrop, Fade, Box, styled ,Button } from '@mui/material';
import { ShoppingCartOutlined, ChatOutlined, AddCircleOutline, TrendingUp, Close } from '@mui/icons-material';
import DiamondIcon from '@mui/icons-material/Diamond';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import DevicesIcon from '@mui/icons-material/Devices';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import RecentActivity from './orders';
import { ProdCountWrtCate } from '../operations/operation';
import axios from 'axios';
import { useRouter } from 'next/navigation'

const CustomPaper = styled(Paper)({
  backgroundColor: '#1a1a1a',
  padding: '20px',
  borderRadius: '10px',
  position: 'relative',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
});

const Overview = ({stateData}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function createProduct(){
    const GPTcreateProfuct =  await axios.get('http://localhost:3000/api/createproduct')
    console.log("GPTcreateProfuct",GPTcreateProfuct)
    if(GPTcreateProfuct.status==200){
      router.push('/products')
      router.refresh()
    }
  }

  return (

    <Grid item xs={12} md={6} lg={7.5} sx={{ borderRadius: '20px' }}>
      <CustomPaper variant="outlined" square>
        <Typography variant="h6" align="center" gutterBottom sx={{ color: 'gray',padding:'0.3rem' , backgroundColor:'#111113', borderRadius:'10px' }}>
          Overview
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ borderRight: '1px solid #555', paddingRight: '20px' }}>
              <Typography variant="subtitle1" sx={{ color: '#fff'  }}>Category-wise Products</Typography>
              <List>
                <ListItem>
                  <DiamondIcon style={{ color: '#ffcc33', marginRight: '1rem' }} />
                  <ListItemText primary={`Fashion : ${ProdCountWrtCate(stateData,"Fashion")}`} sx={{ color: '#fff' }} />
                </ListItem>
                <ListItem>
                  <AddReactionIcon style={{ color: '#ffcc33', marginRight: '1rem' }} />
                  <ListItemText primary={`Beauty : ${ProdCountWrtCate(stateData,"Beauty")} `} sx={{ color: '#fff' }} />
                </ListItem>
                <ListItem>
                  <DevicesIcon style={{ color: '#ffcc33', marginRight: '1rem' }} />
                  <ListItemText primary={`Electronics : ${ProdCountWrtCate(stateData,"Electronics")} `} sx={{ color: '#fff' }} />
                </ListItem>
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ borderRight: '1px solid #555', paddingRight: '20px' }}>
              <Typography variant="subtitle1" sx={{ color: '#fff' }}>New Chats</Typography>
              <List>
                <ListItem button onClick={handleOpen}>
                  <ChatOutlined style={{ color: '#00b0ff', marginRight: '1rem' }} />
                  <ListItemText primary="Support : 5" sx={{ color: '#fff' }} />
                </ListItem>
                <ListItem>
                  <ChatOutlined style={{ color: '#00b0ff', marginRight: '1rem' }} />
                  <ListItemText primary="Contact : 3" sx={{ color: '#fff' }} />
                </ListItem>
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="subtitle1" sx={{ color: '#fff' }}>New Products</Typography>
              <List>
                <ListItem>
                  <Button variant="outlined" onClick={createProduct} startIcon={<AddCircleOutline style={{ color: '#00e676' }} />} sx={{ color: '#00e676', borderColor: '#00e676', textTransform: 'none' ,width:'100%' }}>Add Product</Button>
                </ListItem>
                <ListItem>
                  <NewReleasesIcon style={{ color: '#ff3d00', marginRight: '1rem' }} />&nbsp;
                  <ListItemText primary="Pending Pre-Approval : 10" sx={{ color: '#fff' }} />
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      </CustomPaper>
      <Suspense fallback={"wait mother fuckr calling "}>
         <RecentActivity />
      </Suspense>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{border:'2px solid red' , width:'50%', margin:'auto'}}
        aria-labelledby="chat-reply"
        aria-describedby="chat-reply-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '8px', maxWidth: '300px', margin: 'auto', marginTop: '100px', position: 'relative' }}>
            <IconButton aria-label="close" sx={{ position: 'absolute', top: '5px', right: '5px' }} onClick={handleClose}>
              <Close style={{ color: '#fff' }} />
            </IconButton>
            <Typography variant="h6" align="center" id="chat-reply" sx={{ color: '#fff' }}>New Chat Reply</Typography>
            <Typography variant="body1" id="chat-reply-description" sx={{ color: '#fff' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</Typography>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
}

export default Overview;
