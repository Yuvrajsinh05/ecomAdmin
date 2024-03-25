"use client"

import React, {  useState } from 'react';
import { Typography, List, ListItem, ListItemText, IconButton, Modal, Backdrop, Fade, Box } from '@mui/material';
import { ChatOutlined, Close } from '@mui/icons-material';



export const Chats = () =>{
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return(
        <>
        
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
        <Modal
        open={open}
        onClose={handleClose}
        sx={{ border: '2px solid red', width: '50%', margin: 'auto' }}
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
        </>
    )
}