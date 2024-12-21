import { Box, Button, Card, CircularProgress, Container, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVersions, deleteVersion } from '../../features/version/actions/versionActions';
import { loadingSelector,deleteLoadingSelector,getAllVersionSelector } from '../../features/version/selectors/versionSelectors';
import DeleteModel from '../../components/model/deleteModel';   
import UpdateModel from './updateVersion';
import CreateModel from './createVersion';



export default function ViewVersion() {
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [deleteId, setDeleteId] = useState(null)
  const [updateId, setUpdateId] = useState(null)
  const dispatch = useDispatch();
  const versions = useSelector(getAllVersionSelector);
  const loading = useSelector(loadingSelector);
  const deleteLoading = useSelector(deleteLoadingSelector);

  useEffect(() => {
   if(versions.length === 0){
    dispatch(getAllVersions());
   }
  }, []);


useEffect(() => {
    setShowDeleteModel(false);
  }, [deleteLoading]);

  const deleteHandle = () => {
    if(deleteId){
      dispatch(deleteVersion(deleteId));
    }
  };


  const createHandle = () => {
    setShowCreateModel(true );
  }



    
    
  return (
    <Container  maxWidth='xl'>  

     
       <Box sx={{display:'flex',my:2}}>
        <Typography variant='h5' sx={{ flexGrow: 1 }} >Versions</Typography>
        <Button variant='contained' sx={{ backgroundImage:(theme)=> theme.palette.gradientColors[1], p: 1.2 }} onClick={createHandle} >Add Version</Button>

        </Box>

      <Card sx={{ boxShadow: (theme) => theme.shadows[4], my: 2 }}>
       {
        loading ?

        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center', height:'50dvh' }}>
          <CircularProgress/>
        </Box>:
        <Box>
          {
            versions.length > 0 ?
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align='center'>Code</TableCell>
                    <TableCell align='center'>Description</TableCell>
                    <TableCell align='center'>Status</TableCell>
                    <TableCell align='center'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {versions.map((item) => (
                    <VersionItem key={item._id} item={item} setShowDeleteModel={setShowDeleteModel} setShowUpdateModel={setShowUpdateModel} setUpdateId={setUpdateId} setDeleteId={setDeleteId} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer> :
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'50dvh' }}>
              <Typography variant='h6' >No Versions Found</Typography>
            </Box>
          }
          </Box>
       }
        </Card>
        <UpdateModel showModel={showUpdateModel} setShowModel={setShowUpdateModel}  versionId={updateId} />
        <CreateModel showModel={showCreateModel} setShowModel={setShowCreateModel} />
        <DeleteModel
        showModel={showDeleteModel}
        setShowModel={setShowDeleteModel}
        deleteHandle={deleteHandle}
        data='Version'
        loading={deleteLoading}
      />
    </Container>
  )
}

function VersionItem({ item,setShowDeleteModel,setShowUpdateModel,setUpdateId,setDeleteId }) {
  
  const deleteButtonClick = (id) => {
    setShowDeleteModel(true);
    setDeleteId(id);
  }

  const updateButtonClick = (id) => { 
    setUpdateId(id);
    setShowUpdateModel(true);
  }
  return (
    <TableRow key={item.title}>
      <TableCell >
        {item.title}
      </TableCell>
      <TableCell align='center'>{item.code}</TableCell>
      <TableCell align='center'>{item.description}</TableCell>
      <TableCell align='center' sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Box sx={{ my:1,py:.4,px:1.2,background:(theme)=> item.status ? theme.palette.gradientColors[2]:theme.palette.gradientColors[0],color:'#fff',fontSize:'12px' ,fontWeight:'bold',borderRadius:1.4,width:'fit-content' }} >
            {item.status ? 'Active' : 'Inactive'}
        </Box>
      </TableCell>
      <TableCell align='center'>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }} >
          <Button  variant='contained' sx={{ backgroundImage:(theme)=> theme.palette.gradientColors[1], p: 1.2 }} onClick={()=>updateButtonClick(item._id)} >Edit</Button>
          <Button variant='contained' sx={{ backgroundImage:(theme)=> theme.palette.gradientColors[0], p: 1.2 }} onClick={()=>deleteButtonClick(item._id)}  >Delete</Button>
        </Box>
      </TableCell>
    </TableRow>
  );
}