import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

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
      <AppBar position="static"> {/* 'fixed' para que se quede en la parte superior al hacer scroll */}
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}> {/* flexGrow hace que el título ocupe el espacio restante */}
            Desarrollo WEB _ Home.jsx
          </Typography>
          <Button color="inherit" onClick={goToUsers}>
            Users
          </Button>
          <Button color="inherit" onClick={goToCoches}>
            Coches
          </Button>
          {/* Aquí irán los futuros botones de navegación */}
        </Toolbar>
      </AppBar>

      {/* Contenido principal de la página debajo de la barra de navegación */}
      <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 4 }}>
        Pagina Principal
      </Typography>
      {/* Otros elementos de la página */}
    </div>
  );
}
export default HomePage;
