import React, { useState } from 'react';
import { Button, Typography, Box, TextField, Snackbar, Alert } from '@mui/material';
import AppBarSelf from '../components/AppBarSelf';
import ImageListItem from '@mui/material/ImageListItem';

function UserFormInsertPage() {
  const [email, setEmail] = useState('');
  const [descr, setDescr] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const ingles = {
      email: email,
      descr: descr,
    };

    try {
      const response = await fetch('http://localhost:5000/api/v1/ingles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingles),
      });

      if (response.ok) {
        
        setEmail('');
        setDescr('');
        
        setOpenSnackbar(true);
      } else {        
        console.error('Error al enviar la información');
      }
    } catch (error) {      
      console.error('Error de conexión:', error);      
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const appBarButtonsUserForm = [
    { label: 'Página Principal', to: '/' },
    { label: 'Results', to: '/resultadosingles' },
  ];

  return (
    <div>
      <AppBarSelf title="Grupo de Desarrollo WEB" buttons={appBarButtonsUserForm} />

      {/* Contenido principal de la página debajo de la barra de navegación */}
      <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 4 }}>
        Image Description Activity
      </Typography>

      <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 2 }}>
        Describe the Image with your own words !
        <br/>Don't be shy, use at least 50 characters
      </Typography>
      

      <Box sx={{ mt: 0, display: 'flex', flexDirection: 'row', gap: 0, maxWidth: 1600, mx: 'auto', p: 3, alignItems: 'flex-start' }}> {/* Contenedor padre */}
        <Box sx={{ flex: 1, p: 3 }}> {/* Primer Box */}
          <ImageListItem>
            <img
              src="/assets/BBQ.PNG"
              alt="Friend's lunch"
              loading="lazy"
            />
          </ImageListItem>
        </Box>

        <Box component="form" onSubmit={handleFormSubmit} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, p: 3, alignItems: 'flex-end' }}> {/* Segundo Box */}
          <TextField
            id="email"
            label="Your email"
            variant="outlined"
            type="email"
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="descr"
            multiline
            rows={6}
            label="Description"
            variant="outlined"
            value={descr}
            fullWidth
            onChange={(e) => setDescr(e.target.value)}
          />
            <Typography variant="caption" color="textSecondary">
              Actual length {descr.length} characters
            </Typography>
          
            {descr.length > 50 && (
              <Box mt={2}> 
                <Button variant="contained" type="submit">
                  Send Answer
                </Button>
              </Box>
            )}
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Information sent successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
export default UserFormInsertPage;
