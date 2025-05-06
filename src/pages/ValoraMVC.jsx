import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, TextField, Snackbar, Alert, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import Rating from '@mui/material/Rating';
import AppBarSelf from '../components/AppBarSelf';

function EventValoracionInsert() {
  const [event, setEvent] = useState({});
  const [stars, setStars] = useState(0);
  const [opinion, setOpinion] = useState('');
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
  const [openSnackbarError, setOpenSnackbarError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = React.useState(0); // Inicializamos value con 0

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
        setErrorMessage('Error al cargar la información del evento.');
        setOpenSnackbarError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
    setStars(newValue);
    console.log(newValue);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!event?.id) {
      console.error('El ID del evento no está disponible.');
      setErrorMessage('El ID del evento no se ha cargado correctamente.');
      setOpenSnackbarError(true);
      return;
    }

    if (opinion.trim().length < 30) {
      setErrorMessage('Por favor, escribe una opinión de al menos 30 caracteres.');
      setOpenSnackbarError(true);
      return;
    }

    const valorEvent = {
      eventId: event.id,
      stars: stars,
      opinion: opinion.trim(), // Limpiamos la opinión de espacios al inicio y al final
    };

    try {
      const response = await fetch('http://localhost:5000/api/v1/events/valoraciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valorEvent),
      });

      if (response.ok) {
        setStars(0);
        setOpinion('');
        setValue(0);
        setOpenSnackbarSuccess(true);
      } else {
        console.error('Error al enviar la información:', response);
        const errorData = await response.json();
        console.error('Detalles del error:', errorData);
        setErrorMessage('Error al enviar la valoración. Inténtalo de nuevo.');
        setOpenSnackbarError(true);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setErrorMessage('Error de conexión con el servidor.');
      setOpenSnackbarError(true);
    }
  };

  const handleCloseSnackbarSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbarSuccess(false);
  };

  const handleCloseSnackbarError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbarError(false);
  };

  const appBarButtonsUserForm = [
    { label: 'Página Principal', to: '/' },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <div>
        <AppBarSelf title="Mern/react-frontend/pages/ValoraMVC.jsx" buttons={appBarButtonsUserForm} />
        <Typography variant="h6" color="error" align="center" sx={{ mt: 2 }}>
          {errorMessage || 'Error al cargar la información.'}
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <AppBarSelf title="Mern/react-frontend/pages/ValoraMVC.jsx" buttons={appBarButtonsUserForm} />

      <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 4 }}>
        Valora el evento
      </Typography>

      <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 2 }}>
        Tu feedback nos ayuda a mejorar !
      </Typography>

      <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 2 }}>
        Usa al menos 30 caracteres !
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'row', gap: 3, maxWidth: 1200, mx: 'auto', p: 3, alignItems: 'flex-start' }}>
        <Card sx={{ flex: 1, p: 2 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Información del Evento:
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Título: {event.title}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Fecha: {event.date}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Ubicación: {event.location}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Descripción: {event.description}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box component="form" onSubmit={handleFormSubmit} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, p: 3, alignItems: 'flex-end' }}>
          <Typography component="legend">Valora el Evento</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={handleRatingChange}
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

          {opinion.length >= 30 && (
            <Box mt={2}>
              <Button variant="contained" type="submit">
                Enviar Valoracion
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Snackbar
        open={openSnackbarSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbarSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbarSuccess} severity="success" sx={{ width: '100%' }}>
          Valoración enviada correctamente!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackbarError}
        autoHideDuration={5000}
        onClose={handleCloseSnackbarError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbarError} severity="error" sx={{ width: '100%' }}>
          {errorMessage || 'Ha ocurrido un error.'}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EventValoracionInsert;
