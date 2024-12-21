import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    Typography,
    Stack,
  } from '@mui/material';
  import { Close } from '@mui/icons-material';
  
  const Model = ({setShowModel,data}) => {
    
    
    return (
      <Dialog open={true} maxWidth="sm" fullWidth>
        <DialogTitle>Review info</DialogTitle>
        <Box sx={{display:'flex',alignItems:'center',gap:1,mx:2}} >
          <Box component="img" src={data.image} sx={{  width: 50, height: 50,borderRadius:30  }} />
          <Typography>{data.username}</Typography>
        </Box>
        <Box position="absolute" top={4} right={4}>
          <Close onClick={()=>setShowModel(false)} />
        </Box>
        <DialogContent>
          <Typography>{data.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={()=>setShowModel(false)}>
            Solve
          </Button>
          <Button color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default Model;