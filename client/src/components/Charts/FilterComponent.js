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
        <TextField
        select
        className={classes.dropdown}
        value={year}
        onChange={(e)=>setYear(e.target.value)}
        >
        {years.map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </TextField>
        <TextField
        select
        className={classes.dropdown}
        value={region}
        onChange={(e)=>setRegion(e.target.value)}
        >
        {regions.map((reg) => (
            <MenuItem key={reg} value={reg}>
              {reg}
            </MenuItem>
          ))}
        </TextField>
        <div className={classes.barchart}>
        <ChartComponent {...props} />
        </div>
        <div className={classes.donut}>
        <Card>
        <Typography variant="h5">Premium Among Male and Females</ Typography>
        <DonutGender/>
        </Card>
        </div>
        </Container>

        </>
    )
}