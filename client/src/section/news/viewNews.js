import React, { useState,useEffect } from 'react'
import { Container, Grid, Typography, Card, Button, Box, CircularProgress, FormControlLabel, Switch } from '@mui/material'
import { Link } from 'react-router-dom'
import Model from '../../components/model/model'
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer } from '@mui/material'
import { useDispatch,useSelector } from 'react-redux'
import { getAllNews,deleteNews,updateNewsStatus } from '../../features/news/actions/newsActions'
import { getAllNewsSelector,deleteLoadingSelector,loadingSelector } from '../../features/news/selectors/newsSelectors'
import { showToast } from '../../features/toast/actions/toastAction'
import DeleteModel from '../../components/model/deleteModel'
export default function ViewNews() {
  const [showModel, setShowModel] = useState(false)
  const newsData = useSelector(getAllNewsSelector)
  const [deleteId, setDeleteId] = useState('')
  const [materialId, setMaterialId] = useState(null)
  const loading = useSelector(loadingSelector)
  const deleteLoading = useSelector(deleteLoadingSelector)
  const dispatch = useDispatch()


  useEffect(()=>{
if(newsData.length === 0){
  dispatch(getAllNews())
}
  },[])


  useEffect(() => {
    if(materialId){
      dispatch(updateNewsStatus(materialId))
      setMaterialId(null)
    }
  }, [materialId])


useEffect(()=>{
setShowModel(false)
},[deleteLoading])


const deleteHandle = () =>{
dispatch(deleteNews(deleteId))
setDeleteId('')
}


  return (
    <Container maxWidth="xl"   >
      <DeleteModel 
           showModel={showModel}
            setShowModel={setShowModel}
            deleteHandle={deleteHandle}
            data='News'
            loading={deleteLoading}
           />
      <Box sx={{ display: 'flex', my: 2 }}>
        <Typography variant='h5' sx={{ flexGrow: 1 }} >News</Typography>
        <Button component={Link} to='/news/create' variant='contained' sx={{ p: 1.2,  backgroundImage:(theme)=> theme.palette.gradientColors[1],}}   >ADD NEWS</Button>
      </Box>
      <Card>
      {
            loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }} >
                <CircularProgress />
            </Box> :
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
              {newsData.map((item, index) => (
                <NewsItem key={index} item={item} setShowModel={setShowModel} setDeleteId={setDeleteId} setMaterialId={setMaterialId} />
              ))}

            </TableBody>
          </Table>
        </TableContainer>
}
      </Card>
    </Container>
  )
}






function NewsItem({ item, setShowModel,setDeleteId,setMaterialId }) {
  const [loader, setLoader] = useState(true)


  const deleteButtonClick =()=>{
    setDeleteId(item._id)
    setShowModel(true)
  }


  const changeHandler = () => {
    setMaterialId(item._id)
  }
  return (
    <TableRow>
      <TableCell component="th" scope="row" sx={{ pl: 4 }} >
        <Box component={'img'} src={item.image} sx={{ width: 140, height: 90, borderRadius: 1, objectFit: 'cover' }} />
      </TableCell>
      <TableCell align="center" sx={{ paddingInline: '7rem' }}>{item.title}</TableCell>
      <TableCell align="center" sx={{ paddingInline: '7rem' }}>{item.views}</TableCell>
      <TableCell align="center" sx={{ paddingInline: '7rem' }}>
        <Switch   defaultChecked={item.status} onChange={()=>changeHandler()} />
      </TableCell>
      <TableCell align="right" sx={{ pr: 2 }}  >
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }} >

          <Button component={Link} to={`/news/update/${item._id}`} variant='contained' sx={{  backgroundImage:(theme)=> theme.palette.gradientColors[1], p: 1.2 }}  >Edit</Button>
          <Button variant='contained' sx={{  backgroundImage:(theme)=> theme.palette.gradientColors[0], p: 1.2 }} onClick={() =>deleteButtonClick()} >Delete</Button>
        </Box>

      </TableCell>

    </TableRow>
  )
}
