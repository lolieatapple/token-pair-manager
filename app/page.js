'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css'
import { Paper, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, CircularProgress, Card, TextField } from '@mui/material';
import { styled } from '@mui/system';

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Home() {
  const [updater, setUpdater] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tokenPairs, setTokenPairs] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const func = async () => {
      setLoading(true);
      try {
        let ret = await fetch('/api/tokenPairs/testnet');
        ret = await ret.json();
        console.log(ret);
        setTokenPairs(ret.data.reverse());
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }

    func();
    
  }, [updater]);

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
          <TableContainer style={{ maxHeight: 500, overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableHeaderCell>TokenPairID</StyledTableHeaderCell>
                  <StyledTableHeaderCell>AncestorSymbol</StyledTableHeaderCell>
                  <StyledTableHeaderCell>AncestorChainID</StyledTableHeaderCell>
                  <StyledTableHeaderCell>FromChainID</StyledTableHeaderCell>
                  <StyledTableHeaderCell>ToChainID</StyledTableHeaderCell>
                  <StyledTableHeaderCell>AncestorAccount</StyledTableHeaderCell>
                  <StyledTableHeaderCell>FromAccount</StyledTableHeaderCell>
                  <StyledTableHeaderCell>ToAccount</StyledTableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tokenPairs.filter(v=>v.ancestorSymbol.toLowerCase().includes(filter.toLowerCase()) || v.id.toLowerCase().includes(filter.toLowerCase())).map((row, index) => (
                  <TableRow key={row.id} sx={{ 
                    '&:nth-of-type(odd)': { backgroundColor: '#bae4e2' },
                    '&:nth-of-type(even)': { backgroundColor: '#fcfcfc' }
                    }}>
                    <StyledTableCell component="th" scope="row" style={{ maxWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.ancestorSymbol}</StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 60, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.ancestorChainID}</StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 160, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.fromChainID}</StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 160, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.toChainID}</StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 400, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.ancestorAccount}</StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 400, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.fromAccount}</StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 400, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{row.toAccount}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Card>
          </>
        )}
      </Paper>
      <Grid container spacing={2} className={styles.lowerPart} >
        <Grid item xs={4}>
          <Paper elevation={3} className={styles.leftPart}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={styles.middlePart}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={styles.rightPart}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </Container>
  )
}
