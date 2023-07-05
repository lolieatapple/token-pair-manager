'use client';
import { Button, Stack, Box } from '@mui/material';

export default function Bar() {
  const isTestnet = window.location.pathname === "/";
  console.log('isTestnet', isTestnet);
  return (
    <Box 
      display="flex" 
      justifyContent="center"
      alignItems="center"
      style={{
        marginBottom: '20px',
      }}
    >
      <Stack spacing={2} direction='row'>
        <Button variant={isTestnet ? "contained" : "outlined"} href="/">Testnet</Button>
        <Button variant={isTestnet ? "outlined" : "contained"} href="/mainnet">Mainnet</Button>
      </Stack>
    </Box>
  )
}
