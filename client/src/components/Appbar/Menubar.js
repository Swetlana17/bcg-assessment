import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from './styles';


export default function Menubar() {
  const classes = useStyles();
  return (
      <AppBar position="static" className={classes.title}>
        <Toolbar>
        <Button color="inherit" href="/">
          HOME
         </Button>
          <Button color="inherit" href="/table">Tables</Button>
        </Toolbar>
      </AppBar>
   
  );
}