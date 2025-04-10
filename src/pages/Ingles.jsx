import React, {useState} from 'react';
import { Button, Typography, Box, TextField } from '@mui/material';
import AppBarSelf from '../components/AppBarSelf';
import ImageListItem from '@mui/material/ImageListItem';


function UserFormInsertPage() {
  const [email, setEmail] = useState("");
  const [descr, setDescr] = useState("");

  const handleFormSubmit = async (e) => {
  e.preventDefault();

  const ingles = {
    email: email,
    descr: descr
  }
  console.log(ingles)

  const response = await fetch('http://localhost:5000/api/v1/ingles', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify (ingles)
  } );

 }

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
      </Typography>
      {/* Otros elementos de la página */}

      <Box sx={{ mt: 0, display: 'flex', flexDirection: 'row', gap: 0, maxWidth: 1600, mx: 'auto', p: 3, alignItems: 'flex-start' }}> {/* Contenedor padre */}
          <Box sx={{flex: 1, p: 3 }}> {/* Primer Box */}
          <ImageListItem>
              <img 
              src="/assets/BBQ.PNG"
              alt="Hombre cortando el cesped"
              loading="lazy"
          />
          </ImageListItem>
          </Box>

        <Box component="form" onSubmit={handleFormSubmit} sx={{flex: 1, display: 'flex', flexDirection: 'column', gap: 2, p: 3, alignItems: 'flex-end' }}> {/* Segundo Box */}

          <TextField
            id="email"
            label="Your email"
            variant="outlined"
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

          <Button variant="contained" type="submit">
            Send Answer
          </Button>
        </Box>
      </Box>


    </div>
  );
}
export default UserFormInsertPage;
