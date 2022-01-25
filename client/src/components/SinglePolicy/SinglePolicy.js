import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import { Alert, Backdrop } from "@mui/material";

export default function SinglePolicy(props) {
  const [open, setOpen] = React.useState(false);  
  const [policy, setPolicy] = React.useState([]);
  const [vehicles, setVehicles] = React.useState([
    { value: "A" },
    { value: "B" },
    { value: "C" },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave= () =>{
    if(policy.Premium<1000000){
    
    for(let i in policy){
      if(policy[i] === "Yes") policy[i]=1
      if(policy[i] === "No") policy[i]=0
      if(policy[i] === "Married") policy[i]=1
      if(policy[i] === "Unmarried") policy[i]=0
    }
    setTimeout(()=>{
      try{
    let id = policy._id
    delete policy._id

      fetch(`/update_data/${id}`,{
            'method':'PUT', headers : {
              'Content-Type':'application/json',
              'mode':'no-cors'
        },
      body:JSON.stringify(policy)
    })
    .then(response => {response.json();})
    .catch(error => {console.log(error);})
  setOpen(false)
  window.location.reload(false)  
  }
  catch(e){
    console.log(e);
  }},100)
}
  }
  const handleChange=(evt)=> {
    const value = evt.target.value;
    setPolicy({
      ...policy,
      [evt.target.name]: value,
    });
  }

  React.useEffect(() => {
    let temp=props.props;
    for(let i in temp){
      if(i==="Customer_Marital_status"){
        temp[i] = temp[i]== "0" ? "Unmarried" : "Married";
    }
    else if(temp[i] == "0" || temp[i] == "1"){      
      temp[i] = temp[i]== "0" ? "No" : "Yes";
    }
  }
  setPolicy(temp)
  }, [open]);
  return (
    <>
      <IconButton aria-label="done" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      {policy && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Policy Details</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              disabled
              id="name"
              value={policy.Policy_id}
              label="Policy Id"
              fullWidth
              size="small"
              variant="standard"
              sx={{ m: 1, width: "25ch" }}
            />{" "}
            <TextField
              margin="dense"
              disabled
              id="name"
              value={policy.Customer_id}
              label="Customer Id"
              fullWidth
              size="small"
              variant="standard"
              sx={{ m: 1, width: "25ch" }}
            />
            <TextField
              margin="dense"
              id="name"
              disabled
              value={policy["Date of Purchase"]}
              label="Date of Purchase"
              fullWidth
              variant="standard"
              sx={{ m: 1, width: "25ch" }}
            />
            <TextField
              margin="dense"
              id="name"
              name="Fuel"
              value={policy.Fuel}
              label="Fuel"
              fullWidth
              size="small"
              variant="standard"
              onChange={handleChange}
              sx={{ m: 1, width: "25ch" }}
            />
            <TextField
              margin="dense"
              id="name"
              select
              name="VEHICLE_SEGMENT"
              value={policy.VEHICLE_SEGMENT}
              label="Vehicle Segment"
              fullWidth
              size="small"
              variant="standard"
              onChange={handleChange}
              sx={{ m: 1, width: "25ch" }}
            >
              {vehicles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              margin="dense"
              id="name"
              name="Customer_Gender"
              value={policy.Customer_Gender}
              label="Gender"
              fullWidth
              size="small"
              variant="standard"
              onChange={handleChange}
              sx={{ m: 1, width: "25ch" }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
            <TextField
              sx={{ m: 1, width: "50ch" }}
              margin="dense"
              id="name"
              name="Premium"
              error={policy.Premium>1000000?true:false}
              helperText={policy.Premium>1000000?"Cannot be more than One million":""}
              value={policy.Premium}
              label="Premium"
              fullWidth
              size="small"
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              select
              margin="dense"
              id="name"
              name="Customer_Region"
              value={policy.Customer_Region}
              label="Region"
              fullWidth
              size="small"
              variant="standard"
              onChange={handleChange}
              sx={{ m: 1, width: "25ch" }}
            >
              <MenuItem value="East">East</MenuItem>
              <MenuItem value="West">West</MenuItem>
              <MenuItem value="North">North</MenuItem>
              <MenuItem value="South">South</MenuItem>
            </TextField>
            <TextField
              select
              margin="dense"
              id="name"
              name="Customer_Marital_status"
              value={
                policy.Customer_Marital_status
              }
              label="Marital Status"
              fullWidth
              size="small"
              variant="standard"
              onChange={handleChange}
              sx={{ m: 1, width: "25ch" }}
            >
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Unmarried">Unmarried</MenuItem>
            </TextField>
            <TextField
              select
              margin="dense"
              id="name"
              name="Customer_Income group"
              value={policy["Customer_Income group"]}
              label="Income Group"
              fullWidth
              size="small"
              variant="standard"
              onChange={handleChange}
              sx={{ m: 1, width: "25ch" }}
            >
              <MenuItem value="0- $25K">0- $25K</MenuItem>
              <MenuItem value="$25-$70K">$25-$70K</MenuItem>
              <MenuItem value=">$70K">{">$70K"}</MenuItem>
            </TextField>
            <TextField
              select
              margin="dense"
              id="name"
              name=" comprehensive"
              value={policy[" comprehensive"]}
              label="Comprehensive"
              fullWidth
              size="small"
              variant="standard"
              onChange={handleChange}
              sx={{ m: 1, width: "25ch" }}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
            <TextField
              select
              sx={{ m: 1, width: "25ch" }}
              margin="dense"
              id="name"
              name="bodily injury liability"
              value={policy["bodily injury liability"]}
              label="Bodily Injury Liability"
              fullWidth
              variant="standard"
              onChange={handleChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
            <TextField
              select
              sx={{ m: 1, width: "25ch" }}
              margin="dense"
              id="name"
              name=" personal injury protection"
              value={
                policy[" personal injury protection"]
              }
              label="Personal Injury Protection"
              fullWidth
              variant="standard"
              onChange={handleChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
            <TextField
              select
              sx={{ m: 1, width: "25ch" }}
              margin="dense"
              id="name"
              name=" property damage liability"
              value={policy[" property damage liability"]}
              label="Property Damage Liability"
              onChange={handleChange}
              fullWidth
              variant="standard"
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
            
            <TextField
              select
              sx={{ m: 1, width: "25ch" }}
              margin="dense"
              id="name"
              name=" collision"
              value={policy[" collision"]}
              label="Collision"
              onChange={handleChange}
              fullWidth
              variant="standard"
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
