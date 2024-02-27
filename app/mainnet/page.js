'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { Paper, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, CircularProgress, Card, TextField, Chip, Button, Typography, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/system';
import Select from "react-select";
import { useDrag } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";
import { MAINNET_TOKEN_MANAGER } from '../config';
import styles from '../page.module.css'
import { ethers } from 'ethers';
import { TOKEN_MANAGER_ABIS } from '../abi';


const networkOptions = MAINNET_TOKEN_MANAGER.map((chain) => ({
  value: chain.tokenManager,
  label: chain.chainName,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1),
  fontSize: 14,
}));

const StyledTableHeaderCell = styled(StyledTableCell)({
  backgroundColor: '#3fb5af',
  color: '#fff',
  fontWeight: 'bold',
});

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    maxHeight: '150px',
    zIndex: 9999,
  }),
  menuList: (provided, state) => ({
    ...provided,
    maxHeight: '150px',
  }),
}

const DraggableItem = ({ id, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "pointer" }}
    >
      {children}
    </div>
  );
};

const DropZone = ({ onDrop, height, width, placeholder }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        height,
        width,
        border: "1px dashed gray",
        backgroundColor: isOver ? "lightgreen" : "transparent",
      }}
    >
      <Box 
        display="flex" 
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        {placeholder}
      </Box>
    </div>
  );
};

const DropContainer = ({ onDrop, height, width, children, type }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: (item, monitor) => onDrop(item, type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        height,
        width,
        border: "1px dashed gray",
        backgroundColor: isOver ? "lightgreen" : "transparent",
      }}
    >
      {children}
    </div>
  );
};

