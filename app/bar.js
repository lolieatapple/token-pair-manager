'use client';
import { Button, Stack, Box } from '@mui/material'

export default function Bar() {
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
        <Button variant="outlined" href="/">Testnet</Button>
        <Button  href="/mainnet">Mainnet</Button>
      </Stack>
    </Box>
  )
}
