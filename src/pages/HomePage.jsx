import { Typography } from '@mui/material';
import AppBarSelf from '../components/AppBarSelf';
import { useTranslation } from 'react-i18next';

function HomePage() {

  const appBarButtonsHome = [
    { label: 'Página Principal', to: '/' },
    { label: 'Usuarios', to: '/users' },
    { label: 'Coches', to: '/coches' },
    { label: 'Ingles', to: '/ingles' },
/*     { label: 'Motivaciones', to: '/motivaciones' }, */
    { label: 'SCC', to: '/shoppingcartcomponent' },
    { label: 'SCC_HOOK', to: '/shoppingcartcomponent2' },
    { label: 'Acceso', to: '/login' },
    { label: 'Cats', to: '/catbouncepage' },
    { label: 'ValoraMVC', to: '/valoramvc' },
    { label: 'FAQ', to: '/faq' },
    
  ];

  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };


  return (
    <div>

      <AppBarSelf title="Mern/Reacrt/Pages/HomePage.jsx" buttons={appBarButtonsHome} />


      {/* Contenido principal de la página debajo de la barra de navegación */}

      <h1>{t('welcome_message')}</h1>
      

      <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 4 }}>
        {t("Pagina Principal")}
      </Typography>



      {/* Otros elementos de la página */}
    </div>
  );
}
export default HomePage;
