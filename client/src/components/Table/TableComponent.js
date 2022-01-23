import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import { Container, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SearchBar from "material-ui-search-bar";


//////////custom styles////////////////

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


////////Table component/////////////////////

export default function TableComponent() {

  //states
    const [data,setData]=useState([]); //fetching original data from backend
    const [loading,setLoading]=useState(true); //loader when the data fetching is in progress
    const [searched, setSearched] = useState(""); //searching values 
    const [rows, setRows] = useState([]); //filtered value to be pushed 

  //methods
    const onToggleEditMode=()=>{
      console.log("open popup")
    }
    const requestSearch = (searchedVal) => {
      setRows([])
      setLoading(true);

      const filteredRows = rows.filter((row) => {
        return row.Policy_id.toString().trim().includes(searchedVal.toString()); 
      });
      setRows(filteredRows);
      setLoading(false);
    };
    
    const requestSearchCustomer = (searchedVal) => {
      setRows([])
      setLoading(true);

      const filteredRows = rows.filter((row) => {
        return row.Customer_id.toString().includes(searchedVal.toString()); 
      });
      setRows(filteredRows);
      setLoading(false);
          
    };
    const cancelSearch = () => {
      setSearched("");
      setRows(data);
    };
    useEffect(()=>{
       fetch("/data").then(res=>res.json()).then(data => 
        {
          setData(data);
          setRows(data);
          setLoading(false);
        })
      },[rows,loading])
  return (
    <Container maxWidth="xl">
    {
      loading && <Box  style={{position: 'absolute',
        left: '50%',
        top: '50%'}}>
      <CircularProgress />
      <p>Loading...</p>
    </Box>
    }
    <Typography variant="h3" style={{textAlign: 'center'}}>Insurance Client Data</Typography>
    <Container style={{padding:'50px'}}>
    <SearchBar style={{display:'inline-flex'}}
    placeholder="Search by Policy ID"
    value={searched}
    onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />

        <SearchBar style={{display:'inline-flex',float:'right'}}
        placeholder="Search by Customer ID"
        value={searched}
          onChange={(searchVal) => requestSearchCustomer(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        </Container>
    <TableContainer component={Paper}>
      <Table  sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>          
          <StyledTableCell>Edit</StyledTableCell>
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
          {rows.map((row,key) => (
            <StyledTableRow key={row.Policy_id}>
            <StyledTableCell>
            
               
                  <IconButton
                    aria-label="done"
                    onClick={() => onToggleEditMode(row.id)}
                  ><EditIcon/></IconButton>
                    
            </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.Policy_id}
              </StyledTableCell>
              <StyledTableCell align="right">{row['Date of Purchase']}</StyledTableCell>
              <StyledTableCell align="right">{row.Customer_id}</StyledTableCell>
              <StyledTableCell align="right">{row.Fuel}</StyledTableCell>
              <StyledTableCell align="right">{row.VEHICLE_SEGMENT}</StyledTableCell>
              <StyledTableCell align="right">{row.Premium}</StyledTableCell>
              <StyledTableCell align="right">{row['bodily injury liability']=="0"?"No":"Yes"}</StyledTableCell>
              <StyledTableCell align="right">{row[' personal injury protection']=="0"?"No":"Yes"}</StyledTableCell>
              <StyledTableCell align="right">{row[' property damage liability']=="0"?"No":"Yes"}</StyledTableCell>
              <StyledTableCell align="right">{row[' collision']=="0"?"No":"Yes"}</StyledTableCell>
              <StyledTableCell align="right">{row[' comprehensive']=="0"?"No":"Yes"}</StyledTableCell>
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