// src/components/AppBarSelf.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, FormControl, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AppBarSelf = ({ title, buttons }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLanguage = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {buttons &&
          buttons.map((button) => (
            <Button
              key={button.label}
              color="inherit"
              component={button.to ? Link : undefined}
              to={button.to}
              onClick={button.onClick}
            >
              {t(button.label)}
            </Button>
          ))}
        <FormControl sx={{ m: 1, minWidth: 100 }}> {/* Reducimos el minWidth */}
          <Select
            value={language}
            onChange={handleChangeLanguage}
            displayEmpty
            inputProps={{ 'aria-label': 'Select language' }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              color: 'white',
              fontSize: '0.8rem', // Tamaño de letra más pequeño
              fontFamily: 'Roboto, sans-serif', // Tipo de letra Roboto
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: 'primary.main', // O el color de fondo de tu AppBar
                },
              },
            }}
          >
            <MenuItem value="es" 
            sx={{ color: 'white', 
                  fontSize: '0.8rem', 
                  fontFamily: 'Roboto, sans-serif' }}>
                  Español
            </MenuItem>
            <MenuItem value="en" 
            sx={{ color: 'white', 
                  ontSize: '0.8rem', 
                  fontFamily: 'Roboto, sans-serif' }}>
                  English
            </MenuItem>
            <MenuItem value="fr" 
            sx={{ color: 'white', 
                  fontSize: '0.8rem', 
                  fontFamily: 'Roboto, sans-serif' }}>
                  Français
            </MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarSelf;