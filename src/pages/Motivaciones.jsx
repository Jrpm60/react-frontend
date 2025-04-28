import React, { useEffect, useState } from 'react';
import { Button, Typography, Paper, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AppBarSelf from '../components/AppBarSelf';
import MenuItem from '@mui/material/MenuItem';

const Coches = () => {
  const [coches, setCoches] = useState([]);
  const [totalCoches, setTotalCoches] = useState(null);
  const [averagePrice, setAveragePrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCoche, setSelectedCoche] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [editedCoche, setEditedCoche] = useState(null);
  const [newCoche, setNewCoche] = useState({ marca: '', modelo: '', año: '', color: '', puertas: '', precio: '' });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [cocheToDelete, setCocheToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [precioMaximo, setPrecioMaximo] = useState(0);
  const [precioMinimo, setPrecioMinimo] = useState(0);


  const handleOpenNewDialog = () => {
    setIsNew(true);
    setNewCoche({ marca: '', modelo: '', año: '', color: '', puertas: '', precio: '' });
  };

  const appBarButtonsCoches = [
    { label: 'Página Principal', to: '/' },
    { label: 'Nueva Motivacion', onClick: handleOpenNewDialog },
    
  ];

  useEffect(() => {
    const fetchCochesData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [cochesResponse, countResponse, averageResponse] = await Promise.all([
          fetch('http://localhost:5000/api/v1/coches'),

        ]);

        if (!cochesResponse.ok || !countResponse.ok || !averageResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const cochesData = await cochesResponse.json();
        const countData = await countResponse.json();
        const averageData = await averageResponse.json();

        setCoches(cochesData);
        setTotalCoches(countData.respuesta);
        setAveragePrice(averageData.respuesta);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCochesData();
  }, []);

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

  const preciosFilter = [ {value: "15000"}, {value: '20000'}, {value: '25000'}, {value: '30000'}, {value: 35000}, {value: 40000}]


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
      .then((response) => response.json())
      .then((data) => {
        alert('Alta realizada con éxito');
        setCoches([...coches, data]);
        setIsNew(false);
        setNewCoche({ marca: '', modelo: '', año: '', color: '', puertas: '', precio: '' });
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
            coche._id === editedCoche._id ? { ...editedCoche } : coche
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
    fetch(`http://localhost:5000/api/v1/coches/${cocheToDelete}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCoches(coches.filter((coche) => coche._id !== cocheToDelete));
        setConfirmDialogOpen(false);
        setSnackbarMessage(`El coche con id ${cocheToDelete} ha sido eliminado`);
        setSnackbarOpen(true);
        setCocheToDelete(null);
      })
      .catch((error) => console.error('Error eliminando el coche:', error));
  };

  const handleDelCancel = () => {
    setConfirmDialogOpen(false);
    setCocheToDelete(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };



  return (
    <div>

      <AppBarSelf title="Mern/Reacrt/Pages/Motivaciones.jsx" buttons={appBarButtonsCoches} />

      <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 4 }}>
        Motivaciones
      </Typography>

      {loading && <Typography textAlign="center" mt={2}>Cargando datos...</Typography>}
      {error && <Typography color="error" textAlign="center" mt={2}>Error: {error}</Typography>}

      {!loading && !error && (
        <Box mb={2} display="flex" gap={2} justifyContent="center">
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1">
              <b>Total de coches:</b> {totalCoches}
            </Typography>
          </Paper>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1">
              <b>Precio promedio:</b> {averagePrice && `${averagePrice.toFixed(2)} €`}
            </Typography>
          </Paper>

        <TextField
          id="precioMin"
          label="Precio Minimo"
          variant="outlined"
          value={precioMinimo}
          //onChange={handleChangePrecioMinimo}
      />

          <TextField
            id="precioMax"
            label="Precio Maximo"
            variant="outlined"            
          />


        </Box>
      )}        

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><h2><b>Id</b></h2>&nbsp;</TableCell>
              <TableCell align="center"><h2><b>Marca</b></h2>&nbsp;</TableCell>
              <TableCell align="center"><h2><b>Modelo</b></h2>&nbsp;</TableCell>
              <TableCell align="center"><h2><b>Año</b></h2>&nbsp;</TableCell>
              <TableCell align="center"><h2><b>Precio</b></h2>&nbsp;</TableCell>
              <TableCell align="center"><h2><b>Imagen</b></h2>&nbsp;</TableCell>
              <TableCell align="right"><h2><b>Acción</b></h2>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coches.map((coche) => (
              <TableRow
                key={coche._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{coche._id}</TableCell>
                <TableCell align="center">{coche.marca}</TableCell>
                <TableCell align="center">{coche.modelo}</TableCell>
                <TableCell align="center">{coche.año}</TableCell>
                <TableCell align="center">{coche.precio}</TableCell>
                <TableCell align="center">{coche.imagen}</TableCell>
                <TableCell align="right">
                  <Box sx={{ '& button': { m: 0.5 } }}>
                    <Button onClick={() => handleVer(coche._id)} variant="outlined" startIcon={<RemoveRedEyeIcon />} size="small" />
                    <Button onClick={() => handleModi(coche._id)} variant="outlined" startIcon={<AutoFixHighIcon />} size="small" />
                    <Button onClick={() => handleDelClick(coche._id)} variant="outlined" startIcon={<DeleteIcon />} color="error" size="small" />
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
              <TextField
              label="Imagen"
              value={editedCoche?.imagen || ''}
              onChange={(e) =>
                setEditedCoche({ ...editedCoche, imagen: e.target.value })
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
          <TextField
            label="imagen"
            name="imagen"
            value={newCoche.imagen}
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