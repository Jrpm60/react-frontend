import { Typography } from '@mui/material';
import AppBarSelf from '../components/AppBarSelf';

function HomePage() {

  const appBarButtonsHome = [
    { label: 'Página Principal', to: '/' },
    { label: 'Usuarios', to: '/users' },
    { label: 'Coches', to: '/coches' },
    { label: 'Ingles', to: '/ingles' },
    
  ];

  return (
    <div>

      <AppBarSelf title="Mern/Reacrt/Pages/HomePage.jsx" buttons={appBarButtonsHome} />


      {/* Contenido principal de la página debajo de la barra de navegación */}
      <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 4 }}>
        Pagina Principal
      </Typography>



      {/* Otros elementos de la página */}
    </div>
  );
}
export default HomePage;
