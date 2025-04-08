import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';


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
      <h2>Pagina Principal HOME</h2>

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
