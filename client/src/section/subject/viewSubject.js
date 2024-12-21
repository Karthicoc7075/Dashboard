import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Card, CardMedia, Button, Box, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import DeleteModel from '../../components/model/deleteModel'
import { useSelector,useDispatch } from 'react-redux'
import {getSubjectsSelector,loadingSelector,deleteLoadingSelector} from '../../features/subject/selectors/subjectSelectors'
import {getAllSubjects,deleteSubject} from '../../features/subject/actions/subjectActions'
import UpdateModel from './updateSubject'
import CreateModel from './createSubject'

export default  function ViewSubject() {
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [showUpdateModel, setShowUpdateModel] = useState(false);
    const [showCreateModel, setShowCreateModel] = useState(false);
    const [deleteId, setDeleteId] = useState(null)
    const [updateId, setUpdateId] = useState(null)
    const subjects = useSelector(getSubjectsSelector)
    const loading = useSelector(loadingSelector)
    const deleteLoading = useSelector(deleteLoadingSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        if(subjects.length === 0){
             dispatch(getAllSubjects())
        }
        setShowDeleteModel(false)
        setDeleteId(null)

    }, [subjects])

    const deleteHandle = () => {
        dispatch(deleteSubject(deleteId))
    }

    const createHandle = () => {
        setShowCreateModel(true)
    }
    

    return (
        <Container maxWidth="xl"   >
               
           
            <Box sx={{ display: 'flex', my: 2 }}>
                <Typography variant='h5' sx={{ flexGrow: 1 }} >Subjects</Typography>

                <Button  variant='contained' sx={{ p: 1.2, backgroundImage:(theme)=> theme.palette.gradientColors[1], }}  onClick={()=>createHandle()}   >ADD SUBJECT</Button>
            </Box>
            {
            loading ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }} >
                <CircularProgress />
            </Box>
            :
          <Box>
            {
                subjects.length > 0 ?
                <Grid container spacing={2} >
                    {
                        subjects.map((item, index) => (
                            <SubjectItem key={index} item={item} setShowModel={setShowDeleteModel} setDeleteId={setDeleteId} setShowUpdateModel={setShowUpdateModel} setUpdateId={setUpdateId} />
                        ))
                    }
                </Grid>         
                :
                <Card sx={{ display:'flex',justifyContent:'center',alignItems:'center',height:'60vh' }}>
                  <Typography variant="h6" sx={{ textAlign: 'center' }} >No subject found</Typography>
                </Card>
            }
          </Box>
}
<DeleteModel 
           showModel={showDeleteModel}
            setShowModel={setShowDeleteModel}
            deleteHandle={deleteHandle}
            data='Subject'
            desc="Deleting this subject will delete all  class subjects and materials associated with this subject.Are you sure you want to delete this subject?"
            loading={deleteLoading}
           />

              <UpdateModel showModel={showUpdateModel} setShowModel={setShowUpdateModel}  subjectId={updateId}/>
                <CreateModel showModel={showCreateModel} setShowModel={setShowCreateModel} />
      
        </Container>
           
    )
}



function SubjectItem({ item, setShowModel,setDeleteId,setShowUpdateModel,setUpdateId }) {
    const [loader, setLoader] = useState(true)


    const deleteButtonClick = (id) => {
        setShowModel(true)
        setDeleteId(id)
        console.log(id);
    }

    const updateButtonClick = (id) => {
        setUpdateId(id)
        setShowUpdateModel(true)
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Card
                sx={{
                    p: 1.5,
                    boxShadow: (theme) => theme.shadows[6],
                    borderRadius: 2,
                    height: "100%",
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

                <Typography variant='subtitle1' sx={{ textAlign: 'center', my: 2 }} >{item.subjectName}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}  >
                    <Button variant='contained' sx={{backgroundImage:(theme)=> theme.palette.gradientColors[1],}} onClick={()=>updateButtonClick(item._id)} >
                        Edit
                    </Button>
                    <Button  variant='contained' sx={{ p: 1.2,backgroundImage:(theme)=> theme.palette.gradientColors[0],}} onClick={() => deleteButtonClick(item._id)}>
                        Delete
                    </Button>


                </Box>
            </Card>

        </Grid>
    )
}

