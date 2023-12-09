import './App.css';

import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Header } from './components/Header/Header';

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

function App() {
  return (
    <div className='app-container'>
      <ThemeProvider theme={theme}>
        <Header />
        <Container sx={{
          height: '100vh'
        }}>
          React Application
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
