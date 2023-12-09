import * as React from 'react';
import { useState } from 'react';
import { Container, Box, Toolbar, TextField, IconButton, Paper, Typography, LinearProgress, Tooltip } from '@mui/material';
import { Clear, AutoAwesome, AutoFixHigh, AddModerator } from '@mui/icons-material';

export const StableDiffusionHomePage = () => {
  const [prompt, setPrompt] = useState<string>();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  
  const handleInput = (event: any) => {
    setPrompt(event.target.value);
  }

  const SubmitButton = () => {
    return <Tooltip title="Generate Image">
      <IconButton 
        edge="end" color="primary" 
        disabled={prompt?.length !== undefined && prompt?.length < 5 || prompt?.length === undefined || isGenerating}
        onClickCapture={() => {
          setIsGenerating(true);
          setTimeout(() => {
            setIsGenerating(false);
            setHasGenerated(true);
          }, 3000);
        }}>
        <AutoFixHigh />
      </IconButton>
    </Tooltip>
      
  }

  const RenderInputBar = () => {
    return <TextField
      id="prompt-input"
      value={prompt}
      variant='outlined'
      onChange={handleInput}
      autoComplete={'one-time-code'}
      sx={{
        width: 600,
        borderRadius: '5px'
      }}
      label='What Image do you want to generate?'
      placeholder='Minimum 5 characters'
      InputProps={{
        endAdornment: <SubmitButton />
      }}
      disabled={isGenerating}>
    </TextField>;
  }

  const RenderGeneratedimage = () => {
    return <Box sx={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
      <Paper elevation={4} sx={{
        p: 1
      }}>
        <img src='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e' height={500} width={450}></img>
        <Box pt={1} sx={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
          <Tooltip title="Lock In NFT">
            <IconButton sx={{
              mx: 1
            }}>
              <AddModerator />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear Generation">
            <IconButton sx={{
              mx: 1
            }}>
              <Clear />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </Box>
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
            p: 2,
            borderRadius: '10px'
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
            {RenderInputBar()}
            <Box sx={{
              my: 2,
              mx: 1
            }}>
              {isGenerating && <LinearProgress sx={{
                borderRadius: '2px'
              }} />}
              {hasGenerated && RenderGeneratedimage()}
            </Box>
          </Paper>
        </Container>
    </Box>
  );
};

export default StableDiffusionHomePage;
