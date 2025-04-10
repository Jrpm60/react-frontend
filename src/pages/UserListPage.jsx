import { Typography } from '@mui/material';
import UsersListComponent from '../components/UsersListComponent';
import AppBarSelf from '../components/AppBarSelf';



function UsersListPage() {



  const appBarButtonsUsers = [
    { label: 'Página Principal', to: '/' },
    { label: 'Nuevo Usuario', to: "/users/new" },
    
  ];    

  return (
    <div>

      <AppBarSelf title="Mern/Reacrt/Pages/UserListPage.jsx" buttons={appBarButtonsUsers} />


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
