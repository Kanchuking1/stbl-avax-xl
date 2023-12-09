import * as React from 'react';

import { Container, Box, Toolbar, TextField, IconButton, Paper, Typography } from '@mui/material';
import { Search, AutoAwesome } from '@mui/icons-material';

export const StableDiffusionHomePage = () => {
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
              <AutoAwesome />
              <Typography variant='h2' >
                Stable AVAXL
              </Typography>
              <Typography variant='subtitle1' color='text.secondary' sx={{
                paddingBlockEnd: 3
              }}>
                Generate your own NFT images
              </Typography>
            </Box>
            <TextField
              id="prompt-input"
              value=""
              variant='outlined'
              sx={{
                width: 600
              }}
              InputProps={{
                endAdornment: <IconButton edge="end" color="primary" sx={{
                  // p: 1
                }}>
                <Search />
              </IconButton>
              }}>
            </TextField>
          </Paper>
        </Container>
    </Box>
  );
};

export default StableDiffusionHomePage;
