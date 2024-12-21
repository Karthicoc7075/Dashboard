import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Card, CardMedia, Button, Box, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import userImage from '../../assets/icons/user.png'
import adminImage from '../../assets/icons/admin.png'
import { useSelector,useDispatch } from 'react-redux'
import {getUsersSelector, loadingSelector,deleteLoadingSelector } from '../../features/user/selectors/userSelectors'
import { getUsers ,deleteUser} from '../../features/user/actions/userActions'
import DeleteModel from '../../components/model/deleteModel'
import UpdateModel from './updateUser'
import CreateModel from './createUser'

export default function ViewUser() {
    const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [deleteId, setDeleteId] = useState(null)
  const [updateId, setUpdateId] = useState(null)
    const users = useSelector(getUsersSelector)
    const loading = useSelector(loadingSelector)
    const deleteLoading = useSelector(deleteLoadingSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        if(users.length === 0){
            dispatch(getUsers())
        }
    }, [users])

    useEffect(() => {

        if(!deleteLoading){
            setShowDeleteModel(false)
            setDeleteId(null)
        }
    }
    ,[deleteLoading])

    const deleteHandle = () => {
        dispatch(deleteUser(deleteId))
    }

    const createHandle = () => {
        setShowCreateModel(true)
    }
    

  return (
    <Container maxWidth="xl"   >           
            <Box sx={{ display: 'flex', my: 2 }}>
                <Typography variant='h5' sx={{ flexGrow: 1 }} >Users</Typography>

                <Button  variant='contained' sx={{ p: 1.2, backgroundImage:(theme)=> theme.palette.gradientColors[1], }} onClick={createHandle}  >ADD USER</Button>
            </Box>
            {
            loading ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }} >
                <CircularProgress />
            </Box>
            :
          <Box>
            {
                users.length > 0 ?
                <Grid container spacing={2} >
                    {
                        users.map((item, index) => (
                            <UserItem key={index} item={item} setShowDeleteModel={setShowDeleteModel} setShowUpdateModel={setShowUpdateModel} setUpdateId={setUpdateId}  setDeleteId={setDeleteId} />
                        ))
                    }
                </Grid>
                :
                <Card sx={{ display:'flex',justifyContent:'center',alignItems:'center',height:'60vh' }}>
                  <Typography variant="h6" sx={{ textAlign: 'center' }} >No user found</Typography>
                </Card>
            }
          </Box>
}


<UpdateModel showModel={showUpdateModel} setShowModel={setShowUpdateModel}  userId={updateId} />
<CreateModel showModel={showCreateModel} setShowModel={setShowCreateModel} />
<DeleteModel
        showModel={showDeleteModel}
        setShowModel={setShowDeleteModel}
        deleteHandle={deleteHandle}
        data='User'
        loading={deleteLoading}
      />
        </Container>
           
  )
}


function UserItem({item,setShowDeleteModel,setShowUpdateModel,setUpdateId,setDeleteId}) {

    const deleteModelHandler = () => {
        setShowDeleteModel(true)
        setDeleteId(item._id)
    }

    const updateModelHandler = () => {
        setShowUpdateModel(true)
        setUpdateId(item._id);
    }
    return(
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Card
                sx={{
                    p: 1.5,
                    boxShadow: (theme) => theme.shadows[6],
                    borderRadius: 2,
                    height: "100%",
                }}
            >
                 <Box sx={{ my:1,py:.4,px:1.2,background:(theme)=> item.role =='admin' ? theme.palette.gradientColors[0]:theme.palette.gradientColors[4]  ,color:'#fff',fontSize:'12px' ,fontWeight:'bold',borderRadius:1.4,width:'fit-content' }} >
            {item.role}
        </Box>
               <Box
               sx={{
                     display:'flex',
                     justifyContent:'center',
                     alignItems:'center',
                     width:'100%',
               }}
               >
               <Box
                    component={'img'}
                    src={item.role == 'admin' ? adminImage : userImage}
                    sx={{
                        width: 1,
                        height: '150px',
                        width:'150px',
                        objectFit: 'cover',
                        borderRadius: 1,
                        display: 'block'
                    }} />
               </Box>
               

                <Typography variant='subtitle1' sx={{ textAlign: 'center', my: 2 }} >{item.username}</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}  >
                    <Button onClick={()=>updateModelHandler()} variant='contained' sx={{ backgroundImage:(theme)=> theme.palette.gradientColors[1], }} >
                        Edit
                    </Button>
                    <Button  onClick={()=>deleteModelHandler()} variant='contained' sx={{ p: 1.2, backgroundImage:(theme)=> theme.palette.gradientColors[0], }} >
                        Delete
                    </Button>


                </Box>
            </Card>

        </Grid>
    )
}

