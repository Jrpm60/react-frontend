import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UsersListComponent = () => {
  const [users, setUsers] = useState([]); // Set initial state to an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    // Define an async function to fetch the users
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data); // Set the users to state
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    };

    fetchUsers(); // Call the async function
  }, []); // Empty dependency array, so it runs once when the component mounts

  // Render loading, error, or the list of users
  return (
    <div>

<TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><h2><b>Tipo</b></h2>&nbsp;</TableCell>
              <TableCell align="center"><h2><b>Nombre</b></h2>&nbsp;</TableCell>
              <TableCell align="center"><h2><b>Edad</b></h2>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{user.type}</TableCell>
                <TableCell align="center">{user.nombre}</TableCell>
                <TableCell align="center">{user.edad}</TableCell>
                

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

export default UsersListComponent;