"use client"

import React, { useEffect, useMemo, useState } from 'react';
import { Grid, Paper, Typography, styled, keyframes } from '@mui/material';
import { ChatBubbleOutline as ChatIcon } from '@mui/icons-material';
import io from 'socket.io-client';




console.log("where this is beigh serverd")
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CustomPaper = styled(Paper)({
  backgroundColor: '#1a1a1a',
  padding: '20px',
  borderRadius: '10px',
  position: 'relative',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
});

const ChatBubble = styled('div')({
  backgroundColor: '#333',
  color: '#fff',
  padding: '10px',
  borderRadius: '10px',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  animation: `${fadeIn} 0.5s ease`,
});

const ChatText = styled('div')({
  marginLeft: '10px',
});




const RecentActivity = () => {
  const [recentLogs, setRecentLogs] = useState([])
  const activities = [
    { type: 'New product added', details: 'Product A added by John Doe', timestamp: '16/Nov/2023:23:57:36 +0000' },
    { type: 'User deleted', details: 'User "Jane Smith" deleted', timestamp: '16/Nov/2023:23:57:36 +0000' },
    { type: 'New user added', details: 'New user "Emily Johnson" added', timestamp: '16/Nov/2023:23:57:39 +0000' },
    { type: 'Product added', details: 'Product B added by Jane Doe', timestamp: '16/Nov/2023:23:57:39 +0000' },
  ];

  useEffect(() => {
    const socket = io('http://localhost:8670');

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('onRecentLog', (replymes) => {
      console.log("replymes", replymes);
      setRecentLogs(replymes);
    });

    return () => {
      console.log("Disconnecting..", socket);
      socket.disconnect();
    };
  }, []);

  return (
    <Grid item xs={12} md={12} mt={2}>
      <CustomPaper variant="outlined" square>
        {recentLogs.map((activity, index) => (
          <div key={index}>
            <ChatBubble>
              <ChatIcon sx={{ color: '#fff', marginRight: '10px' }} />
              <ChatText sx={{ width: '100%' }}>
                <Typography variant="body1" sx={{ color: 'white', width: '100%' }}>
                  {activity}
                </Typography>
              </ChatText>
            </ChatBubble>
          </div>
        ))}
      </CustomPaper>
    </Grid>
  );
}

export default RecentActivity;
