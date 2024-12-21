import React, { useEffect, useState } from 'react'
import { Box, Card, Container, Typography, FormControl, TextField, InputLabel, Input, Button, Icon, IconButton, alpha, OutlinedInput, InputBase, CircularProgress, Modal} from '@mui/material'
import { DropzoneArea } from '@mui/x-data-grid';
import uploadFileImage from '../../assets/icons/upload-.png'
import { Close } from '@mui/icons-material';
import { useSelector,useDispatch } from 'react-redux';
import {addToast} from '../../features/toast/actions/toastAction'
import { updateClass,getClass } from '../../features/class/actions/classActions'
import { loadingSelector,getClassSelector,updateLoadingSelector, getLoadingSelector } from '../../features/class/selectors/classSelector'
import { useParams } from 'react-router-dom';

export default function UpdateClass({showModel,setShowModel,classId}) {
    const [className,setClassName] = useState('')
    const [selectedImage, setSelectedImage] = React.useState(null)
    const [image, setImage] = useState(null)
    const dispatch = useDispatch()
    const loading = useSelector(getLoadingSelector)
    const updateLoading = useSelector(updateLoadingSelector)
    const classData = useSelector(getClassSelector)

    useEffect(()=>{
      if(classId){
        dispatch(getClass(classId))
      }
    },[showModel,classId])


    useEffect(()=>{
        if(classData){
            setClassName(classData.className)
            setSelectedImage(classData.image)
        }

       
    },[classData,showModel])


    useEffect(()=>{
        if(!updateLoading){
            setShowModel(false)
        }
    },[updateLoading])

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        

        if (file) {
            setImage(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };





const submitHandle = () =>{
    if(!className || !selectedImage){
        dispatch(addToast('Please fill all fields','error'))
        return
    }
    let formData = new FormData()
  
    formData.append('className',className)
    formData.append('file',image)
    formData.append('imageId',classData?.image)

    dispatch(updateClass(classId,formData))
    
}


    return (
        <Modal open={showModel}    onClose={()=>setShowModel(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}  >
            
            <Box sx={{ position:'relative', width: {xs:'90vw',sm:'95vw',md:'100%'}, maxWidth: '860px' }}>

            <Card sx={{ py: 2, px: 3 ,maxHeight:'80dvh',overflowY:'scroll' }}>
                <Typography variant='h4' sx={{ mt: 2, textAlign: 'center', fontWeight: 'fontWeightBold',mt: 3  }} >
                Update Class
            </Typography>
                <IconButton onClick={() => setShowModel(false)}  sx={{position:'absolute',top:'15px',right:'15px',color:'text.primary'}} >
                <Close />
            </IconButton>
                    {loading ? <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'580px'}} >
                        <CircularProgress />
                    </Box>:
                    <FormControl  fullWidth  >
                        <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mb: 1 }}>ClassName</Typography>
                        <OutlinedInput
                            value={className}
                            onChange={(e)=>setClassName(e.target.value)}
                            placeholder="Ex: Class 12"
                        />
                        <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mt: 3, mb: 1 }}>Image</Typography>
                       
                        <Box
                            sx={{
                                position: 'relative',
                                p: '5px',
                                height: '100%',
                                bgcolor: theme => theme.palette.grey[200],
                                border:'2px dashed #DFE3E8',
                                overflow: 'hidden',
                                borderRadius: 1
                            }}
                        >
                           

                            {!selectedImage  &&
                                <Box
                                    sx={{
                                        p: 4,
                                    }}
                                >
                                    <input
                                        id="upload-file"
                                        type="file"
                                        onChange={handleImageChange}
                                        accept='image/*'
                                        style={{
                                            position: 'absolute',
                                            top:100,
                                            zIndex: 100,
                                            transform: 'scale(24)',
                                            opacity: 0,
                                            border: '1px solid red',

                                        }}
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Box component='img' src={uploadFileImage} sx={{ width: {xs:'200px',sm:'320px'} }} />
                                        <Typography variant="subtitle1" mt={1}>
                                            Drop or Select File
                                        </Typography>
                                        <Typography variant="p" color={'text.disabled'} >
                                            Drop files here or click browase through your machine
                                        </Typography>
                                    </Box>
                                </Box>
                            }






                            {selectedImage && (
                                <Box position={'relative'} sx={{ lineHeight: 0 }}  >
                                    <Box
                                        component="img"
                                        src={selectedImage}
                                        sx={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: 1.2, }}
                                    />
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            right: 16,
                                            width: 24,
                                            height: 24,
                                            p: 2,
                                            color: (theme) => theme.palette.grey[0],
                                            backgroundColor: (theme) => alpha(theme.palette.grey[600], .5),
                                            boxShadow:(theme)=>theme.shadows[8],
                                            backdropFilter: `blur(${6}px)`,
                                            WebkitBackdropFilter: `blur(${6}px)`,
                                            '&:hover': {
                                                background: theme => alpha(theme.palette.grey[700], .6)
                                            }
                                        }}
                                        onClick={() => setSelectedImage(null)}
                                    >
                                        <Close/>
                                    </IconButton>

                                </Box>
                            )}
                        </Box>

                        <Box textAlign={'center'}>
                            {
                                updateLoading ? <CircularProgress sx={{m:2}} /> :
                                    <Button
                                        variant='contained'
                                        sx={{ mt: 3, px: 5, backgroundImage:(theme)=> theme.palette.gradientColors[4], }}
                                        onClick={submitHandle}
                                    >
                                        Update
                                    </Button>
                            }
                       </Box>
                    </FormControl>
}
                </Card>
            </Box>
        </Modal>
    )
}

