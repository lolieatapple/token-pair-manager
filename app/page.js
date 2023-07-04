'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './page.module.css'
import { Paper, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, CircularProgress, Card, TextField, Chip, Button, Typography, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { chains } from './config';
import Select from "react-select";


// 使用 styled 工具创建自定义 TableCell 组件，定义一些基本样式
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1),
  fontSize: 14,
}));

// 创建自定义的 TableHead，对表头单元格添加特殊样式
const StyledTableHeaderCell = styled(StyledTableCell)({
  backgroundColor: '#3fb5af',
  color: '#fff',
  fontWeight: 'bold',
});

const networkOptions = chains.map((chain) => ({
  value: chain.chainName,
  label: chain.chainName,
}));

function NewPair() {
  const [value, setValue] = useState('477');
  const [network, setNetwork] = useState();

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  return <Card style={{ borderRadius: 8, overflow: 'hidden', marginBottom: '10px' }}>
    <TableContainer style={{ maxHeight: 400, overflow: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableHeaderCell>Name</StyledTableHeaderCell>
            <StyledTableHeaderCell>Value</StyledTableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell style={{backgroundColor: '#b6f4cc', minWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} >Token Pair ID</StyledTableCell>
            <StyledTableCell>
              <TextField 
                value={value} 
                size='small'
                onChange={handleInputChange} 
                style={{ width: '100%' }} 
              />
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell style={{backgroundColor: '#b6f4cc', minWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} >Ancestor Info</StyledTableCell>
            <StyledTableCell style={{maxWidth: 260, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              <Stack spacing={1} direction='row' >
              <div><strong>Symbol:</strong> USDT</div>
              <div><strong>Name:</strong> USDT</div>
              <div><strong>Decimals:</strong> USDT</div>
              <div><strong>ChainId:</strong> 123456</div>
              </Stack>
              <div><strong>Address:</strong> 0xf6e24e7191b9669dc8d52c6be6008e783e5c01cb</div>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell style={{backgroundColor: '#b6f4cc', maxWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} >From Account</StyledTableCell>
            <StyledTableCell style={{maxWidth: 260, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              <Stack spacing={1} direction='row' >
              <div><strong>Symbol:</strong> USDT</div>
              <div><strong>Name:</strong> USDT</div>
              <div><strong>Decimals:</strong> USDT</div>
              <div><strong>ChainId:</strong> 123456</div>
              </Stack>
              <div><strong>Address:</strong> 0xf6e24e7191b9669dc8d52c6be6008e783e5c01cb</div>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell style={{backgroundColor: '#b6f4cc', maxWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} >To Account</StyledTableCell>
            <StyledTableCell style={{maxWidth: 260, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              <Stack spacing={1} direction='row' >
              <div><strong>Symbol:</strong> USDT</div>
              <div><strong>Name:</strong> USDT</div>
              <div><strong>Decimals:</strong> USDT</div>
              <div><strong>ChainId:</strong> 123456</div>
              </Stack>
              <div><strong>Address:</strong> 0xf6e24e7191b9669dc8d52c6be6008e783e5c01cb</div>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell style={{backgroundColor: '#b6f4cc', maxWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} >Operations</StyledTableCell>
            <StyledTableCell >
              <Stack spacing={1} direction='row' >
              <Select placeholder="Select Network..." menuPlacement="top" options={networkOptions} value={network}
                
                onChange={(e)=>{
                  console.log(e);
                  setNetwork(e);
                }} />
              <Button variant='outlined' color='secondary' style={{ textTransform: 'none' }}>Add</Button>
              <Button variant='outlined' color='secondary' style={{ textTransform: 'none' }}>Update</Button>
              <Button variant='outlined' color='secondary' style={{ textTransform: 'none' }}>Copy</Button>
              </Stack>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
}


export default function Home() {
  const [updater, setUpdater] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tokenPairs, setTokenPairs] = useState([]);
  const [filter, setFilter] = useState('');
  const [filter2, setFilter2] = useState('');
  const [filter3, setFilter3] = useState('');

  useEffect(() => {
    const func = async () => {
      setLoading(true);
      try {
        let ret = await fetch('/api/tokenPairsHash/testnet');
        ret = await ret.json();
        console.log('hash', ret.data);
        // compare with local storage
        const localHash = localStorage.getItem('tokenPairsHash_testnet');
        if (localHash === ret.data) {
          console.log('same hash');
          // load cached token pairs
          const localTokenPairs = localStorage.getItem('tokenPairs_testnet');
          if (localTokenPairs) {
            setTokenPairs(JSON.parse(localTokenPairs).reverse());
          }
          setLoading(false);
          return;
        }
        localStorage.setItem('tokenPairsHash_testnet', ret.data);
        localStorage.removeItem('tokenPairs_testnet');
        ret = await fetch('/api/tokenPairs/testnet');
        ret = await ret.json();
        console.log(ret);
        localStorage.setItem('tokenPairs_testnet', JSON.stringify(ret.data));
        setTokenPairs(ret.data.reverse());
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }

    func();
    
  }, [updater]);

  const tokens = useMemo(() => {
    let _tokens = {};
    tokenPairs.forEach(v => {
      _tokens[v.ancestorSymbol + "_" + v.ancestorChainID] = {
        symbol: v.ancestorSymbol,
        name: v.ancestorName,
        decimals: v.ancestorDecimals,
        chainID: v.ancestorChainID,
        address: v.ancestorAccount,
      };
      _tokens[v.fromSymbol + "_" + v.fromChainID] = {
        symbol: v.fromSymbol,
        name: v.fromName,
        decimals: v.fromDecimals,
        chainID: v.fromChainID,
        address: v.fromAccount,
      };
      _tokens[v.toSymbol + "_" + v.toChainID] = {
        symbol: v.symbol,
        name: v.name,
        decimals: v.decimals,
        chainID: v.toChainID,
        address: v.toAccount,
      };
    });
    
    return _tokens;
  }, [tokenPairs]);

  const latestTokenPairId = useMemo(()=>{
    if (tokenPairs.length === 0) return 0;
    let value = 0;
    for (let i=0; i< tokenPairs.length; i++) {
      if (Number(tokenPairs[i].id) < 10000000) {
        return tokenPairs[i].id;
      }
    }
    return 999999;
  }, [tokenPairs])
  console.log('latestTokenPairId', latestTokenPairId);

  return (
    <Container maxWidth="lg" className={styles.container}>
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
    >
      <Paper elevation={3} className={styles.upperPart}>
      {loading ? (
        <Box display="flex" justifyContent="center" p={1}>
          <CircularProgress />
        </Box>
        ) : (
          <>
          <TextField label="Filter" value={filter} onChange={e => setFilter(e.target.value)} size="small" variant="outlined" style={{ backgroundColor: 'white', marginBottom: '10px', border: 'none', borderRadius: 8 }} />
          <Card style={{ borderRadius: 8, overflow: 'hidden' }}>
          <TableContainer style={{ maxHeight: 400, overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableHeaderCell>TokenPairID</StyledTableHeaderCell>
                  <StyledTableHeaderCell>AncestorSymbol</StyledTableHeaderCell>
                  <StyledTableHeaderCell>AncestorDecimals</StyledTableHeaderCell>
                  <StyledTableHeaderCell>AncestorChainID</StyledTableHeaderCell>
                  <StyledTableHeaderCell>FromChainID</StyledTableHeaderCell>
                  <StyledTableHeaderCell>ToChainID</StyledTableHeaderCell>
                  <StyledTableHeaderCell>AncestorAccount</StyledTableHeaderCell>
                  <StyledTableHeaderCell>FromAccount</StyledTableHeaderCell>
                  <StyledTableHeaderCell>ToAccount</StyledTableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tokenPairs.filter(v=>Number(v.id) < 10000).filter(v=>v.ancestorSymbol.toLowerCase().includes(filter.toLowerCase()) || v.id.toLowerCase().includes(filter.toLowerCase())).map((row, index) => (
                  <TableRow key={row.id} sx={{ 
                    '&:nth-of-type(odd)': { backgroundColor: '#bae4e2' },
                    '&:nth-of-type(even)': { backgroundColor: '#fcfcfc' }
                    }}>
                    <StyledTableCell component="th" scope="row" style={{ maxWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.ancestorSymbol}</StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.ancestorDecimals}</StyledTableCell>
                    <StyledTableCell style={{ minWidth: 150, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.ancestorChainID}<Chip size="small" label={chains.find(v=>Number(v.chainId) === Number(row.ancestorChainID))?.chainType} /></StyledTableCell>
                    <StyledTableCell style={{ minWidth: 150, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.fromChainID}<Chip size="small" label={chains.find(v=>Number(v.chainId) === Number(row.fromChainID))?.chainType} /></StyledTableCell>
                    <StyledTableCell style={{ minWidth: 150, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.toChainID}<Chip size="small" label={chains.find(v=>Number(v.chainId) === Number(row.toChainID))?.chainType} /></StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 380, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.ancestorAccount}</StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 380, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.fromAccount}</StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 380, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.toAccount}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Card>
          <Typography color="textSecondary" style={{marginTop: '10px'}}>
          * All the token pairs. Right click to add to new pair list.
          </Typography>
          </>
        )}
        
      </Paper>
      <Grid container spacing={2} className={styles.lowerPart} >
        <Grid item xs={6}>
          <Paper elevation={3} className={styles.leftPart}>
          {loading ? (
            <Box display="flex" justifyContent="center" p={1}>
              <CircularProgress />
            </Box>
            ) : (
              <>
              <TextField label="Filter" value={filter2} onChange={e => setFilter2(e.target.value)} size="small" variant="outlined" style={{ backgroundColor: 'white', marginBottom: '10px', border: 'none', borderRadius: 8 }} />
              <Card style={{ borderRadius: 8, overflow: 'hidden' }}>
              <TableContainer style={{ maxHeight: 400, overflow: 'auto' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <StyledTableHeaderCell>Chain</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Symbol</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Name</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Decimals</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Address</StyledTableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(tokens).filter(v=>v.toLowerCase().includes(filter2.toLowerCase())).map((row, index) => (
                      <TableRow key={row} sx={{ 
                        '&:nth-of-type(odd)': { backgroundColor: '#bae4e2' },
                        '&:nth-of-type(even)': { backgroundColor: '#fcfcfc' }
                        }}>
                        <StyledTableCell style={{ minWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}><Chip size="small" label={chains.find(v=>Number(v.chainId) === Number(tokens[row].chainID))?.chainType} /></StyledTableCell>
                        <StyledTableCell component="th" scope="row" style={{ maxWidth: 120, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                          {tokens[row].symbol}
                        </StyledTableCell>
                        <StyledTableCell style={{ fontSize: '12px', maxWidth: 120, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{tokens[row].name}</StyledTableCell>
                        <StyledTableCell style={{ maxWidth: 30, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{tokens[row].decimals}</StyledTableCell>
                        <StyledTableCell style={{ maxWidth: 380, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{tokens[row].address}</StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </Card>
              <Typography color="textSecondary" style={{marginTop: '10px'}}>
              * All the tokens. Right click to add to new pair list.
              </Typography>
              </>
            )}
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper elevation={3} className={styles.rightPart}>
            <Stack spacing={1} direction='row'>
            <Button style={{marginBottom: '10px', textTransform:'none'}} fullWidth variant='outlined'>+ Add TokenPair</Button>
            <Button style={{marginBottom: '10px', textTransform:'none'}} fullWidth variant='outlined'>→ Move to Mainnet</Button>
            <Button style={{marginBottom: '10px', textTransform:'none'}} fullWidth variant='outlined'>Connect Wallet</Button>
            </Stack>
            
            <NewPair />
            {/* <NewPair />
            <NewPair />
            <NewPair />
            <NewPair /> */}
            

          </Paper>
        </Grid>
      </Grid>
    </Box>
    </Container>
  )
}
