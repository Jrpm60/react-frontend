// src/components/AppBarSelf.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';




const AppBarSelf = ({ title, buttons, }) => {

  const { t, i18n } = useTranslation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {buttons && buttons.map((button) => (
          <Button
            key={button.label}
            color="inherit"
            component={button.to ? Link : undefined}
            to={button.to}
            onClick={button.onClick}
          >
            {button.label}
          </Button>

        ))}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarSelf;