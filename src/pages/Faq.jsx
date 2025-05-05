import { Typography } from '@mui/material';
import AppBarSelf from '../components/AppBarSelf';
import { useTranslation } from 'react-i18next';

function FaqPage() {

  const { t, i18n } = useTranslation();


  const appBarButtonsHome = [    
    { label: 'Página Principal', to: '/' },
  
  ];

  return (
    <div>

      <AppBarSelf title="Mern/Reacrt/Pages/Faq.jsx" buttons={appBarButtonsHome} />

      {/* Contenido principal de la página debajo de la barra de navegación */}

      

      



      <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', mt: 4 }}>
        {t("faq")}
      </Typography>



      {/* Otros elementos de la página */}
    </div>
  );
}
export default FaqPage;
