import { Card, Container, FormControl, FormLabel, TextField,Select,MenuItem, InputLabel, Button, Box, Typography, CircularProgress, Modal, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { createClassSubject, getClass } from '../../features/class/actions/classActions'  
import { getClassSelector } from '../../features/class/selectors/classSelector'
import { getAllSubjects } from '../../features/subject/actions/subjectActions'
import { getSubjectsSelector,loadingSelector } from '../../features/subject/selectors/subjectSelectors'
import { createLoadingSelector } from '../../features/class/selectors/classSelector'
import { useParams } from 'react-router-dom'
import { Close } from '@mui/icons-material'
import { create } from '@mui/material/styles/createTransitions'

export default function CreateClassSubject({showModel,setShowModel,classId}) {
    const [Class, setClass] = React.useState('')
    const [subject,setSubject] = React.useState('')
    const findClass = useSelector(getClassSelector)
    const subjects = useSelector(getSubjectsSelector)
    const loading = useSelector(loadingSelector)
    const createLoading = useSelector(createLoadingSelector)
    const dispatch = useDispatch()


    useEffect(() => {
        if(findClass){
            setClass(findClass.className)
        }
        
        if(!findClass){
            dispatch(getClass(classId))
        }
    }, [findClass])



    useEffect(() => {

        if(!createLoading){
            setShowModel(false)
        }

        if(subjects.length == 0){
            dispatch(getAllSubjects())
        }


        
    }, [subjects,createLoading])

    

    const handleSubmit = () => {
        if(!subject){
            return alert('Please select Subject')
        }
   
       
        dispatch(createClassSubject(findClass._id,subject))
        setSubject('')
    }


    return (
        <Modal open={showModel}    onClose={()=>setShowModel(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}  >
            
            <Box sx={{ position:'relative', width: {xs:'90vw',sm:'95vw',md:'100%'}, maxWidth: '860px' }}>

            <Card sx={{ py: 2, px: 3 ,maxHeight:'80dvh',overflowY:'scroll' }}>
            <Typography variant='h4' sx={{ my: 3, textAlign: 'center', fontWeight: 'fontWeightBold' }} >
                Create Class Subject
            </Typography>
            <IconButton onClick={() => setShowModel(false)}  sx={{position:'absolute',top:'15px',right:'15px',color:'text.primary'}} >
            <Close />
          </IconButton>
              {
                loading  ?
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }} >
                    <CircularProgress />
                </Box>
                :
                <Box>
                      <FormControl fullWidth >
                    <FormLabel sx={{mb:2}} >ClassName</FormLabel>
                    <TextField value={Class} disabled />

                    <FormControl fullWidth sx={{mt:4}} >
                <FormLabel sx={{mb:2}} >SubjectName</FormLabel>
                <Select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    fullWidth
                    >
                    {
                        subjects.map((item,index) => (
                            <MenuItem key={index} value={item._id} >{item.subjectName}</MenuItem>
                        ))
                    }
                </Select>
                </FormControl>
                </FormControl>
              
                <Box sx={{mt:3,textAlign:'center'}}>
                       { createLoading ?
                    <CircularProgress />
                    :
                    <Button  variant='contained'  sx={{
                     
                        backgroundImage:(theme)=> theme.palette.gradientColors[4],
                        width:'120px',
                        ':hover':{
                            
                            opacity:.8
                        }
                    
                    }}
                    onClick={handleSubmit}
                    >Sumbit</Button>
                    }
                    </Box>
                </Box>
              }
            </Card>
            </Box>
           
        </Modal>
    )
}
