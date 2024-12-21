import { Box, Button, Card, CircularProgress, Container, FormControl, FormLabel, IconButton, Menu, MenuItem, Modal, OutlinedInput, Select, Typography, alpha } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Close } from '@mui/icons-material'
import uploadFileImage from '../../assets/icons/upload-.png'
import { useDispatch,useSelector } from 'react-redux';
import { createNotification } from '../../features/notification/actions/notificationActions';
import { createLoadingSelector } from '../../features/notification/selectors/notificationSelectors';
import { addToast } from '../../features/toast/actions/toastAction';


export default function CreateNotification({showModel,setShowModel}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedImage, setSelectedImage] = useState('');
    const [image, setImage] = useState(null);
    const [link, setLink] = useState('');
    const loading = useSelector(createLoadingSelector);

    const dispatch = useDispatch();


useEffect(()=>{
   if(!loading){
         setShowModel(false)
       setTitle('')
       setDescription('')
       setSelectedImage('')
       setImage(null)
   }
},[loading])



    const handleImageChange = (e) => {
        const file = e.target.files[0];

        

        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



    const handleSubmit = () => {
        if(!title || !description ){
            dispatch(addToast('Please fill all the fields','error'))
            return;
        }

        if(!image){
            dispatch(addToast('Please select image','error'))
            return;
        }



        const formData = new FormData();

        formData.append('title',title);
        formData.append('description',description);
        formData.append('file',image);

        dispatch(createNotification(formData));

    }

  return (
    <Modal open={showModel} onClose={() => setShowModel(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}  >
    <Box sx={{ position: 'relative', width: { xs: '90vw', sm: '95vw', md: '100%' }, maxWidth: '860px' }}>
    <Card sx={{ py: 2, px: 3 ,maxHeight:'80dvh',overflowY:'scroll' }}>
        <Typography variant='h4' sx={{textAlign:'center',fontWeight:'bold',mb:2}}>Create Notification</Typography>
        
        <IconButton onClick={() => setShowModel(false)}  sx={{position:'absolute',top:'15px',right:'15px',color:'text.primary'}} >
            <Close />
          </IconButton>
            <FormControl fullWidth>
                <FormLabel variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mt: 3, mb: 1 }}>Notification Title</FormLabel>  
                <OutlinedInput value={title} onChange={(e)=>setTitle(e.target.value)}  />
            </FormControl>
            <FormControl fullWidth>
                <FormLabel variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mt: 3, mb: 1 }}>Notification description</FormLabel>  
                <OutlinedInput  value={description} onChange={(e)=>setDescription(e.target.value) } />
            </FormControl> 
         <FormControl fullWidth>
                
                <FormLabel variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mt: 3, mb: 1 }}>Notification Image</FormLabel>
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
</FormControl>


            <Box sx={{width:'100%',textAlign:'center',mt:4}} >
         {
            loading ?
                <CircularProgress />
                :
                <Button onClick={handleSubmit} variant='contained' sx={{  backgroundImage:(theme)=> theme.palette.gradientColors[4], p: 1.2 }} >Create Notification</Button>
         }

            </Box>
        </Card>
        </Box>
    </Modal>
  )
}