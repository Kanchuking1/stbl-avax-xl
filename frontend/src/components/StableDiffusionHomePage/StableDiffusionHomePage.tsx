import * as React from 'react';
import { useState } from 'react';
import { Container, Box, Toolbar, TextField, IconButton, Paper, Typography } from '@mui/material';
import { Search, AutoAwesome, AutoFixHigh } from '@mui/icons-material';

export const StableDiffusionHomePage = () => {
  const [prompt, setPrompt] = useState<string | null>();
  const handleInput = (event: any) => {
    setPrompt(event.target.value);
  }

  return (
    <Box 
      component='main' sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Toolbar />
        <Container sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          flexGrow: 1
        }}>
          <Paper sx={{
            p: 2
          }}
          elevation={4}>
            <Box textAlign={'center'}>
              <AutoAwesome sx={{
                fontSize: '3em',
                margin: 1
              }} />
              <Typography variant='h2' fontWeight={900}>
                Stable AVAXL
              </Typography>
              <Typography variant='subtitle1' color='text.secondary' sx={{
                paddingBlockEnd: 3
              }}>
                Generate your own NFTs
              </Typography>
            </Box>
            <TextField
              id="prompt-input"
              value={prompt}
              variant='outlined'
              onInputCapture={handleInput}
              sx={{
                width: 600
              }}
              placeholder='What Image do you want to generate?'
              InputProps={{
                endAdornment: <IconButton edge="end" color="primary">
                <AutoFixHigh />
              </IconButton>
              }}>
            </TextField>
          </Paper>
        </Container>
    </Box>
  );
};

export default StableDiffusionHomePage;
