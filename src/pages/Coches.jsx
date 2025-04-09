import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CarsSummaryComponent from '../components/CarsSummaryComponent'

const Coches = () => {
  const [coches, setCoches] = useState([]);
  const [selectedCoche, setSelectedCoche] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [editedCoche, setEditedCoche] = useState(null);
  const [newCoche, setNewCoche] = useState({ marca: '', modelo: '', año: '', color: '', puertas: '', precio: '' }); // Inicializar newCoche
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [cocheToDelete, setCocheToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();
  
  const goToHome = () => {
    navigate("/");
  }

  // llamada a EXPRES donde estan los datos Capa de NEGOCIO
  useEffect(() => {
    fetch('http://localhost:5000/api/v1/coches')
      .then((response) => response.json())
      .then((data) => setCoches(data))
      .catch((error) => console.error('Error fetching coches:', error));
  }, []);
  // ------------------------------------------------------


  const handleVer = (_id) => {
    const coche = coches.find((coche) => coche._id === _id);
    setSelectedCoche(coche);
    setOpenDialog(true);
  };

  const handleModi = (_id) => {
    const coche = coches.find((coche) => coche._id === _id);
    setEditedCoche(coche);
    setIsEditing(true);
  };

  const handleOpenNewDialog = () => {
    setIsNew(true);
    setNewCoche({ marca: '', modelo: '', año: '', color: '', puertas: '', precio: '' }); // Reiniciar el formulario
  };

  const handleCloseNewDialog = () => {
    setIsNew(false);
  };

  const handleNewInputChange = (event) => {
    const { name, value } = event.target;
    setNewCoche({ ...newCoche, [name]: value });
  };

  const handleSaveNew = () => {
    if (!newCoche.marca || !newCoche.modelo || !newCoche.año || !newCoche.color || !newCoche.puertas || !newCoche.precio) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    fetch('http://localhost:5000/api/v1/coches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCoche),
    })
      .then((response) => response.json()) // Esperar la respuesta JSON del servidor
      .then((data) => {
        alert('Alta realizada con éxito');
        setCoches([...coches, data]); // Añadir el nuevo coche a la lista
        setIsNew(false);
        setNewCoche({ marca: '', modelo: '', año: '', color: '', puertas: '', precio: '' }); // Limpiar el formulario
      })
      .catch((error) => console.error('Error al dar de alta el coche:', error));
  };

  const handleSave = () => {
    if (!editedCoche || !editedCoche.marca || !editedCoche.modelo || !editedCoche.año || !editedCoche.color || !editedCoche.puertas || !editedCoche.precio) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    fetch(`http://localhost:5000/api/v1/coches/${editedCoche.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        marca: editedCoche.marca,
        modelo: editedCoche.modelo,
        año: editedCoche.año,
        color: editedCoche.color,
        puertas: editedCoche.puertas,
        precio: editedCoche.precio,
      }),
    })
      .then(() => {
        alert('Modificacion realizada con éxito');
        setCoches(
          coches.map((coche) =>
            coche.id === editedCoche.id ? { ...editedCoche } : coche
          )
        );
        setIsEditing(false);
      })
      .catch((error) => console.error('Error modificando el coche:', error));
  };

  const handleDelClick = (_id) => {
    setCocheToDelete(_id);
    setConfirmDialogOpen(true);
  };

  const handleDelConfirm = () => {
    console.log(cocheToDelete)
    fetch(`http://localhost:5000/api/v1/coches/${cocheToDelete}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCoches(coches.filter((coche) => coche.id !== cocheToDelete));
        setConfirmDialogOpen(false);
        setSnackbarMessage(`El coche con id ${cocheToDelete} ha sido eliminado`);
        setSnackbarOpen(true);
        setCocheToDelete(null); // Limpiar el ID del coche a eliminar
      })
      .catch((error) => console.error('Error eliminando el coche:', error));
  };

  const handleDelCancel = () => {
    setConfirmDialogOpen(false);
    setCocheToDelete(null); // Limpiar el ID del coche a eliminar
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>

      <AppBar position="static"> {/* 'fixed' para que se quede en la parte superior al hacer scroll */}
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}> {/* flexGrow hace que el título ocupe el espacio restante */}
            Desarrollo WEB _ Coches.jsx 
          </Typography>
          <Button color="inherit" onClick={goToHome}>
            Pagina Principal
          </Button>

          <Button color="inherit" onClick={handleOpenNewDialog}>
            Añadir Vehiculo
          </Button>
          
          {/* Aquí irán los futuros botones de navegación */}
        </Toolbar>
      </AppBar>
      {/* Contenido principal de la página debajo de la barra de navegación */}
      <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 4 }}>
        Lista de Coches
      </Typography>
      {/* Otros elementos de la página */}
      
      <CarsSummaryComponent/>

      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><h2><b>Id</b></h2>&nbsp;</TableCell>
              <TableCell align="center"><h2><b>Marca</b></h2>&nbsp;</TableCell>
              <TableCell align="center"><h2><b>Modelo</b></h2>&nbsp;</TableCell>
              <TableCell align="center"><h2><b>Año</b></h2>&nbsp;</TableCell>
              <TableCell align="center"><h2><b>Precio</b></h2>&nbsp;</TableCell>
              <TableCell align="right"><h2><b>Acción</b></h2>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coches.map((coche) => (
              <TableRow
                key={coche.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{coche._id}</TableCell>
                <TableCell align="center">{coche.marca}</TableCell>
                <TableCell align="center">{coche.modelo}</TableCell>
                <TableCell align="center">{coche.año}</TableCell>
                <TableCell align="center">{coche.precio}</TableCell>
                <TableCell align="right">
                  <Box sx={{ '& button': { m: 0 } }}>
                    <div>
                      <Button
                        onClick={() => handleVer(coche._id)}
                        variant="outlined"
                        startIcon={<RemoveRedEyeIcon />}
                      />
                      <Button
                        onClick={() => handleModi(coche._id)}
                        variant="outlined"
                        startIcon={<AutoFixHighIcon />}
                      />
                      <Button
                        onClick={() => handleDelClick(coche._id)}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        color="error" 
                      />
                    </div>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog para ver detalles */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Detalles del Vehículo</DialogTitle>
        <DialogContent>
          {selectedCoche && (
            <div>
              <p><b>Marca:</b> {selectedCoche.marca}</p>
              <p><b>Modelo:</b> {selectedCoche.modelo}</p>
              <p><b>Año:</b> {selectedCoche.año}</p>
              <p><b>Color:</b> {selectedCoche.color}</p>
              <p><b>Puertas:</b> {selectedCoche.puertas}</p>
              <p><b>Precio:</b> {selectedCoche.precio}</p>
              {/* Añadimos la imagen aquí */}
              {selectedCoche.imagen && (
                <Box mt={2}>
                  <img src={selectedCoche.imagen} alt={`Imagen de ${selectedCoche.marca} ${selectedCoche.modelo}`} style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para editar */}
      {isEditing && (
        <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
          <DialogTitle>Modificar Vehículo</DialogTitle>
          <DialogContent>
            <TextField
              label="Marca"
              value={editedCoche?.marca || ''}
              onChange={(e) =>
                setEditedCoche({ ...editedCoche, marca: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Modelo"
              value={editedCoche?.modelo || ''}
              onChange={(e) =>
                setEditedCoche({ ...editedCoche, modelo: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Año"
              value={editedCoche?.año || ''}
              onChange={(e) =>
                setEditedCoche({ ...editedCoche, año: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Color"
              value={editedCoche?.color || ''}
              onChange={(e) =>
                setEditedCoche({ ...editedCoche, color: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Puertas"
              value={editedCoche?.puertas || ''}
              onChange={(e) =>
                setEditedCoche({ ...editedCoche, puertas: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Precio"
              value={editedCoche?.precio || ''}
              onChange={(e) =>
                setEditedCoche({ ...editedCoche, precio: e.target.value })
              }
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave}>Guardar</Button>
            <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Dialog para añadir */}
      <Dialog open={isNew} onClose={handleCloseNewDialog}>
        <DialogTitle>Nuevo Vehiculo</DialogTitle>
        <DialogContent>
          <TextField
            label="Marca"
            name="marca"
            value={newCoche.marca}
            onChange={handleNewInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Modelo"
            name="modelo"
            value={newCoche.modelo}
            onChange={handleNewInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Año"
            name="año"
            value={newCoche.año}
            onChange={handleNewInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Color"
            name="color"
            value={newCoche.color}
            onChange={handleNewInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Puertas"
            name="puertas"
            value={newCoche.puertas}
            onChange={handleNewInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Precio"
            name="precio"
            value={newCoche.precio}
            onChange={handleNewInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveNew}>Guardar</Button>
          <Button onClick={handleCloseNewDialog}>Cancelar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de confirmación para borrar */}
      <Dialog open={confirmDialogOpen} onClose={handleDelCancel}>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <p>¿Está seguro que quiere eliminar definitivamente el registro?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelCancel}>Cancelar</Button>
          <Button onClick={handleDelConfirm} color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mostrar mensaje de éxito al borrar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Coches;