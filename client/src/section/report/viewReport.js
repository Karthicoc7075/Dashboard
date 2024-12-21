import { Box, Button, Card, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect,useState } from 'react'
import { getAllReports,deleteReport,solveReport } from '../../features/report/actions/reportActions';
import { getAllReportsSelector,loadingSelector,deleteReportLoadingSelector,updateLoadingSelector, } from '../../features/report/selectors/reportSelectors';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DeleteModel from '../../components/model/deleteModel'
import SolveModel from '../../components/model/solveModel'



export default function ViewReport() {
  const [showModel, setShowModel] = useState(false);
  const [showSolveModel, setShowSolveModel] = useState(false);

  const [deleteId, setDeleteId] = useState('');
  const [solveId, setSolveId] = useState('');
  const reports = useSelector(getAllReportsSelector);
  const loading = useSelector(loadingSelector);
  const deleteLoading = useSelector(deleteReportLoadingSelector);
  const solveLoading = useSelector(updateLoadingSelector);
  const dispatch = useDispatch();


  useEffect(() => {
    if(reports.length === 0){
      dispatch(getAllReports())
    }
  
}, [])  

useEffect(()=>{
  setShowModel(false);
  setShowSolveModel(false);
}
,[deleteLoading,solveLoading])

const deleteHandle = () => {
  dispatch(deleteReport(deleteId));
  setDeleteId('');
}

const solveHandle = () => {
  dispatch(solveReport(solveId));
  setSolveId('');
}







  return (
    <Container maxWidth="xl" >
      <Typography variant='h4' sx={{ fontWeight: 'bold', my: 2 }}>Reports</Typography>
      <DeleteModel 
           showModel={showModel}
            setShowModel={setShowModel}
            deleteHandle={deleteHandle}
            data='Report'
            loading={deleteLoading}
           />
            <SolveModel
            showModel={showSolveModel}
            setShowModel={setShowSolveModel}
            solveHandle={solveHandle}
            data='Report'
            loading={solveLoading}
            />
      <Card
        sx={{
          boxShadow: (theme) => theme.shadows[4],
          my: 2
        }}
      >
        {
        loading ?
          <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'30vh'}} >
            <CircularProgress />
          </Box>:
          reports.length === 0 ? <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'30vh'}} >
            <Typography variant='h6' >No Reports</Typography>
          </Box> :
          <TableContainer component={Paper} sx={{ p: 2 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead >
              <TableRow >
                <TableCell >Title</TableCell>
                <TableCell align='center'>postId</TableCell>
                <TableCell align='center'>Description</TableCell>
                <TableCell align='center'>Date</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((item, index) => (
                <ReportItem key={index} item={item} setDeleteId={setDeleteId} setSolveId={setSolveId} setShowModel={setShowModel} setShowSolveModel={setShowSolveModel} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        }
      </Card>
    </Container>
  )
}



function ReportItem({ item,setDeleteId,setSolveId,setShowModel,setShowSolveModel }) {

  const deleteHandle = () => {
    setDeleteId(item._id);
    setShowModel(true);
  }

  const solveHandle = () => {
    setSolveId(item._id);
   setShowSolveModel(true);
  }
  return (
    <TableRow key={item.title}>
      <TableCell component="th" scope="row">
        {item.postId?.title}
      </TableCell> 
      <TableCell align='center'>{item.postId?._id}</TableCell>
      <TableCell align='center'>{item.description}</TableCell>
      <TableCell align='center'>{moment(item.createdAt).format('LL')}</TableCell>
      <TableCell align='center'>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }} >
          <Button variant='contained' sx={{backgroundImage:(theme)=> theme.palette.gradientColors[2],}} onClick={()=>solveHandle()} >Solve</Button>
          <Button variant='contained' sx={{backgroundImage:(theme)=> theme.palette.gradientColors[0],}} onClick={()=>deleteHandle()}  >Delete</Button>
        </Box>
      </TableCell>
    </TableRow>
  );
}

