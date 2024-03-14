"use client";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Handle login logic here
    alert('Logging in...');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Typography variant="h5" component="h3" sx={{ textAlign: 'center', marginBottom: '2rem', letterSpacing: '2px' }}>
        Admin Login
      </Typography>

      <Box
        component="section"
        sx={{
          width: '50%',
          margin: 'auto',
          p: 4,
          border: '1px dashed grey',
          backgroundColor: 'background.paper',
          borderRadius: '8px',
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
          position: 'relative',
        }}
      >
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="input-username" sx={{ color: 'primary.main', letterSpacing: '1px' }}>Username</InputLabel>
          <Input
            id="input-username"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle sx={{ color: 'primary.main' }} />
              </InputAdornment>
            }
            placeholder="Enter your username"
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2, mt: 3 }}>
          <InputLabel htmlFor="input-password" sx={{ color: 'primary.main', letterSpacing: '1px' }}>Password</InputLabel>
          <Input
            id="input-password"
            type={showPassword ? 'text' : 'password'}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon sx={{ color: 'primary.main' }} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {showPassword ? (
                  <VisibilityOffIcon sx={{ color: 'primary.main', cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                ) : (
                  <VisibilityIcon sx={{ color: 'primary.main', cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                )}
              </InputAdornment>
            }
            placeholder="Enter your password"
          />
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <Fab
            color="primary"
            aria-label="login"
            sx={{
              backgroundColor: '#ff5722',
              '&:hover': {
                backgroundColor: '#bf360c',
              },
            }}
            onClick={handleLogin}
          >
            <SendIcon />
          </Fab>
        </Box>

      </Box>
    </ThemeProvider>
  );
}
