import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import UsersListComponent from '../components/UsersListComponent';


function UsersListPage() {

    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    }

    const goToNewUser = () => {
      navigate("/users/new");
  }

  return (
    <div>
      <h2>Hoja, UserListPage</h2>

      <Button variant="contained" color="primary" onClick={goToNewUser}>
      Nuevo usuario
      </Button>

      <UsersListComponent/>     

      <Button variant="contained" color="primary" onClick={goToHome}>
      Home
      </Button>
    </div>
  );
}
export default UsersListPage;