function NewPair({pair, tokens, updatePairId, removeItem, updatePairToken, updatePair, chains}) {
  const id = pair[0];

  const [network, setNetwork] = useState();

  const ancestor = useMemo(() => {
    return Object.values(tokens).find((token) => token.address.toLowerCase() === pair[1][0].toLowerCase() && token.chainID === pair[1][4]);
  }, [tokens, pair]);

  const from = useMemo(() => {
    return Object.values(tokens).find((token) => token.address.toLowerCase() === pair[3].toLowerCase() && token.chainID === pair[2]);
  }, [tokens, pair]);

  const to = useMemo(() => {
    return Object.values(tokens).find((token) => token.address.toLowerCase() === pair[5].toLowerCase() && token.chainID === pair[4]);
  }, [tokens, pair]);

  const handleInputChange = (event) => {
    let newId = window.prompt('Please enter the token pair ID', event.target.value);
    if (newId) {
      updatePairId(id, newId);
    }
  };

  const onTokenDrop = useCallback((item, type)=>{
    let dropId = item.id;
    console.log('drop', dropId);
    console.log('type', type);
    if(!dropId.includes('token,')) return;
    let tokenInfo = dropId.replace('token,', '').split(',');
    console.log('tokenInfo', tokenInfo);
    updatePairToken(id, type, tokenInfo);
  }, [id, updatePairToken]);

  return <Card style={{ borderRadius: 8, overflow: 'hidden', marginBottom: '10px' }}>
    <TableContainer style={{ overflow: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableHeaderCell>Name</StyledTableHeaderCell>
            <StyledTableHeaderCell>
              Value
              <Button size='small' color='secondary' style={{ textTransform: 'none', height: '24px', float: 'right' }} onClick={()=>removeItem(id)}>X</Button>
              </StyledTableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell style={{backgroundColor: '#b6f4cc', minWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} >Token Pair ID</StyledTableCell>
            <StyledTableCell>
              <TextField 
                defaultValue={id} 
                size='small'
                onFocus={handleInputChange}
                onChange={handleInputChange} 
                style={{ width: '100%' }} 
              />
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell style={{backgroundColor: '#b6f4cc', minWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} >Ancestor Info</StyledTableCell>
            <StyledTableCell style={{maxWidth: 260, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: '12px' }}>
              {
                ancestor && <DropContainer onDrop={onTokenDrop} type='ancestor'>
                  <Stack spacing={1} direction='row' >
                  <div><strong>Symbol:</strong> {ancestor.symbol}</div>
                  <div><strong>Name:</strong> {ancestor.name}</div>
                  <div><strong>Decimals:</strong> {ancestor.decimals}</div>
                  <div><strong>ChainId:</strong> {ancestor.chainID}</div>
                  <Chip size="small" label={chains.find(v=>Number(v.chainID) === Number(ancestor.chainID))?.chainType} />

                  </Stack>
                  <div><strong>Address:</strong> {ancestor.address}</div>
                </DropContainer>
              }
              {
                !ancestor && <DropContainer onDrop={onTokenDrop} type='ancestor'>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <Typography variant='body2' color='textSecondary'>Drop Token ⭐ Here</Typography>
                  </Box>
                </DropContainer>
              }
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell style={{backgroundColor: '#b6f4cc', minWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} >From Account</StyledTableCell>
            <StyledTableCell style={{maxWidth: 260, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: '12px' }}>
              {
                from && <DropContainer onDrop={onTokenDrop} type='from'>
                <Stack spacing={1} direction='row' >
                <div><strong>Symbol:</strong> {from.symbol}</div>
                <div><strong>Name:</strong> {from.name}</div>
                <div><strong>Decimals:</strong> {from.decimals}</div>
                <div><strong>ChainId:</strong> {from.chainID}</div>
                <Chip size="small" label={chains.find(v=>Number(v.chainID) === Number(from.chainID))?.chainType} />
                </Stack>
                <div><strong>Address:</strong> {from.address}</div>
              </DropContainer>
              }
              {
                !from && <DropContainer onDrop={onTokenDrop} type='from'>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <Typography variant='body2' color='textSecondary'>Drop Token ⭐ Here</Typography>
                  </Box>
                </DropContainer>
              }
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell style={{backgroundColor: '#b6f4cc', minWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} >To Account</StyledTableCell>
            <StyledTableCell style={{maxWidth: 260, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: '12px' }}>
              {
                to && <DropContainer onDrop={onTokenDrop} type='to'>
                  <Stack spacing={1} direction='row' >
                  <div><strong>Symbol:</strong> {to.symbol}</div>
                  <div><strong>Name:</strong> {to.name}</div>
                  <div><strong>Decimals:</strong> {to.decimals}</div>
                  <div><strong>ChainId:</strong> {to.chainID}</div>
                  <Chip size="small" label={chains.find(v=>Number(v.chainID) === Number(to.chainID))?.chainType} />
                  </Stack>
                  <div><strong>Address:</strong> {to.address}</div>
                </DropContainer>
              }
              {
                !to && <DropContainer onDrop={onTokenDrop} type='to'>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <Typography variant='body2' color='textSecondary'>Drop Token ⭐ Here</Typography>
                  </Box>
                </DropContainer>
              }
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell style={{backgroundColor: '#b6f4cc', maxWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} >Offline OPs</StyledTableCell>
            <StyledTableCell >
              <Stack spacing={1} direction='row' >
              <Button size='small' variant='outlined' color='secondary' style={{ textTransform: 'none' }} onClick={async ()=>{
                try {
                  console.log('pair', pair);
                  // create sc instance and call transfer by ethers.js 
                  const sc = new ethers.Contract('0x0000000000000000000000000000000000000000', TOKEN_MANAGER_ABIS);
                  // call addTokenPair function 
                  let tx = await sc.populateTransaction.addTokenPair(...pair);
                  console.log(id, 'tx', tx);
                  let data = tx.data;
                  console.log('data', data);
                  // write to clipboard
                  navigator.clipboard.writeText(data.toString());
                } catch (error) {
                  console.error(error);
                }
              }}>Pack Add</Button>
              <Button size='small' variant='outlined' color='secondary' style={{ textTransform: 'none' }} onClick={async ()=>{
                try {
                  console.log('pair', pair);
                  
                  // create sc instance and call transfer by ethers.js 
                  const sc = new ethers.Contract('0x0000000000000000000000000000000000000000', TOKEN_MANAGER_ABIS);
                  // call addTokenPair function 
                  const tx = await sc.populateTransaction.updateTokenPair(...pair);
                  console.log(id, 'tx', tx);
                  let data = tx.data;
                  console.log('data', data);
                  // write to clipboard
                  navigator.clipboard.writeText(data);
                } catch (error) {
                  console.error(error);
                }
              }}>Pack Update</Button>
              <Button size='small' variant='outlined' color='secondary' style={{ textTransform: 'none' }} onClick={async ()=>{
                try {
                  console.log('pair', pair);
                  // create sc instance and call transfer by ethers.js 
                  const sc = new ethers.Contract('0x0000000000000000000000000000000000000000', TOKEN_MANAGER_ABIS);
                  // call addTokenPair function 
                  const tx = await sc.populateTransaction.removeTokenPair(pair[0]);
                  console.log(id, 'tx', tx);
                  let data = tx.data;
                  console.log('data', data);
                  // write to clipboard
                  navigator.clipboard.writeText(data);
                } catch (error) {
                  console.error(error);
                }
              }}>Pack Remove</Button>
              </Stack>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell style={{backgroundColor: '#b6f4cc', maxWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} >Operations</StyledTableCell>
            <StyledTableCell >
              <Stack spacing={1} direction='row' >
              <Select placeholder="Select Chain" menuPlacement="top" options={networkOptions} value={network}
                styles={customStyles}
                onChange={(e)=>{
                  console.log(e);
                  setNetwork(e);
                }} />
              <Button size='small' variant='outlined' color='secondary' style={{ textTransform: 'none' }} onClick={async ()=>{
                try {
                  console.log('pair', pair);
                  console.log('network', network);
                  if (!network) {
                    window.alert('Please select a chain');
                    return;
                  }
                  let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                  console.log(accounts);
                  // switch wallet network to network.walletChainId 
                  const chainInfo = MAINNET_TOKEN_MANAGER.find(v=>v.chainName === network.label);

                  await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: chainInfo.walletChainId }],
                  });
                  // create sc instance and call transfer by ethers.js 
                  const sc = new ethers.Contract(network.value, TOKEN_MANAGER_ABIS, new ethers.providers.Web3Provider(window.ethereum).getSigner());
                  // call addTokenPair function 
                  const tx = await sc.addTokenPair(...pair);
                  console.log(id, 'tx', tx);
                } catch (error) {
                  console.error(error);
                }
              }}>Add</Button>
              <Button size='small' variant='outlined' color='secondary' style={{ textTransform: 'none' }} onClick={async ()=>{
                try {
                  console.log('pair', pair);
                  console.log('network', network);
                  if (!network) {
                    window.alert('Please select a chain');
                    return;
                  }
                  let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                  console.log(accounts);
                  // switch wallet network to network.walletChainId 
                  const chainInfo = TESTNET_TOKEN_MANAGER.find(v=>v.chainName === network.label);

                  await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: chainInfo.walletChainId }],
                  });
                  // create sc instance and call transfer by ethers.js 
                  const sc = new ethers.Contract(network.value, TOKEN_MANAGER_ABIS, new ethers.providers.Web3Provider(window.ethereum).getSigner());
                  // call addTokenPair function 
                  const tx = await sc.updateTokenPair(...pair);
                  console.log(id, 'tx', tx);
                } catch (error) {
                  console.error(error);
                }
              }}>Update</Button>
              <Button size='small' variant='outlined' color='secondary' style={{ textTransform: 'none' }} onClick={async ()=>{
                try {
                  console.log('pair', pair);
                  console.log('network', network);
                  if (!network) {
                    window.alert('Please select a chain');
                    return;
                  }
                  let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                  console.log(accounts);
                  // switch wallet network to network.walletChainId 
                  const chainInfo = TESTNET_TOKEN_MANAGER.find(v=>v.chainName === network.label);

                  await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: chainInfo.walletChainId }],
                  });
                  // create sc instance and call transfer by ethers.js 
                  const sc = new ethers.Contract(network.value, TOKEN_MANAGER_ABIS, new ethers.providers.Web3Provider(window.ethereum).getSigner());
                  // call addTokenPair function 
                  const tx = await sc.removeTokenPair(pair[0]);
                  console.log(id, 'tx', tx);
                } catch (error) {
                  console.error(error);
                }
              }}>Remove</Button>
              <Button size='small' variant='outlined' color='secondary' style={{ textTransform: 'none' }} onClick={()=>{
                //write pair to clipboard
                navigator.clipboard.writeText(JSON.stringify(pair));
              }}>Copy</Button>
              <Button size='small' variant='outlined' color='secondary' style={{ textTransform: 'none' }} onClick={async ()=>{
                //read pair from clipboard
                const text = await navigator.clipboard.readText();
                try {
                  const _pair = JSON.parse(text);
                  updatePair(id, _pair);
                } catch (error) {
                  console.log(error);
                }
              }}>Paste</Button>
              </Stack>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
}


