import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Card, CardMedia, Button, Box, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import DeleteModel from "../../components/model/deleteModel";
import { useDispatch, useSelector } from "react-redux";
import { deleteSlider,getAllSliders } from "../../features/slider/actions/sliderActions";
import { getAllSliderSelector , loadingSelector, deleteLoadingSelector } from "../../features/slider/selectors/sliderSelectors";
import UpdateModel from "./updateSlider";
import CreateModel from "./createSlider";

export default function ViewSlider() {
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [showUpdateModel, setShowUpdateModel] = useState(false);
    const [showCreateModel, setShowCreateModel] = useState(false);
    const [deleteId, setDeleteId] = useState(null)
    const [updateId, setUpdateId] = useState(null)
    const sliders = useSelector(getAllSliderSelector);
    const dispatch = useDispatch();
    const loading = useSelector(loadingSelector);
    const deleteLoading = useSelector(deleteLoadingSelector);

    useEffect(() => {
        if (sliders.length === 0) {
          dispatch(getAllSliders());
        }
    
        
      }, [sliders]);

      useEffect(()=>{
        if(!deleteLoading){
            setShowDeleteModel(false);
        }
      },[deleteLoading])
    
      const deleteHandle = () => {
        dispatch(deleteSlider(deleteId));
        setDeleteId(null);
      }

      const createHandle = () => {  
        setShowCreateModel(true);
      }
    

    return (
        <Container maxWidth="xl"   >
            <Box sx={{ display: 'flex', my: 2 }}>
                <Typography variant='h5' sx={{ flexGrow: 1 }} >Sliders</Typography>
                <Button variant='contained' sx={{ p: 1.2, backgroundImage:(theme)=> theme.palette.gradientColors[1],}}  onClick={createHandle}  >ADD SLIDER</Button>
            </Box>
            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }} >
        <CircularProgress />
      </Box> :
            <Grid container spacing={2} sx={{ mt: 1 }}  >
                {sliders.map((item, index) => (
                    <SilderItem key={index} item={item} setShowDeleteModel={setShowDeleteModel} setShowUpdateModel={setShowUpdateModel  } setUpdateId={setUpdateId} setDeleteId={setDeleteId}/>
                ))}
            </Grid>
}
<UpdateModel showModel={showUpdateModel} setShowModel={setShowUpdateModel}  sliderId={updateId} />
<CreateModel showModel={showCreateModel} setShowModel={setShowCreateModel} />
<DeleteModel 
           showModel={showDeleteModel}
            setShowModel={setShowDeleteModel}
            deleteHandle={deleteHandle}
            data='Slider'
            loading={deleteLoading}
           />


        </Container>
    )
}



function SilderItem({ item, setShowDeleteModel,setShowUpdateModel,setUpdateId,setDeleteId }){
    const [loader, setLoader] = useState(true)

    const deleteButtonClick = () => {
        setShowDeleteModel(true);
        setDeleteId(item._id);
      }
    
    const updateButtonClick = () => {
        setShowUpdateModel(true);
        setUpdateId(item._id);
      }
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Card
                sx={{
                    p: 1.5,
                    boxShadow: (theme) => theme.shadows[6],
                    borderRadius: 2,
                    height: '100%',
                }}
            >
                <Box
                    component={'img'}
                    src={item.image}
                    onLoad={() => setLoader(false)}
                    sx={{
                        width: 1,
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: 1,
                        display: loader ? 'none' : 'block'
                    }} />
                {loader && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                    <CircularProgress />
                </Box>}

                <Typography variant='subtitle1' sx={{ textAlign: 'center', my: 2 }} >{item.title}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}  >
                    <Button onClick={updateButtonClick} variant='contained' sx={{ backgroundImage:(theme)=> theme.palette.gradientColors[1], }} >
                        Edit
                    </Button>
                    <Button onClick={deleteButtonClick} variant='contained' sx={{ p: 1.2,backgroundImage:(theme)=> theme.palette.gradientColors[0], }}>
                        Delete
                    </Button>


                </Box>
            </Card>

        </Grid>
    )
}

