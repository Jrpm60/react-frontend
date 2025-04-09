import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';


function HomePage() {

    const navigate = useNavigate();

    const goToUsers = () => {
        navigate("/users");
    }

    const goToCoches = () => {
      navigate("/coches");
  }

  return (
    <div>

      <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center' }}>
        Pagina Principal
      </Typography>

      <Button variant="contained" color="primary" onClick={goToUsers}>
        Users
      </Button>

      <Button variant="contained" color="primary" onClick={goToCoches}>
        Coches
      </Button>


    </div>
  );
}
export default HomePage;
