import { makeStyles } from "@material-ui/core/styles";
import { hover } from "@testing-library/user-event/dist/hover";

export default makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    padding: '5em'
  },
  dropdown: {
    padding:'2%',
    width:'25%',
    display:'inline-flex'
  },
  barchart: {
    position:'absolute',
    left:'10%',
    top:'40%',
  },
  chart: {
    width: '100% !important'
},
  donut:{
    position:'absolute',
    right:'10%',
    top:'40%',
    width:'35%'
  },
  menus:{
    "&:hover":{
         color:'#fff',
         borderRadius:'10%'
      }
  }
}));
