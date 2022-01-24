import { Typography } from "@mui/material";
import TableComponent from "../components/Table/TableComponent";

export default function TablePage(){
    return(
        <>
    <Typography variant="h3" style={{textAlign: 'center'}}>Insurance Client Data</Typography>
        <TableComponent/></>
    )
}