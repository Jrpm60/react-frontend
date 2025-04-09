import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box, TextField } from '@mui/material';


function UserFormInsertPage() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");


  const navigate = useNavigate();

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

  const goToHome = () => {
    navigate("/");
  }

  const goToUsers = () => {
  navigate("/users");
 }

  return (
    <div>

      <AppBar position="static"> {/* 'fixed' para que se quede en la parte superior al hacer scroll */}
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}> {/* flexGrow hace que el título ocupe el espacio restante */}
            Desarrollo WEB _ UserFormInsertPage.jsx
          </Typography>
          <Button color="inherit" onClick={goToHome}>
            Pagina Principal
          </Button>
          <Button color="inherit" onClick={goToUsers}>
            Usuarios
          </Button>
          {/* Aquí irán los futuros botones de navegación */}
        </Toolbar>
      </AppBar>
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
