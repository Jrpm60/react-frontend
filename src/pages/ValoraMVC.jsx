import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, TextField, TableCell, Snackbar, Alert} from '@mui/material';
import Rating from '@mui/material/Rating';
import AppBarSelf from '../components/AppBarSelf';


function EventValoracionInsert() {
  const [event, setEvent] = useState({});
  const [stars, setStars] = useState('');
  const [opinion, setOpinion] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = React.useState();


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/events/ad149462-f4df-457b-b722-067e4f0d5001');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const valorEvent = {
      stars: stars,
      opinion: opinion,
    };

    try {
      const response = await fetch('http://localhost:5000/api/v1/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opinion),
      });

      if (response.ok) {
        
        setStars('');
        setOpinion('');
        
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
    
  ];

  return (
    <div>
      <AppBarSelf title="Mern/react-frontend/pages/ValoraMVC.jsx" buttons={appBarButtonsUserForm} />

      {/* Contenido principal de la página debajo de la barra de navegación */}
      <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 4 }}>
        Valora el evento
      </Typography>

      <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 2 }}>
        Tu feed back nos ayuda a mejorar !
      </Typography>

      <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 2 }}>
        Usa al menos 30 caracteres !
      </Typography>
      

      <Box sx={{ mt: 0, display: 'flex', flexDirection: 'row', gap: 0, maxWidth: 1600, mx: 'auto', p: 3, alignItems: 'flex-start' }}> {/* Contenedor padre */}
               
        <Box sx={{ flex: 1, p: 3 }}> {/* Informacion del Evento a valorar */} 
                     
            <TableCell align="center">{event.title}</TableCell> <br/>
            <TableCell align="center">{event.date}</TableCell> <br/>
            <TableCell align="center">{event.location}</TableCell> <br/>
            <TableCell align="center">{event.description}</TableCell> <br/>
                             
        </Box>

        <Box component="form" onSubmit={handleFormSubmit} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, p: 3, alignItems: 'flex-end' }}> {/* Segundo Box */}
        
        <Typography component="legend">Valora el Evento</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              console.log(value)
            }}
        />
            
            
            
            <TextField
              id="opinion"
              multiline
              rows={6}
              label="Tu Opinion"
              variant="outlined"
              value={opinion}
              fullWidth
              onChange={(e) => setOpinion(e.target.value)}
            />
            <Typography variant="caption" color="textSecondary">
              Actual length {opinion.length} characters
            </Typography>
          
            {opinion.length > 50 && (
              <Box mt={2}> 
                <Button variant="contained" type="submit">
                  Enviar Valoracion
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
export default EventValoracionInsert;
