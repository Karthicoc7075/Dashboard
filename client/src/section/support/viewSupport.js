import React, { useState,useEffect } from 'react'
import { Container, Grid, Typography, Card, CardMedia, Button, Box, CircularProgress, Avatar, Rating, IconButton, Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import AvatarImg from '../../assets/avatar_25.jpg'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteModel from "../../components/model/deleteModel";
import SolveModel from '../../components/model/solveModel';
import { useDispatch, useSelector } from "react-redux";
import { getAllSupports,deleteSupport,solveSupport } from "../../features/support/actions/supportActions";
import { getAllSupportSelector , loadingSelector, deleteLoadingSelector,solveLoadingSelector } from "../../features/support/selectors/supportSelectors";
import moment from 'moment';


export default function ViewSupport() {
  const [showModel, setShowModel] = useState(false)
  const [showSolveModel, setShowSolveModel] = useState(false)
  const supports = useSelector(getAllSupportSelector);
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState(null);
  const [solveId, setSolveId] = useState(null);
  const loading = useSelector(loadingSelector);
  const deleteLoading = useSelector(deleteLoadingSelector);
  const solveLoading = useSelector(solveLoadingSelector);


  
  useEffect(() => {
    if (supports.length === 0) {
      dispatch(getAllSupports());
    }

  }, []);



useEffect(()=>{
  setShowModel(false);
  setShowSolveModel(false);
},[deleteLoading,solveLoading])

  const deleteHandle = () => {
    dispatch(deleteSupport(deleteId));
    setDeleteId(null);
  }

  const solveHandle = () => {
    dispatch(solveSupport(solveId));
    setSolveId(null);
  }
  
  return (
    <Container maxWidth="xl"   >
       <DeleteModel 
           showModel={showModel}
            setShowModel={setShowModel}
            deleteHandle={deleteHandle}
            data='Support'
            loading={deleteLoading}
           />
            <SolveModel
            showModel={showSolveModel}
            setShowModel={setShowSolveModel}
            solveHandle={solveHandle}
            data='Support'
            loading={solveLoading}
            />
        
     
      {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }} >
        <CircularProgress />
      </Box> :
      <Grid container spacing={2} sx={{ mt: 1 }}  >
        {
           supports.map((item, index) => (
            <SupportItem key={index} item={item} setShowModel={setShowModel} setDeleteId={setDeleteId} setShowSolveModel={setShowSolveModel}  setSolveId={setSolveId}/>
          ))
        }
      </Grid>
}
     
    </Container>
  )
}

function SupportItem({ item, setShowModel,setDeleteId,setShowSolveModel,setSolveId }){
  const [loader, setLoader] = useState(true)

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const deleteButtonClick = () => {
    console.log('delete');
    setShowModel(true);
    setDeleteId(item._id);
    handleClose();
  }

  const sovleButtonClick = () => {
    setShowSolveModel(true);
    setSolveId(item._id);
    handleClose();
  }



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} >
      <Card
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          height: '100%',
          columnGap: 2,
          py: 2,
          px: 2,
          boxShadow: (theme) => theme.shadows[6],
          borderRadius: 2,
        }}
      >


        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1,width:'100%' }} >
          <Avatar sx={{ width: 50, height: 50, }} src={AvatarImg} />
          <Typography variant='subtitle1' >{item.user.username}</Typography>

        </Box>
        <Typography variant='h6' sx={{width:'100%'}}  >
          {item.title}
        </Typography>
        <Typography variant='body2'  >
          {item.message.slice(0, 80)}<span style={{ color: '#2979ff' }} onClick={() => setShowModel(true)} >{item.message.length >=80 && '...Read more'}</span>
        </Typography>


        <Box>
        <Typography variant='subtitle2' color={'text.secondary'} mt={2}  >Contact email:{item.user.email}</Typography>
          
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <IconButton id="long-button" onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
          <Typography variant='body2'>{moment(item.createdAt).fromNow()}</Typography>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
          >
            <MenuItem onClick={sovleButtonClick}  >Solve</MenuItem>
            <MenuItem onClick={deleteButtonClick}>Delete</MenuItem>
          </Menu>
        </Box>
      </Card>

    </Grid>
  )
}

