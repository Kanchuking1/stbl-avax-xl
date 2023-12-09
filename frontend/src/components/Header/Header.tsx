import * as React from 'react';
import { AppBar, Typography, Container, Button } from '@mui/material';
import { AcUnit } from '@mui/icons-material';

export interface IHeaderProps {
}

export function Header (props: IHeaderProps) {
  return (
    <AppBar sx={{
        height: '3em',
        alignContent: 'center',
        justifyContent: 'center'
      }}>
        <Container sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography sx={{
            fontWeight: 600,
            fontSize: 15,
            flexGrow: 1
          }}>
            <AcUnit sx={{
              m: 1,
              position: 'relative',
              top: '-2px'
            }}></AcUnit>
            AVAX Fall
          </Typography>
          <Button sx={{
            fontWeight: 500,
            fontSize: 15,
            borderRadius: '20px'
            }}>
            Login
          </Button>
        </Container>
      </AppBar>
  );
}
