import * as React from 'react';
import './App.css';

import {  CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Header } from './components/Header/Header';
import { StableDiffusionHomePage } from './components/StableDiffusionHomePage/StableDiffusionHomePage';

import {
  createConfig,
  configureChains,
  WagmiConfig
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { avalanche } from 'wagmi/chains'

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    fontFamily: "'Raleway', sans-serif"
  }
});

function App() {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [avalanche],
    [publicProvider()],
  )

  
  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  })

  return (
    <div className='app-container'>
      <WagmiConfig config={config}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Header />
            <StableDiffusionHomePage />
        </ThemeProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
