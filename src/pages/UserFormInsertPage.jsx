import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, TextField } from '@mui/material';


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

  return (
    <div>
      <h2>Alta usuario</h2>

      <Box component="form" onSubmit={handleFormSubmit}>
        Nombre:
        <TextField id="nombre" label="Outlined" variant="outlined" onChange={((e)=>setNombre(e.target.value))} />
        Edad:
        <TextField id="edad" label="Outlined" variant="outlined" onChange={((e)=>setEdad(e.target.value))} />

        <Button variant="contained" type="submit">
        Submit
        </Button>
        
        
        
      </Box>     

      <Button variant="contained" color="primary" onClick={goToHome}>
        Alta usuario
      </Button>
    </div>
  );
}
export default UserFormInsertPage;
