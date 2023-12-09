import * as React from 'react';
import './App.css';

import {  CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Header } from './components/Header/Header';
import { StableDiffusionHomePage } from './components/StableDiffusionHomePage/StableDiffusionHomePage';

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    fontFamily: "'Raleway', sans-serif"
  }
});

function App() {
  return (
    <div className='app-container'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <StableDiffusionHomePage />
      </ThemeProvider>
    </div>
  );
}

export default App;
