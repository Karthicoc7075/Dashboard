import React, { useState,useEffect } from 'react'
import { Box, Card, Container, Typography, FormControl,Button,IconButton, alpha, OutlinedInput, CircularProgress,Modal } from '@mui/material'
import uploadFileImage from '../../assets/icons/upload-.png'
import { Close } from '@mui/icons-material';
import { useSelector,useDispatch } from 'react-redux';
import {addToast} from '../../features/toast/actions/toastAction'
import { updateLanguage,getLanguage } from '../../features/language/actions/languageActions'
import { getLoadingSelector,getLanguageSelector,updateLoadingSelector } from '../../features/language/selectors/languageSelectors'
import { useParams } from 'react-router-dom';

export default  function UpdateCategory({showModel,setShowModel,languageId}) {
    const [languageName,setLanguageName] = useState('')
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [image, setImage] = useState(null)
    const dispatch = useDispatch()
    const loading = useSelector(getLoadingSelector)
    const updateLoading = useSelector(updateLoadingSelector)
    const languageData = useSelector(getLanguageSelector)
   

    useEffect(()=>{
       if(languageId){
           dispatch(getLanguage(languageId))
         }
    },[languageId,showModel])


    useEffect(()=>{
        if(languageData){
            setLanguageName(languageData.languageName)
            setSelectedImage(languageData.image)
            
        }
    },[languageData])

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
    
    let formData = new FormData()
  
    formData.append('languageName',languageName)
    formData.append('file',image)
    formData.append('imageId',languageData.image)

    dispatch(updateLanguage(languageId,formData))
}


    return (
        <Modal open={showModel}    onClose={()=>setShowModel(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}  >
        <Box sx={{ position:'relative', width: {xs:'90vw',sm:'95vw',md:'100%'}, maxWidth: '860px' }}>
        <Card sx={{ py: 2, px: 3 ,maxHeight:'80dvh',overflowY:'scroll' }}>
            <Typography variant='h4' sx={{ mt: 2, textAlign: 'center', fontWeight: 'fontWeightBold' }} >
                Update Language
            </Typography>
            <IconButton onClick={() => setShowModel(false)}  sx={{position:'absolute',top:'15px',right:'15px',color:'text.primary'}} >
            <Close />
          </IconButton>
                {loading ? <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'580px'}} >
                        <CircularProgress />
                    </Box>:
                    <FormControl  fullWidth  >
                        <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mb: 1 }}>Language Name</Typography>
                        <OutlinedInput
                            value={languageName}
                            onChange={(e)=>setLanguageName(e.target.value)}
                            placeholder="Ex: Tamil"
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
                            {!selectedImage &&
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
                                            color: (theme) => theme.palette.text.primary,
                                            backgroundColor: (theme) => alpha(theme.palette.grey[400], .5),
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
                                updateLoading ? <CircularProgress sx={{m:2}} /> : <Button onClick={()=>submitHandle()} variant='contained'  sx={{
                            mt:2,
                            backgroundImage:(theme)=> theme.palette.gradientColors[4],
                            width:'120px',
                            ':hover':{
                         
                                opacity:.8
                            }
                        }} >Update</Button> }
                       </Box>
                    </FormControl>
}
                </Card>
            </Box>
        </Modal>
    )
}

