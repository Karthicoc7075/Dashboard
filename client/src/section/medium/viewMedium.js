import React, { useState,useEffect } from 'react'
import { Container, Grid, Typography, Card, CardMedia, Button, Box, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import Model from '../../components/model/model'
import { useDispatch,useSelector } from 'react-redux'
import { getAllMediumsSelector,loadingSelector,deleteLoadingSelector } from '../../features/medium/selectors/mediumSelectors'
import {getAllMediums,deleteMedium} from '../../features/medium/actions/mediumActions'
import DeleteModel from '../../components/model/deleteModel'
import CreateModel from './createMedium'
import UpdateModel from './updateMedium'


export default function ViewMedium() {
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [showUpdateModel, setShowUpdateModel] = useState(false);
    const [showCreateModel, setShowCreateModel] = useState(false);
    const [deleteId, setDeleteId] = useState(null)
    const [updateId, setUpdateId] = useState(null)

    const mediums = useSelector(getAllMediumsSelector)
    const loading = useSelector(loadingSelector)
    const deleteLoading = useSelector(deleteLoadingSelector)
    const dispatch = useDispatch()



    useEffect(()=>{
        if(mediums.length === 0){
            dispatch(getAllMediums())
        }
        setShowDeleteModel(false)
    },[mediums])



    const deleteHandle = () =>{
        dispatch(deleteMedium(deleteId))
        setDeleteId(null)
    }

    const createHandle = () =>{
        setShowCreateModel(true)
    }

    return (
        <Container maxWidth="xl"   >
            <Box sx={{ display: 'flex', my: 2 }}>
                <Typography variant='h5' sx={{ flexGrow: 1 }} >Mediums</Typography>
                <Button variant='contained' sx={{ p: 1.2,  backgroundImage:(theme)=> theme.palette.gradientColors[1], }}  onClick={()=>createHandle()}  >ADD MEDIUM</Button>
            </Box>
        {
            loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }} >
                <CircularProgress />
            </Box> :
            <Grid container spacing={2} >
                {mediums.map(item => <MediumItem key={item._id} item={item} setShowDeleteModel={setShowDeleteModel} setShowUpdateModel={setShowUpdateModel}  setUpdateId={setUpdateId} setDeleteId={setDeleteId} />)}
            </Grid>
        }
         <DeleteModel 
           showModel={showDeleteModel}
            setShowModel={setShowDeleteModel}
            deleteHandle={deleteHandle}
            data='Medium'
            desc="Deleting this media will delete all materials associated with this medium.Are you sure you want to delete this medium?"
            loading={deleteLoading}
           />
        
        <UpdateModel showModel={showUpdateModel} setShowModel={setShowUpdateModel}  mediumId={updateId} />
                <CreateModel showModel={showCreateModel} setShowModel={setShowCreateModel} />
      
        </Container>
    )
}



function MediumItem({ item, setShowDeleteModel,setShowUpdateModel,setUpdateId,setDeleteId }){
    const [loader, setLoader] = useState(true)

    const deleteButtonClick=()=>{
        setDeleteId(item._id)
        setShowDeleteModel(true)
    }

    const updateButtonClick=()=>{
        setUpdateId(item._id)
        setShowUpdateModel(true)
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

                <Typography variant='subtitle1' sx={{ textAlign: 'center', my: 2 }} >{item.mediumName}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}  >
                    <Button  variant='contained' sx={{ backgroundImage:(theme)=> theme.palette.gradientColors[1],}} onClick={()=>updateButtonClick(item._id)} >
                        Edit
                    </Button>
                    <Button variant='contained' sx={{ p: 1.2,  backgroundImage:(theme)=> theme.palette.gradientColors[0], }} onClick={() => deleteButtonClick(  )}>
                        Delete
                    </Button>


                </Box>
            </Card>

        </Grid>
    )
}

