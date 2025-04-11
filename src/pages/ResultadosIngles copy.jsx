import React, { useEffect, useState } from 'react';
import { TextField, Button, Modal, Box, Typography } from '@mui/material';
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
import { format } from 'date-fns';


const ResultadosIngles = () => {
  const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });

  const appBarButtonsIngles = [
    { label: 'Home', to: '/' },
    { label: 'Go to Form', to: "/ingles" },
  ];

  const [ingles, setIngles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAI = async (descr) => {
    console.log(descr)
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Analyze the following 
        description with 50 words max, grammatically and syntactically 
        based on English grammar rules, and sugest a best form: "${descr}"`,
      });
      console.log(response.text)
      setAnalysisResult(response.text);
      setModalOpen(true);
    } catch (error) {
      console.error('Error analyzing description:', error);
    }
  };

  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchIngles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/ingles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setIngles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIngles();
  }, []);

  const formatDateAndTime = (dateTimeString) => {
    try {
      // Intenta parsear la cadena de fecha. Ajusta el formato si es necesario.
      // Este formato intenta coincidir con "Thu Apr 10 2025 18:13:21 GMT+0200 (hora de verano de Europa central)"
      const parts = dateTimeString.split(' ');
      const mesAbreviado = parts[1];
      const dia = parseInt(parts[2], 10);
      const anio = parseInt(parts[3], 10);
      const horaMinSeg = parts[4];
      const [horaStr, minutoStr, segundoStr] = horaMinSeg.split(':');
      const hora = parseInt(horaStr, 10);
      const minuto = parseInt(minutoStr, 10);
      const segundo = parseInt(segundoStr, 10);

      const meses = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
      };
      const mesNumero = meses[mesAbreviado];

      const fechaObjeto = new Date(anio, mesNumero, dia, hora, minuto, segundo);
      return format(fechaObjeto, 'yyyy-MM-dd HH:mm:ss'); // Formato Año-Mes-Día Hora:Minuto:Segundo
      // O puedes usar otro formato como 'dd/MM/yyyy HH:mm'
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return dateTimeString; // Si hay un error, muestra la fecha original
    }
  };

  return (
    <div>
      <AppBarSelf title="Grupo Desarrollo WEB" buttons={appBarButtonsIngles} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell align="center"><h2><b>Tipo</b></h2></TableCell> */}
              <TableCell align="center"><h2><b>User's e-mail</b></h2></TableCell>
              <TableCell align="center"><h2><b>Description</b></h2></TableCell>
              <TableCell align="center"><h2><b>Date/Time</b></h2></TableCell>
              <TableCell align="center"><h2><b>Teacher's Comment</b></h2></TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {ingles.map((item) => (
              <TableRow key={item.id}>
                {/* <TableCell align="center">{item.type}</TableCell> */}
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.descr}</TableCell>
                <TableCell align="center">{formatDateAndTime(item.time)}</TableCell>

                <TableCell align="center">
                  <TextField
                    id="Coments"
                    label="Coments"
                    variant="outlined"
                  />
                  <Button
                    onClick={() => handleAI(item.descr)}
                    size="small"
                    
                    startIcon={<AutoAwesomeTwoToneIcon />}
                  >
                    
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* Modal for AI Analysis Result */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', maxWidth: 500 }}>
          <Typography variant="h6" component="h2">AI Analysis Result</Typography>
          <Typography>{analysisResult}</Typography>
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ResultadosIngles;





