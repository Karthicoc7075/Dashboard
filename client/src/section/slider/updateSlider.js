import React, { useEffect, useState } from 'react'
import { Box, Card, Container, Typography, FormControl, Button, IconButton, alpha, OutlinedInput, Select, MenuItem, FormLabel, CircularProgress, Modal } from '@mui/material'
import uploadFileImage from '../../assets/icons/upload-.png'
import { Close } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import {addToast} from '../../features/toast/actions/toastAction'
import { getSlider,updateSlider } from "../../features//slider/actions/sliderActions";
import { getLoadingSelector,updateLoadingSelector,getSliderSelector } from "../../features/slider/selectors/sliderSelectors";
import {getAllClasses} from '../../features/class/actions/classActions'
import {getAllMaterials} from '../../features/material/actions/materialActions'
import {getAllNews} from '../../features/news/actions/newsActions'
import { getAllClassesSelector } from '../../features/class/selectors/classSelector';
import { getAllMaterialsSelector } from '../../features/material/selectors/materialSelectors';
import { getAllNewsSelector } from '../../features/news/selectors/newsSelectors';

export default function UpdateSlider({showModel,setShowModel,sliderId}) {
    const [title, setTitle] = useState('')
    const [sliderType, setSliderType] = useState('')
    const [image, setImage] = useState(null)
    const [selectId, setSelectId] = useState('')
    const [link, setLink] = useState('')
    const [selectedImage, setSelectedImage] = React.useState(null);
    const dispatch = useDispatch()
    const loading = useSelector(getLoadingSelector)
    const updateLoading = useSelector(updateLoadingSelector)
    const sliderData = useSelector(getSliderSelector)
    const selectClassData = useSelector(getAllClassesSelector)
    const selectMaterialsData = useSelector(getAllMaterialsSelector)
    const selectNewsData = useSelector(getAllNewsSelector)
    const [page,setPage] = useState(1)
    const [postLimit,setPostLimit] = useState(10)


    useEffect(()=>{
        if(sliderId){
            dispatch(getSlider(sliderId))
        }
    },[sliderId,showModel])

    useEffect(()=>{ 
        if(!updateLoading){
            setShowModel(false)
        }
    },[updateLoading])


    useEffect(()=>{
        if(sliderType === 'material'){  
            dispatch(getAllMaterials(page,postLimit))
        }else if(sliderType === 'news'){
            dispatch(getAllNews())
        }else if(sliderType == 'class'){
            dispatch(getAllClasses())
        }


    },[sliderType])

   

    useEffect(()=>{
        if(sliderData){
           setTitle(sliderData.title)
              setSliderType(sliderData.sliderType)
              setSelectedImage(sliderData.image)
              setImage(sliderData.image)
              setLink(sliderData?.link)
                setSelectId(sliderData.class || sliderData.material || sliderData.news)
        }
    },[sliderData])


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

    const submitHandle = () => {
        if (!title || !selectedImage || !sliderType ) {
            dispatch(addToast('Please fill all fields', 'error'))
            return
        }

        let formData = new FormData()

        formData.append('title', title)
        formData.append('file', image)
        formData.append('sliderType', sliderType)
        formData.append('imageId', sliderData?.image)
        if(sliderType === 'class'){
            formData.append('classId', selectId)
        }else if(sliderType === 'material'){
            formData.append('materialId', selectId)
        }else if(sliderType === 'news'){
            formData.append('newsId', selectId)
        }else if(sliderType === 'link'){
            formData.append('link', link)
        }
        dispatch(updateSlider(sliderId, formData))
    }



    const renderFormControl = (label, dataSelector) => {
        const data = dataSelector





        return (
            <FormControl fullWidth key={label}>
                <FormLabel variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold',mt:3, mb: 1 }}>
                    {label}
                </FormLabel>
                <Select value={selectId} onChange={(e)=>setSelectId(e.target.value)} >
                    {data.map((item) => (
                        <MenuItem key={item._id } value={item._id} >{item.className || item.materialName || item.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    };

    return (
        <Modal open={showModel} onClose={() => setShowModel(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}  >
        <Box sx={{ position: 'relative', width: { xs: '90vw', sm: '95vw', md: '100%' }, maxWidth: '860px' }}>
            <Card sx={{ py: 2, px: 3,maxHeight:'80dvh',overflowY:'scroll' }}>
            <Typography variant='h4' sx={{ mt: 2, textAlign: 'center', fontWeight: 'fontWeightBold' }} >
                Update Slider
            </Typography>
            <IconButton onClick={() => setShowModel(false)}  sx={{position:'absolute',top:'15px',right:'15px',color:'text.primary'}} >
            <Close />
          </IconButton>

                   {
                    loading ?
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'580px'}} >
                        <CircularProgress />
                    </Box>:
                    <Box>
                         <FormControl fullWidth  >
                        <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mb: 1 }}>title</Typography>
                        <OutlinedInput
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: Tamil"
                        />

                    </FormControl>
                    <FormControl fullWidth >
                        <FormLabel variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold',mt:3, mb: 1 }}>SliderType</FormLabel>
                        <Select value={sliderType}  onChange={(e) => setSliderType(e.target.value)}>
                            <MenuItem value='class' >Class</MenuItem>
                            <MenuItem value='news' >News</MenuItem>
                            <MenuItem value='material'>Material</MenuItem>
                            <MenuItem value='link' >Link</MenuItem>
                            <MenuItem value='nothing' >Nothing</MenuItem>
                        </Select>
                    </FormControl>

                    {sliderType === 'class' && renderFormControl('Class',selectClassData)}
                    {sliderType === 'material' && renderFormControl('Material', selectMaterialsData)}
                    {sliderType === 'news' && renderFormControl('News', selectNewsData)}
                    {sliderType === 'link' && (
                        <FormControl fullWidth key="link">
                            <FormLabel variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mb: 1,mt:3 }} >
                                Link
                            </FormLabel>
                            <OutlinedInput placeholder="Ex: https://www.google.com" value={link} onChange={(e)=>setLink(e.target.value)}/>
                        </FormControl>
                    )}
                    <FormControl fullWidth >
                        <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mt: 3, mb: 1 }}>Image</Typography>

                        <Box
                            sx={{
                                position: 'relative',
                                p: '5px',
                                height: '100%',
                                bgcolor: theme => theme.palette.grey[200],
                                border: '2px dashed #DFE3E8',
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
                                            top: 100,
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
                                        <Box component='img' src={uploadFileImage} sx={{ width: { xs: '200px', sm: '320px' } }} />
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
                                            boxShadow: (theme) => theme.shadows[8],
                                            backdropFilter: `blur(${6}px)`,
                                            WebkitBackdropFilter: `blur(${6}px)`,
                                            '&:hover': {
                                                background: theme => alpha(theme.palette.grey[700], .6)
                                            }
                                        }}
                                        onClick={() => setSelectedImage(null)}
                                    >
                                        <Close />
                                    </IconButton>

                                </Box>
                            )}
                        </Box>

                        <Box sx={{display:'flex',justifyContent:'center',mt:3}}>
                            {updateLoading ?
                            
                            <CircularProgress />
                            :
                            <Button
                                variant='contained'
                                sx={{ px: 5,backgroundImage:(theme)=> theme.palette.gradientColors[4], }}
                                onClick={submitHandle}
                            > update</Button>
                        }
                        </Box>
                    </FormControl>
                    </Box>

                   }
                </Card>
            </Box>
        </Modal>
    )
}