export default function Mainnet() {
  const [updater, setUpdater] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tokenPairs, setTokenPairs] = useState([]);
  const [filter, setFilter] = useState('');
  const [filter2, setFilter2] = useState('');
  const [filter3, setFilter3] = useState('');
  const [currentPairs, setCurrentPairs] = useState([]);
  const [chains, setChains] = useState([]);
  const [showAddToken, setShowAddToken] = useState(false);
  const [addTokenChainId, setAddTokenChainId] = useState('');
  const [addTokenAddress, setAddTokenAddress] = useState('');
  const [addTokenSymbol, setAddTokenSymbol] = useState('');
  const [addTokenName, setAddTokenName] = useState('');
  const [addTokenDecimals, setAddTokenDecimals] = useState('');
  const [tokenUpdater, setTokenUpdater] = useState(0);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  

  useEffect(()=>{
    // load currentPairs from window object
    if (window.currentPairs) {
      setCurrentPairs(window.currentPairs);
      window.currentPairs = undefined;
    }
  }, []);
  

  useEffect(() => {
    const func = async () => {
      setLoading(true);
      let ret;
      try {
        ret = await fetch('/api/supportedChains/testnet');
        ret = await ret.json();
        console.log(ret);
        setChains(ret.data);
        ret = await fetch('/api/tokenPairsHash/mainnet');
        ret = await ret.json();
        console.log('hash', ret.data);

        // compare with local storage
        const localHash = localStorage.getItem('tokenPairsHash_mainnet');
        if (localHash === ret.data) {
          console.log('same hash');
          // load cached token pairs
          const localTokenPairs = localStorage.getItem('tokenPairs_mainnet');
          if (localTokenPairs) {
            setTokenPairs(JSON.parse(localTokenPairs).reverse());
          }
          setLoading(false);
          return;
        }
        localStorage.setItem('tokenPairsHash_mainnet', ret.data);
        localStorage.removeItem('tokenPairs_mainnet');
        ret = await fetch('/api/tokenPairs/mainnet');
        ret = await ret.json();
        console.log(ret);
        localStorage.setItem('tokenPairs_mainnet', JSON.stringify(ret.data));
        setTokenPairs(ret.data.reverse());
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }

    func();
    
  }, [updater]);

  const [tokens, setTokens] = useState({});

  useEffect(() => {
    let _tokens = {};
    
    tokenPairs.forEach(v => {
      _tokens[v.ancestorAccount + "_" + v.ancestorChainID + "_" + v.ancestorSymbol + '_' + chains.find(m=>Number(m.chainID) === Number(v.ancestorChainID))?.chainType] = {
        symbol: v.ancestorSymbol,
        name: v.ancestorName,
        decimals: v.ancestorDecimals,
        chainID: v.ancestorChainID,
        address: v.ancestorAccount,
      };
      _tokens[v.fromAccount + "_" + v.fromChainID + "_" + v.fromSymbol + '_' + chains.find(m=>Number(m.chainID) === Number(v.fromChainID))?.chainType] = {
        symbol: v.fromSymbol,
        name: v.fromName,
        decimals: v.fromDecimals,
        chainID: v.fromChainID,
        address: v.fromAccount,
      };
      _tokens[v.toAccount + "_" + v.toChainID + "_" + v.symbol + '_' + chains.find(m=>Number(m.chainID) === Number(v.toChainID))?.chainType] = {
        symbol: v.symbol,
        name: v.name,
        decimals: v.decimals,
        chainID: v.toChainID,
        address: v.toAccount,
      };
    });
    // load local storage custom token 
    const localTokens = window.localStorage.getItem('custom_tokens_mainnet');
    if (localTokens) {
      const customTokens = JSON.parse(localTokens);
      customTokens.forEach(v => {
        _tokens[v.address + "_" + v.chainID + "_" + v.symbol + '_' + chains.find(m=>Number(m.chainID) === Number(v.chainID))?.chainType] = {
          symbol: v.symbol,
          name: v.name,
          decimals: v.decimals,
          chainID: v.chainID,
          address: v.address,
        };
      });
    }

    setTokens(_tokens);
  }, [tokenPairs, chains, tokenUpdater]);

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

  const chainOptions = useMemo(()=>{
    return chains.map((chain) => ({
      value: chain.chainID,
      label: chain.chainName,
    }));
  }, [chains]);

  const onPairDrop = useCallback((item)=>{
    let id = item.id;
    console.log('drop', id);
    console.log('tokenPairs in drop', tokenPairs.length);
    console.log('currentPairs in drop', currentPairs.length);
    if(!id.includes('tokenPair_')) return;
    const tokenPairId = id.replace('tokenPair_', '');
    let tokenPair = tokenPairs.find(v=>Number(v.id) === Number(tokenPairId));
    if(!tokenPair) {
      console.log('tokenPair not found');
      console.log('tokenPairs', tokenPairs);
      console.log('tokenPairId', tokenPairId);
      let _localTokenPairs = localStorage.getItem('tokenPairs_mainnet');
      if (_localTokenPairs) {
        _localTokenPairs = JSON.parse(_localTokenPairs);
        console.log('_localTokenPairs', _localTokenPairs);
        tokenPair = _localTokenPairs.find(v=>Number(v.id) === Number(tokenPairId));
        console.log('tokenPair', tokenPair);
        if (!tokenPair) {
          return;
        }
      }
    }
    console.log('selected', tokenPair);
    let formatPair = [
      tokenPair.id,
      [tokenPair.ancestorAccount, tokenPair.ancestorName, tokenPair.ancestorSymbol, tokenPair.ancestorDecimals, tokenPair.ancestorChainID],
      tokenPair.fromChainID,
      tokenPair.fromAccount,
      tokenPair.toChainID,
      tokenPair.toAccount,
    ];
    setCurrentPairs(prevPairs => [...prevPairs, formatPair]);
  }, [tokenPairs]);


  const [filters, setFilters] = useState({});


  return (
    <Container maxWidth="lg" className={styles.container}>
      <DndProvider backend={HTML5Backend}>
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
          {/* <TextField label="Filter" value={filter} onChange={e => setFilter(e.target.value)} size="small" variant="outlined" style={{ backgroundColor: 'white', marginBottom: '10px', border: 'none', borderRadius: 8 }} /> */}
          <Card style={{ borderRadius: 8, overflow: 'hidden' }}>
          <TableContainer style={{ maxHeight: 300, overflow: 'auto' }}>
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
                <TableRow>
                  <StyledTableHeaderCell><input value={filters['TokenPairID']} placeholder='Filter by TokenPairID' onChange={e=>setFilters(pre=>({...pre, ['TokenPairID']: e.target.value}))} /></StyledTableHeaderCell>
                  <StyledTableHeaderCell><input value={filters['AncestorSymbol']} placeholder='Filter by AncestorSymbol' onChange={e=>setFilters(pre=>({...pre, ['AncestorSymbol']: e.target.value}))} /></StyledTableHeaderCell>
                  <StyledTableHeaderCell><input value={filters['AncestorDecimals']} placeholder='Filter by AncestorDecimals' onChange={e=>setFilters(pre=>({...pre, ['AncestorDecimals']: e.target.value}))} /></StyledTableHeaderCell>
                  <StyledTableHeaderCell><input value={filters['AncestorChainID']} placeholder='Filter by AncestorChainID' onChange={e=>setFilters(pre=>({...pre, ['AncestorChainID']: e.target.value}))} /></StyledTableHeaderCell>
                  <StyledTableHeaderCell><input value={filters['FromChainID']} placeholder='Filter by FromChainID' onChange={e=>setFilters(pre=>({...pre, ['FromChainID']: e.target.value}))} /></StyledTableHeaderCell>
                  <StyledTableHeaderCell><input value={filters['ToChainID']} placeholder='Filter by ToChainID' onChange={e=>setFilters(pre=>({...pre, ['ToChainID']: e.target.value}))} /></StyledTableHeaderCell>
                  <StyledTableHeaderCell><input value={filters['AncestorAccount']} placeholder='Filter by AncestorAccount' onChange={e=>setFilters(pre=>({...pre, ['AncestorAccount']: e.target.value}))} /></StyledTableHeaderCell>
                  <StyledTableHeaderCell><input value={filters['FromAccount']} placeholder='Filter by FromAccount' onChange={e=>setFilters(pre=>({...pre, ['FromAccount']: e.target.value}))} /></StyledTableHeaderCell>
                  <StyledTableHeaderCell><input value={filters['ToAccount']} placeholder='Filter by ToAccount' onChange={e=>setFilters(pre=>({...pre, ['ToAccount']: e.target.value}))} /></StyledTableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tokenPairs.filter(v=>Number(v.id) < 10000).filter(v=>{ 
                  if (filters['TokenPairID'] && !v.id.toLowerCase().includes(filters['TokenPairID'].toLowerCase())) return false;
                  if (filters['AncestorSymbol'] && !v.ancestorSymbol.toLowerCase().includes(filters['AncestorSymbol'].toLowerCase())) return false;
                  if (filters['AncestorDecimals'] && !v.ancestorDecimals.toLowerCase().includes(filters['AncestorDecimals'].toLowerCase())) return false;
                  if (filters['AncestorChainID'] && !v.ancestorChainID.toLowerCase().includes(filters['AncestorChainID'].toLowerCase())) return false;
                  if (filters['FromChainID'] && !v.fromChainID.toLowerCase().includes(filters['FromChainID'].toLowerCase())) return false;
                  if (filters['ToChainID'] && !v.toChainID.toLowerCase().includes(filters['ToChainID'].toLowerCase())) return false;
                  if (filters['AncestorAccount'] && !v.ancestorAccount.toLowerCase().includes(filters['AncestorAccount'].toLowerCase())) return false;
                  if (filters['FromAccount'] && !v.fromAccount.toLowerCase().includes(filters['FromAccount'].toLowerCase())) return false;
                  if (filters['ToAccount'] && !v.toAccount.toLowerCase().includes(filters['ToAccount'].toLowerCase())) return false;

                  return true;
                }).map((row, index) => (
                  <TableRow key={row.id} sx={{ 
                    '&:nth-of-type(odd)': { backgroundColor: '#bae4e2' },
                    '&:nth-of-type(even)': { backgroundColor: '#fcfcfc' }
                    }}>
                    <StyledTableCell component="th" scope="row" style={{ minWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      <Stack spacing={2} direction='row'><div>{row.id}</div><DraggableItem id={'tokenPair_'+row.id}>⭐</DraggableItem></Stack>
                    </StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.ancestorSymbol}</StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.ancestorDecimals}</StyledTableCell>
                    <StyledTableCell style={{ minWidth: 150, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.ancestorChainID}<Chip size="small" label={chains.find(v=>Number(v.chainID) === Number(row.ancestorChainID))?.chainType} /></StyledTableCell>
                    <StyledTableCell style={{ minWidth: 150, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.fromChainID}<Chip size="small" label={chains.find(v=>Number(v.chainID) === Number(row.fromChainID))?.chainType} /></StyledTableCell>
                    <StyledTableCell style={{ minWidth: 150, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.toChainID}<Chip size="small" label={chains.find(v=>Number(v.chainID) === Number(row.toChainID))?.chainType} /></StyledTableCell>
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
          * All the token pairs.
          </Typography>
          </>
        )}
        
      </Paper>
      <Grid container spacing={2} className={styles.lowerPart} >
        <Grid item xs={5}>
          <Paper elevation={3} className={styles.leftPart}>
          {loading ? (
            <Box display="flex" justifyContent="center" p={1}>
              <CircularProgress />
            </Box>
            ) : (
              <>
              <Stack spacing={1} direction='row'>
              <Button size='small' style={{marginBottom: '10px', textTransform:'none'}} variant='outlined' onClick={()=>setShowAddToken(true)}>Add Token...</Button>
              </Stack>
              <Card style={{ borderRadius: 8, overflow: 'hidden' }}>
              <TableContainer style={{ maxHeight: 300, overflow: 'auto' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <StyledTableHeaderCell>Chain</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Symbol</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Name</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Decimals</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Address</StyledTableHeaderCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableHeaderCell><input value={filters['Chain']} placeholder='Filter by Chain' onChange={e=>setFilters(pre=>({...pre, ['Chain']: e.target.value}))} /></StyledTableHeaderCell>
                      <StyledTableHeaderCell><input value={filters['Symbol']} placeholder='Filter by Symbol' onChange={e=>setFilters(pre=>({...pre, ['Symbol']: e.target.value}))} /></StyledTableHeaderCell>
                      <StyledTableHeaderCell><input value={filters['Name']} placeholder='Filter by Name' onChange={e=>setFilters(pre=>({...pre, ['Name']: e.target.value}))} /></StyledTableHeaderCell>
                      <StyledTableHeaderCell><input value={filters['Decimals']} placeholder='Filter by Decimals' onChange={e=>setFilters(pre=>({...pre, ['Decimals']: e.target.value}))} /></StyledTableHeaderCell>
                      <StyledTableHeaderCell><input value={filters['Address']} placeholder='Filter by Address' onChange={e=>setFilters(pre=>({...pre, ['Address']: e.target.value}))} /></StyledTableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(tokens).filter(v=>{
                      if (tokens[v]) {
                        let chain = chains.find(m=>tokens[v] && Number(m.chainID) === Number(tokens[v].chainID))?.chainType;
                        if (!chain) {
                          console.log('chain', chain, chains, tokens[v].chainID);
                        }

                        if (filters['Chain'] && chain && !chain.toLowerCase().includes(filters['Chain'].toLowerCase())) return false;
                        if (filters['Symbol'] && !tokens[v].symbol.toLowerCase().includes(filters['Symbol'].toLowerCase())) return false;
                        if (filters['Name'] && !tokens[v].name.toLowerCase().includes(filters['Name'].toLowerCase())) return false;
                        if (filters['Decimals'] && !tokens[v].decimals.toLowerCase().includes(filters['Decimals'].toLowerCase())) return false;
                        if (filters['Address'] && !tokens[v].address.toLowerCase().includes(filters['Address'].toLowerCase())) return false;
                      } else {
                        console.log('token not found', v, tokens);
                      }

                      return true;
                    }).map((row, index) => (
                      <TableRow key={row} sx={{ 
                        '&:nth-of-type(odd)': { backgroundColor: '#bae4e2' },
                        '&:nth-of-type(even)': { backgroundColor: '#fcfcfc' }
                        }}>
                        <StyledTableCell style={{ minWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}><Chip size="small" label={chains.find(v=>Number(v.chainID) === Number(tokens[row].chainID))?.chainType} /></StyledTableCell>
                        <StyledTableCell component="th" scope="row" style={{ maxWidth: 120, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                          <Stack spacing={2} direction='row'>
                            <DraggableItem id={'token,' +tokens[row].address + ',' + tokens[row].name + ',' + tokens[row].symbol + ',' + tokens[row].decimals + ','+tokens[row].chainID}>⭐</DraggableItem>
                            <div>{tokens[row].symbol}</div>
                          </Stack>
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
              * All the tokens.
              </Typography>
              </>
            )}
          </Paper>
        </Grid>

        <Grid item xs={7}>
          <Paper elevation={3} className={styles.rightPart}>
            <Stack spacing={1} direction='row' className={styles.buttonPanel}>
            <Button size='small' style={{marginBottom: '10px', textTransform:'none'}} variant='outlined' onClick={()=>{
              console.log('latestTokenPairId', latestTokenPairId);
              let newPairId = window.prompt('Please input the new token pair id', (Number(latestTokenPairId) + currentPairs.length +1).toString());
              let newPair = [(newPairId).toString(), ['0', '0', '0', '0', '0'], '0', '0', '0', '0'];
              setCurrentPairs([...currentPairs, newPair]);
            }}>+ Add TokenPair</Button>
            <Button size='small' style={{marginBottom: '10px', textTransform:'none'}} variant='outlined' onClick={()=>{
              // download currentPairs JSON from browser to local file system
              const element = document.createElement("a");
              const file = new Blob([JSON.stringify(currentPairs)], {type: 'text/plain'});
              element.href = URL.createObjectURL(file);
              // use date time for file name
              element.download = "MAINNET_TOKEN_MANAGER_" + new Date().toISOString().replace(/:/g, '-') + ".json";
              document.body.appendChild(element); // Required for this to work in FireFox
              element.click();
            }}>Save</Button>
            <Button size='small' style={{marginBottom: '10px', textTransform:'none'}} variant='outlined' onClick={()=>{
              // load currentPairs JSON from local file system to browser
              const element = document.createElement("input");
              element.type = "file";
              element.accept = ".json";
              element.onchange = (event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                  let _pairs = JSON.parse(event.target.result);
                  console.log('_pairs', _pairs);
                  setCurrentPairs(_pairs);
                };
                reader.readAsText(file);
              }
              element.click();
            }}>Load</Button>
            <Button size='small' style={{marginBottom: '10px', textTransform:'none'}} variant='outlined' onClick={()=>setCurrentPairs([])}>Clear</Button>
            <Button size='small' style={{marginBottom: '10px', textTransform:'none'}} variant='outlined' onClick={async ()=>{
              if (connected) {
                setAddress('');
                setConnected(false);
                return;
              }
              // connect metamask 
              if (!window.ethereum) {
                alert('Please install MetaMask first.');
                return;
              }
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              const account = accounts[0];
              setAddress(account);
              setConnected(true);
            }}>{connected && address ? address.slice(0, 6) + '...' + address.slice(-4) : 'Connect Wallet'}</Button>
            </Stack>
            <div className={styles.scrollContent}>
            <DropZone width="100%" height="90%" placeholder="Drag and Drop Token Pair ⭐ Here to Modify" onDrop={onPairDrop} tokenPairs={tokenPairs} currentPairs={currentPairs} />

            {
              currentPairs.length > 0 && currentPairs.map((v, i)=>{
                return <NewPair key={i} pair={v} tokens={tokens} chains={chains} updatePairId={(oldId, id)=>{
                  setCurrentPairs((pre)=>{
                    console.log('update', id);
                    let _pairs = pre.slice();
                    for (let i=0; i<_pairs.length; i++) {
                      if(Number(_pairs[i][0]) === Number(oldId)) {
                        _pairs[i][0] = id;
                        break;
                      }
                    }
                    return _pairs;
                  })
                }} removeItem={(id)=>{
                  setCurrentPairs((pre)=>{
                    console.log('remove', id);
                    let _pairs = pre.slice();
                    return _pairs.filter(v=>Number(v[0]) !== Number(id));
                  })
                }}
                updatePairToken={(id, type, token ) => {
                  setCurrentPairs((pre)=>{
                    console.log('update', id, token, type);
                    let _pairs = pre.slice();
                    for (let i=0; i<_pairs.length; i++) {
                      if(Number(_pairs[i][0]) === Number(id)) {
                        if(type === 'from') {
                          _pairs[i][2] = token.slice()[4];
                          _pairs[i][3] = token.slice()[0];
                        } else if(type === 'to') {
                          _pairs[i][4] = token[4];
                          _pairs[i][5] = token[0];
                        } else {
                          _pairs[i][1] = token.slice();
                        }
                        break;
                      }
                    }
                    return _pairs;
                  })
                }}
                updatePair={(id, _pair) => {
                  setCurrentPairs((pre)=>{
                    console.log('update', id, _pair);
                    let _pairs = pre.slice();
                    for (let i=0; i<_pairs.length; i++) {
                      if(Number(_pairs[i][0]) === Number(id)) {
                        _pairs[i] = _pair.slice();
                        _pairs[i][0] = id;
                        break;
                      }
                    }
                    return _pairs;
                  });
                }}
                />
              })
            }
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </DndProvider>
    {
      showAddToken && (
      <Dialog open={showAddToken} onClose={()=>setShowAddToken(false)} aria-labelledby="form-dialog-title" sx={{borderRadius: 10}}>
      <DialogTitle id="form-dialog-title">Add Token</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Select placeholder="Select Chain" options={chainOptions}
            styles={customStyles}
            onChange={(e)=>{
              console.log(e);
              setAddTokenChainId(e.value);
            }} />
          </Grid>
          <Grid item xs={12}>
            <TextField margin="dense" id="symbol" label="Symbol" type="text" fullWidth value={addTokenSymbol} onChange={e=>setAddTokenSymbol(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField margin="dense" id="name" label="Name" type="text" fullWidth value={addTokenName} onChange={e=>setAddTokenName(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField margin="dense" id="decimals" label="Decimals" type="text" fullWidth value={addTokenDecimals} onChange={e=>setAddTokenDecimals(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField margin="dense" id="address" label="Address" type="text" fullWidth value={addTokenAddress} onChange={e=>setAddTokenAddress(e.target.value)} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setShowAddToken(false)}>
          Cancel
        </Button>
        <Button onClick={()=>{
          // load localStorage mainnet tokens 
          let customTokens = JSON.parse(localStorage.getItem('custom_tokens_mainnet') || '[]');
          customTokens.push({
            chainID: addTokenChainId,
            symbol: addTokenSymbol,
            name: addTokenName,
            decimals: addTokenDecimals,
            address: addTokenAddress
          });
          localStorage.setItem('custom_tokens_mainnet', JSON.stringify(customTokens));
          setTokenUpdater(Date.now());
          setShowAddToken(false);
        }}>
          Confirm
        </Button>
      </DialogActions>
      </Dialog>
      )
    }
    
    </Container>
  )
}
