import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import { Button, Container, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SearchBar from "material-ui-search-bar";
import SinglePolicy from '../SinglePolicy/SinglePolicy';


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
    const [fetched, setFetched] = useState(false);
    const [page,setPagination] = useState(0);


  //methods
    const onToggleEditMode=(e)=>{
      console.log("open popup")
    }
    const nextPage=()=>{
      setRows(data.slice(10*(page+1),10*(page+1)+10))      
      setPagination(prev=>prev+1)
    }
    const prevPage=()=>{
      setRows(data.slice(10*(page-1),10*page))      
      setPagination(prev=>prev-1)
    }
    const requestSearch = (searchedVal) => {
      setRows([])
      setLoading(true);

      const filteredRows = data.filter((row) => {
        return row.Policy_id.toString().trim().includes(searchedVal.toString()); 
      });
      setRows(filteredRows);
      setLoading(false);
    };
    
    const requestSearchCustomer = (searchedVal) => {      
      setRows([])
      setLoading(true);
      const filteredRows = data.filter((row) => {
        return row.Customer_id.toString().includes(searchedVal.toString()); 
      });
      setRows(filteredRows);
      setLoading(false);
    };
    const cancelSearch = () => {
      setSearched("");
      setRows(data.slice(0,10));
    };
    useEffect(()=>{
      if(!fetched){
       fetch("/data").then(res=>res.json()).then(data => 
        {
          setFetched(true);
          setData(data);
          setRows(data.slice(1*page,1*page+10));
          setLoading(false);
        })
      }
      },[rows,loading])
  return (
    <Container maxWidth="xl">
    {
      loading 
      && <Box  
        style={{position: 'absolute',
        left: '50%',
        top: '50%'}}>
      <CircularProgress />
      <p>Loading...</p>
    </Box>
    }
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
            {
                  // <IconButton
                  //   aria-label="done"
                  //   onClick={() => console.log(row) }
                  // ><EditIcon/></IconButton>
            }
            <SinglePolicy props={row}/>
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
 <Box style={{padding:'8px'}}> 
 <div style={{textAlign:'center'}}>{page+1} of {Math.ceil(data.length/10)} </div>
 <Button  variant="contained" disabled={page===0} style={{display:'inline-flex'}} onClick={()=>prevPage()}>Prev</Button>
<Button  variant="contained" disabled={page === Math.ceil(data.length/10)} style={{display:'inline-flex',float:'right'}} onClick={()=>nextPage()}>Next</Button>
</Box>   
    </Container>
  );
}