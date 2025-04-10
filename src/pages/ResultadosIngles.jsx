import React, { useEffect, useState } from 'react';
import { TextField , Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AppBarSelf from '../components/AppBarSelf';
import Paper from '@mui/material/Paper';
import { GoogleGenAI } from "@google/genai";
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';

const ResultadosIngles = () => {

  const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY});

    const appBarButtonsIngles = [
        { label: 'Home', to: '/' },
        { label: 'Go to Form', to: "/ingles" },        
      ];


    const [ingles, setIngles] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state

    const handleAI = () => {

    };

  useEffect(() => {
    // Define an async function to fetch the users
    const fetchIngles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/ingles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setIngles(data); // Set the users to state
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    };

    fetchIngles(); 
  }, []); 

  
  return (
    <div>

        <AppBarSelf title="Grupo Desarrollo WEB" buttons={appBarButtonsIngles} />

<TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><h2><b>Tipo</b></h2>&nbsp;</TableCell>
              <TableCell align="center"><h2><b>User's e-mail</b></h2>&nbsp;</TableCell>
              <TableCell align="center"><h2><b>Description</b></h2>&nbsp;</TableCell>
              <TableCell align="center"><h2><b>Date/Time</b></h2>&nbsp;</TableCell>
              <TableCell align="center"><h2><b>Teacher's Coments</b></h2>&nbsp;</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {ingles.map((ingles) => (
              <TableRow
                key={ingles.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{ingles.type}</TableCell>
                <TableCell align="center">{ingles.email}</TableCell>
                <TableCell align="center">{ingles.descr}</TableCell>
                <TableCell align="center">{ingles.time}</TableCell>

                <Button onClick={handleAI()} size="small" variant="text" type="submit" startIcon={<AutoAwesomeTwoToneIcon />}>
                
                </Button>

                <TextField
                    id="Coments"
                    label="Coments"
                    variant="outlined" 
                />

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {loading && <p>Loading...</p>} {/* Show loading if data is being fetched */}
      {error && <p>Error: {error}</p>} {/* Show error message if there was an error */}

    </div>
  );
};

export default ResultadosIngles;




