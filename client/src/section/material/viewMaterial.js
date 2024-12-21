import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Card, Button, Box, CircularProgress, FormControlLabel, Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Switch, TablePagination, Dialog } from '@mui/material'
import { Link } from 'react-router-dom'
import DeleteModel from '../../components/model/deleteModel'
import { useDispatch,useSelector } from 'react-redux'
import { getAllMaterialsSelector,loadingSelector, totalMaterialCountSelector,deleteLoadingSelector } from '../../features/material/selectors/materialSelectors'
import {getAllMaterials,updateMaterialStatus,deleteMaterial} from '../../features/material/actions/materialActions'




export default function ViewMaterial() {
  const [showModel, setShowModel] = useState(false)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [materialId, setMaterialId] = useState(null)
  const [deleteId,setDeleteId] = useState(null)
  const materials = useSelector(getAllMaterialsSelector)
  const totalMaterials = useSelector(totalMaterialCountSelector)
  const loading = useSelector(loadingSelector)
  const deleteLoading = useSelector(deleteLoadingSelector)
  const dispatch = useDispatch()

  useEffect(()=>{
  
      dispatch(getAllMaterials(page+1,rowsPerPage))
  


  },[page,rowsPerPage,deleteLoading])
  
  
  useEffect(() => {
    if(materialId){
     dispatch(updateMaterialStatus(materialId))
     setMaterialId(null)
    }
  }, [materialId])


  useEffect(() => {
    if(!deleteLoading){
      setShowModel(false)
    }
  }, [deleteLoading])
  

  const handleChangePage = (e, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const deleteHandle = () => {
    dispatch(deleteMaterial(deleteId))
  }






  return (
    <Container maxWidth="xl" >
       <DeleteModel 
           showModel={showModel}
            setShowModel={setShowModel}
            deleteHandle={deleteHandle}
            data='Material'
            loading={deleteLoading}
           />
      <Box sx={{ display: 'flex', my: 2 }}>
        <Typography variant='h5' sx={{ flexGrow: 1 }} >Materials</Typography>
        <Button component={Link} to='/material/create' variant='contained' sx={{ p: 1.2,  backgroundImage:(theme)=> theme.palette.gradientColors[1], }}   >ADD MATERIAL</Button>
      </Box>
      <Card>
     {
      loading ? 
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress />
      </Box>:
      <Box>
          {
        totalMaterials ==0 ?
        <Box  sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'40vh'}}>
          <Typography variant='h6' sx={{ p: 2 }} >No Material item not found </Typography>
        </Box>:
         <TableContainer component={Paper} style={{ overflowX: 'auto' }}>

         <Table aria-label="simple table">
           <TableHead >
             <TableRow >
               <TableCell sx={{ pl: 10, fontWeight: 'fontWeightSemiBold' }}>Image</TableCell>
               <TableCell align="center" sx={{ fontWeight: 'fontWeightSemiBold' }}>Title</TableCell>
               <TableCell align="center" sx={{ fontWeight: 'fontWeightSemiBold' }}>Views</TableCell>
               <TableCell align="center" sx={{ fontWeight: 'fontWeightSemiBold', }}>Status</TableCell>
               <TableCell align="right" sx={{ pr: 10, fontWeight: 'fontWeightSemiBold' }}>Option</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {
               materials.map((item,index) => {
                 return <MaterialItem key={index} item={item} setShowModel={setShowModel} setMaterialId={setMaterialId}  setDeleteId={setDeleteId} />

               })
             }
           </TableBody>
         </Table>
         <TablePagination
          rowsPerPageOptions={[5,10, 20]}
       component="div"
       count={totalMaterials}
       rowsPerPage={rowsPerPage}
       page={page}
       onPageChange={handleChangePage}
       onRowsPerPageChange={handleChangeRowsPerPage}
     />
       </TableContainer>
       }
      </Box>
     }
      </Card>
    </Container>
  )
}

function MaterialItem({ item, setShowModel,setMaterialId,setDeleteId }){

  const changeHandler = (e) => {
    setMaterialId(item._id)
  }
  
  const deleteHandleButton = () => {  
    setDeleteId(item._id)
    setShowModel(true)
  }

  return (
    <TableRow>
      <TableCell component="th" scope="row" sx={{ pl: 4 }}>
        <Box component={'img'} src={item.image} sx={{ width: 140, height: 90, borderRadius: 1, objectFit: 'cover' }} />
      </TableCell>
      <TableCell align="center" sx={{ paddingInline: '7rem' }}>{item.title}</TableCell>
      <TableCell align="center" sx={{ paddingInline: '7rem' }}>{item.views}</TableCell>
      <TableCell align="center" sx={{ paddingInline: '7rem' }}>
        <Switch checked={item.status} onChange={(e)=>changeHandler(e)}  />
      </TableCell>
      <TableCell align="right"  sx={{ pr: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Button component={Link} to={`/material/update/${item._id}`} variant='contained' sx={{  backgroundImage:(theme)=> theme.palette.gradientColors[1], p: 1.2 }}>Edit</Button>
          <Button variant='contained' sx={{  backgroundImage:(theme)=> theme.palette.gradientColors[0], p: 1.2 }} onClick={deleteHandleButton} >Delete</Button>
        </Box>
      </TableCell>
    </TableRow>
  )
}

