import React, { useState } from 'react';
import { Box, TextField, Button, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppBarSelf from '../components/AppBarSelf';


function LogIn() {

    const appBarButtonsHome = [
        { label: 'Página Principal', to: '/' },
    ];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para la navegación

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log('Inicio de sesión con:', { email, password });
    
  };

  return (

    <div>

    <AppBarSelf title="Mern/Reacrt/Pages/Login.jsx" buttons={appBarButtonsHome} />

    <Box
  
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: 3,
        maxWidth: 400,
        margin: 'auto',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Registro Inicial
      </Typography>
      <TextField
        label="Correo Electrónico"
        type="email"
        fullWidth
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        value={password}
        onChange={handlePasswordChange}
      />
      <Button type="submit" variant="contained" fullWidth onClick={handleSubmit}>
        Registro
      </Button>

    </Box>

    </div>
  );
}

export default LogIn;