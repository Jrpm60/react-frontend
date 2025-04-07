import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';


const Coches = () => {
  const [coches, setCoches] = useState([]);

  useEffect(() => {
    // Fetch the message from the Express API
    fetch('http://localhost:5000/api/v1/coches')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCoches(data); 
      })
      .catch(error => {
        console.error('Error fetching the message:', error);
      });
  }, []); 

const handleVer =(id) => {

}

const handleModi =(id) => {
    
}

const handleDel =(id) => {
    fetch(`http://localhost:500/api/v1/coches/${id}`, {method: 'DELETE', });
    console.log(`El coche con id ${id} ha sido eliminadol`);    
}

  return (
    <div>
      <h1>Listado de Coches</h1>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"><h2><b>Id</b></h2>&nbsp;</TableCell>
            <TableCell align="right"><h2><b>Marca</b></h2>&nbsp;</TableCell>
            <TableCell align="right"><h2><b>Modelo</b></h2>&nbsp;</TableCell>
            <TableCell align="right"><h2><b>Año</b></h2>&nbsp;</TableCell>
            <TableCell align="right"><h2><b>Accion</b></h2>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coches.map((coche) => (
            <TableRow
              key={coche.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="right">{coche.id}</TableCell>
              <TableCell align="right">{coche.marca}</TableCell>
              <TableCell align="right">{coche.modelo}</TableCell>
              <TableCell align="right">{coche.año}</TableCell>
              <TableCell align="right">
                <Box sx={{ '& button': { m: 0 } }}>
    

                    <div>
                        <Button 
                            onClick={() => handleVer(coche.id)}
                            variant="outlined" 
                            startIcon={<RemoveRedEyeIcon />}>        
                        </Button>
                        
                        <Button 
                            onClick={() => handleModi(coche.id)}
                            variant="outlined" 
                            startIcon={<AutoFixHighIcon />}>
                        </Button>

                        <Button 
                            onClick={() => handleDel(coche.id)}
                            variant="outlined" 
                            startIcon={<DeleteIcon />}>
                        </Button>
                
                    </div>            
        
                </Box>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    
    </div>
  );
};

export default Coches;