import { Container,  MenuItem, TextField, Typography } from "@mui/material";
import React,{useState} from "react";
import useStyles from './styles';
import {ChartComponent} from './ChartComponent'
import DonutGender from "./DonutGender";
import { Card } from "@material-ui/core";

export default function FilterComponent(){
    const [year,setYear] =useState("All");
    const [region,setRegion]=useState("All");
    const classes = useStyles();
    const years=["All","2018"]
    const regions=["All","North","South","East","West"]
    const [props,setProps]=useState({
        
    })
    
    React.useEffect(()=>{
        setProps({
        "region":region
        })
    },[region])
    return(
        <>
        <Container className={classes.title}>
        <Typography variant="h3">Report of Premium for {year} year in {region} Region.</Typography>
        <div className={classes.dropdown}>
        <TextField
        select
        label="Year"
        fullWidth
        value={year}
        onChange={(e)=>setYear(e.target.value)}
        >
        {years.map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </TextField>
        </div>
        <div className={classes.dropdown}>
        <TextField
        select
        label="Region"
        value={region}
        fullWidth
        onChange={(e)=>setRegion(e.target.value)}
        >
        {regions.map((reg) => (
            <MenuItem key={reg} value={reg}>
              {reg}
            </MenuItem>
          ))}
        </TextField>
        </div>
        <div className={classes.barchart}>
        <ChartComponent {...props} />
        </div>
        <div className={classes.donut}>
        <Card>
        <Typography variant="h5" style={{paddingBottom:'50px'}}>Premium Among Male and Females in All Regions</ Typography>
        <DonutGender/>
        </Card>
        </div>
        </Container>

        </>
    )
}