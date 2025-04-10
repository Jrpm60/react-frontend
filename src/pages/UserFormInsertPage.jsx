import React, {useState} from 'react';
import { Button, Typography, Box, TextField } from '@mui/material';
import AppBarSelf from '../components/AppBarSelf';


function UserFormInsertPage() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");

 const handleFormSubmit = async (e) => {
  e.preventDefault();

  // ya tenemos nombre, edad

  const user = {
    nombre: nombre,
    edad: edad
  }

  // fecht POST y pasar user como cuerpo
  const response = await fetch('http://localhost:5000/api/v1/users', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify (user)
  } );

  console.log(response)

  console.log("Mandar fetch")
 }

 const appBarButtonsUserForm = [
  { label: 'Página Principal', to: '/' },
  { label: 'Usuarios', to: '/users' },
  
];

  return (
    <div>

      <AppBarSelf title="Mern/Reacrt/Pages/UserForm.jsx" buttons={appBarButtonsUserForm} />

      {/* Contenido principal de la página debajo de la barra de navegación */}
      <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 4 }}>
        Alta Nuevo Usuario
      </Typography>
      {/* Otros elementos de la página */}


      <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', p: 3 }}>
        <TextField
          id="nombre"
          label="Nombre"
          variant="outlined"
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          id="edad"
          label="Edad"
          variant="outlined"
          fullWidth
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />

        <Button variant="contained" type="submit">
          Guardar Usuario
        </Button>
      </Box>


    </div>
  );
}
export default UserFormInsertPage;
