import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    Typography,
    Card,
    CircularProgress,
  } from '@mui/material';
  import { Close } from '@mui/icons-material';
  
  const solveModel = ({showModel,setShowModel,solveHandle,data,loading} ) => {
    
    return (
     <Dialog open={showModel}>
      {
        !loading ?
        <Box  >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
            <Typography variant='h6' >Solve {data}</Typography>
            <IconButton onClick={() => setShowModel(false)} >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant='body1' >
            Are you sure you want to solve this {data}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModel(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={solveHandle} color="secondary">
            Solve
          </Button>
        </DialogActions>
      </Box>:
   
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p:2 }} ><CircularProgress /></Box>
      
      }
     </Dialog  >
    );
  };
  
  export default solveModel;