import React, { useState ,useEffect} from 'react'
import { Container, Grid, Typography, Card, CardMedia, Button, Box, CircularProgress, Avatar, Rating, IconButton, Menu, MenuItem } from '@mui/material'
import AvatarImg from '../../assets/avatar_25.jpg'
import { GridMenuIcon } from '@mui/x-data-grid'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'
import DeleteModel from "../../components/model/deleteModel";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews,deleteReview } from "../../features/review/actions/reviewActions";
import { getAllReviewSelector, loadingSelector, deleteLoadingSelector } from "../../features/review/selectors/reviewSelectors";




export default function ViewReview() {
  const [showDeleteModel, setShowDeleteModel] = useState(false)
  const [deleteId, setDeleteId] = useState(null);
  const reviews = useSelector(getAllReviewSelector);
  const loading = useSelector(loadingSelector);
  const deleteLoading = useSelector(deleteLoadingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reviews.length === 0) {
      dispatch(getAllReviews());
    }

  }, [reviews]);


  useEffect(()=>{
    setShowDeleteModel(false);
  
  },[deleteLoading])

  const deleteHandle = () => {
    dispatch(deleteReview(deleteId));
    setDeleteId(null);
  }

  console.log(deleteId,showDeleteModel);
  

  return (
    <Container maxWidth="xl"   >
           <DeleteModel 
           showModel={showDeleteModel}
            setShowModel={setShowDeleteModel}
            deleteHandle={deleteHandle}
            data='Review'
            loading={deleteLoading}
           />
      <Box sx={{ display: 'flex', my: 2 }}>
        <Typography variant='h5' sx={{ flexGrow: 1 }} >Reviews</Typography>
        
      </Box>
      {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }} >
        <CircularProgress />
      </Box> :
      <Grid container spacing={2} sx={{ mt: 1 }}  >
        {reviews.map((item, index) => (
          <ReviewItem key={index} item={item} setShowDeleteModel={setShowDeleteModel} setDeleteId={setDeleteId} />
        ))}
      </Grid>
}
    </Container>
  )
}



function ReviewItem({ item, setShowDeleteModel,setDeleteId }){
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const deleteButtonClick = (id) => {
    setShowDeleteModel(true);
    setDeleteId(id);
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
          columnGap: 2,
          py: 2,
          px: 2,
          boxShadow: (theme) => theme.shadows[6],
          borderRadius: 2,
        }}
      >
        <Avatar sx={{ width: 50, height: 50, }} src={AvatarImg} />

        <Box sx={{ py: 1 }} >
          <Typography variant='subtitle1' >{item.user.username}</Typography>
          <Rating sx={{ py: 1 }} name="read-only" value={item.rating} readOnly />
          <Typography variant='subtitle1' >{item.comment}</Typography>
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
            <MenuItem onClick={()=>deleteButtonClick(item._id)}>Delete</MenuItem>
          </Menu>
        </Box>
      </Card>

    </Grid>
  )
}

