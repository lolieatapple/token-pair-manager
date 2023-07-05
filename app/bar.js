'use client';
import { Button, Stack, Box } from '@mui/material';
import { usePathname } from 'next/navigation';


export default function Bar() {
  const path = usePathname();
  const isTestnet = !path.includes('mainnet');
  console.log('isTestnet', isTestnet, path);
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
