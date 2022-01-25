import { makeStyles } from "@material-ui/core/styles";
import { hover } from "@testing-library/user-event/dist/hover";

export default makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    padding: '5em'
  },
  dropdown: {
    width:'25%',
    padding:'2% !important'
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
    right:'20%',
    top:'50%'
  },
  menus:{
    "&:hover":{
         color:'#fff',
         borderRadius:'10%'
      }
  }
}));
