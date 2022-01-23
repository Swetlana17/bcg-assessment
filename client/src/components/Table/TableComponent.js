import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function TableComponent() {
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        fetch("/data").then(res=>res.json()).then(data => 
          {
            setData(data);
            setLoading(false);
          })
        },[])
  return (
    <Container maxWidth="xl">
    {
      loading && <Box  style={{    position: 'absolute',
        left: '50%',
        top: '50%'}}>
      <CircularProgress />
      <p>Loading...</p>
    </Box>
    }
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Policy_id</StyledTableCell>
            <StyledTableCell align="right">Date of Purchase</StyledTableCell>
            <StyledTableCell align="right">Customer_id</StyledTableCell>
            <StyledTableCell align="right">Fuel</StyledTableCell>
            <StyledTableCell align="right">Vehicle Segment</StyledTableCell>
            <StyledTableCell align="right">Premium</StyledTableCell>
            <StyledTableCell align="right">Bodily injury liability</StyledTableCell>
            <StyledTableCell align="right">Personal injury protection</StyledTableCell>
            <StyledTableCell align="right">Property Damage liability</StyledTableCell>
            <StyledTableCell align="right">Collision</StyledTableCell>
            <StyledTableCell align="right">Comprehensive</StyledTableCell>
            <StyledTableCell align="right">Gender</StyledTableCell>
            <StyledTableCell align="right">Income group</StyledTableCell>
            <StyledTableCell align="right">Region</StyledTableCell>
            <StyledTableCell align="right">Marital status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,key) => (
            <StyledTableRow key={row.Policy_id}>
              <StyledTableCell component="th" scope="row">
                {row.Policy_id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Policy_id}</StyledTableCell>
              <StyledTableCell align="right">{row['Date of Purchase']}</StyledTableCell>
              <StyledTableCell align="right">{row.Fuel}</StyledTableCell>
              <StyledTableCell align="right">{row.VEHICLE_SEGMENT}</StyledTableCell>
              <StyledTableCell align="right">{row.Premium}</StyledTableCell>
              <StyledTableCell align="right">{row['bodily injury liability']}</StyledTableCell>
              <StyledTableCell align="right">{row[' personal injury protection']}</StyledTableCell>
              <StyledTableCell align="right">{row[' property damage liability']}</StyledTableCell>
              <StyledTableCell align="right">{row[' collision']}</StyledTableCell>
              <StyledTableCell align="right">{row[' comprehensive']}</StyledTableCell>
              <StyledTableCell align="right">{row.Customer_Gender}</StyledTableCell>
              <StyledTableCell align="right">{row['Customer_Income group']}</StyledTableCell>
              <StyledTableCell align="right">{row.Customer_Region}</StyledTableCell>
              <StyledTableCell align="right">{row.Customer_Marital_status=="0"?"Unmarried":"Married"}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}