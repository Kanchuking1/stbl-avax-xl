import * as React from 'react';
import { AppBar, Typography, Container, Button, Toolbar, useScrollTrigger } from '@mui/material';
import { AcUnit } from '@mui/icons-material';

export interface IHeaderProps {
}

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export function Header (props: IHeaderProps) {
  return (
    <ElevationScroll>
      <AppBar sx={{
          alignContent: 'center',
          justifyContent: 'center'
        }}>
          <Toolbar>
            <Container sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              my: 1
            }}>
              <Typography sx={{
                fontSize: 18,
                flexGrow: 1
              }}>
                <AcUnit sx={{
                  m: 1,
                  position: 'relative',
                  top: '-2px'
                }}></AcUnit>
                Stable AVAXL
              </Typography>
              <Button sx={{
                fontWeight: 600,
                fontSize: 15,
                borderRadius: '10px',
                textTransform: 'none'
                }}
                variant='contained'>
                Connect Wallet
              </Button>
            </Container>
          </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}
