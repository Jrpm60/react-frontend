import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CarsSummaryComponent = () => {

  const [respuesta, setRespuesta] = useState([]); // Set initial state to an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    // Define an async function to fetch the users
    const fetchCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/users?summary=count');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRespuesta(data.respuesta); // Set the users to state
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    };

    fetchCount();// Call the async function
  }, []); // Empty dependency array, so it runs once when the component mounts

  // Render loading, error, or the list of users
  return (
    <div>
      <h1>Cars Summary</h1>
      {loading && <p>Loading...</p>} {/* Show loading if data is being fetched */}
      {error && <p>Error: {error}</p>} {/* Show error message if there was an error */}
      {!loading && !error && (
          <div>{respuesta}</div>
      )}
    </div>
  );
};

export default CarsSummaryComponent;