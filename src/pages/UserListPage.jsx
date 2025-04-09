import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
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

<AppBar position="static"> {/* 'fixed' para que se quede en la parte superior al hacer scroll */}
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}> {/* flexGrow hace que el título ocupe el espacio restante */}
            Desarrollo WEB _ UserListPage
          </Typography>
          <Button color="inherit" onClick={goToHome}>
            Pagina Principal
          </Button>
          <Button color="inherit" onClick={goToNewUser}>
            Nuevo usuario
          </Button>
          {/* Aquí irán los futuros botones de navegación */}
        </Toolbar>
      </AppBar>

      {/* Contenido principal de la página debajo de la barra de navegación */}
      <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 4 }}>
        Lista de Usuarios
      </Typography>
      {/* Otros elementos de la página */}

      <UsersListComponent/>     

    </div>
  );
}
export default UsersListPage;
