import React, { useState,useEffect } from 'react'
import { Box, Card, Container, Typography, FormControl, Button, IconButton, alpha, OutlinedInput, Select, MenuItem, NativeSelect, Paper, CircularProgress } from '@mui/material'
import uploadFileImage from '../../assets/icons/upload-.png'
import { Close } from '@mui/icons-material';
import 'react-quill/dist/quill.snow.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {getAllLanguages} from '../../features/language/actions/languageActions'
import {getAllCategories} from '../../features/category/actions/categoryActions'
import {createNews} from '../../features/news/actions/newsActions'
import { useDispatch, useSelector } from 'react-redux';
import {getCategoriesSelector} from '../../features/category/selectors/categorySelectors'
import {getAllLanguageSelector} from '../../features/language/selectors/languageSelectors'
import { loadingSelector } from '../../features/news/selectors/newsSelectors';
import axiosInstance from '../../api/axiosConfig';
import { addToast } from '../../features/toast/actions/toastAction';

export default function CreateNews() {
    const [title, setTitle] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [languageId, setLanguage] = useState('')
    const [content,setContent] = useState('')
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [image, setImage] = useState(null)
    const [newsImages, setNewsImages] = useState([])
    const categories = useSelector(getCategoriesSelector)
    const languages = useSelector(getAllLanguageSelector)
    const loading = useSelector(loadingSelector)
    const error = useSelector(state => state.news.error)

    const dispatch = useDispatch()



    useEffect(() => {
        if(categories.length === 0){
            dispatch(getAllCategories())
        }
        if(languages.length === 0){
            dispatch(getAllLanguages())
        }

    }, [])

    useEffect(() => {
        if(!loading && error == null){ 
            
            setTitle('')
            setCategoryId('')
            setLanguage('')
            setContent('')
            setSelectedImage(null)
            setImage(null)
            setNewsImages([])
        }
    }, [loading])

    

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

        if (!title || !categoryId || !languageId || !image || !content) {
          return  dispatch(addToast('Please fill all fields', 'error'))
        }
        const formData = new FormData();
        formData.append('title', title)
        formData.append('categoryId', categoryId)
        formData.append('languageId', languageId)
        formData.append('content', content)
        formData.append('file', image)
        formData.append('newsImages', newsImages)
        console.log(...formData);
        dispatch(createNews(formData))
    }


    const uploadAdapter = (loader) => {
        return {
          upload: () => {
            return new Promise((resolve, reject) => {
              const data = new FormData();
              loader.file.then((file) => {
                data.append('file', file);
    
                axiosInstance.post('/news/upload', data)
                  .then(response => {
                    resolve({
                      default: response.data.url
                    });
                    setNewsImages(prev=>[...prev, response.data.url])
                  })
                  .catch(error => {
                    reject(error);
                  });
              });
            });
          }
        };
      };

    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
          return uploadAdapter(loader);
        };
      }

      const handleDeleteImage = (url) => {
        axiosInstance.delete(`/news/deleteImage?url=${url}`)
          .then(response => {
            setNewsImages(prev => prev.filter(imgUrl => imgUrl !== url));
            setContent(prevData => prevData.replace(new RegExp(`<img[^>]*src="${url}"[^>]*>`, 'g'), ''));
          })
          .catch(error => {
            console.error('There was an error deleting the image!', error);
          });
      };


    return (
        <Container maxWidth='xl' >
            <Typography variant='h4' sx={{ mt: 2, textAlign: 'center', fontWeight: 'fontWeightBold' }} >
                Create News
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }} >

                <Card sx={{ py: 2, px: 3, maxWidth: '860px', width: '100%' }} >

                    <FormControl fullWidth   >
                        <Box>
                            <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mb: 1 }}>News title</Typography>
                            <OutlinedInput
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ex: Tamil"
                                fullWidth
                            />
                        </Box>
                    </FormControl>
                    <FormControl fullWidth >
                        <Box >
                            <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mb: 1, mt: 2 }}>Category</Typography>
                            <Select fullWidth value={categoryId} onChange={(e) => setCategoryId(e.target.value)} >
                                {categories.map((item, index) => (
                                    <MenuItem key={index} value={item._id}>{item.categoryName}</MenuItem>
                                ))}

                            </Select>
                        </Box>
                    </FormControl>
                    <FormControl fullWidth>
                        <Box >
                            <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mb: 1, mt: 2  }}>Language</Typography>
                            <Select fullWidth  value={languageId} onChange={(e)=>setLanguage(e.target.value)} >
                                {languages.map((item, index) => (
                                    <MenuItem key={index} value={item._id}>{item.languageName}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </FormControl>
                   
                    
                    <FormControl fullWidth >

                        <Box>
                            <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mb: 1, mt: 2  }}>Image</Typography>

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
                        </Box>

                       
                       <FormControl  sx={{my:1.5}} >
                       <Paper>
                       <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mb: 1 }}>Content</Typography>
                        <CKEditor
                    editor={ ClassicEditor }
                    config={{
                        extraPlugins: [uploadPlugin]
                    }}
                    data={content}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data);
                      }}
                   />

                    
                        </Paper>
                       </FormControl>
                       {newsImages.length > 0 &&
                       <Box>
                        
                        <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mb: 1 }}>News Images</Typography>
                      
                      
                        <Box sx={{display:'flex',flexWrap:'wrap',gap:2}}>
                            {
                                
                                newsImages.map((item,index)=>(
                                    <Box key={index} sx={{position:'relative'}}>
                                        <Box component='img' src={item} sx={{width:'100px',height:'100px',objectFit:'cover',border:"2px solid #000",borderRadius:50}}/>
                                        <IconButton
                                        sx={{
                                            position:'absolute',
                                            top:0,
                                            right:0,
                                            bgcolor:'white',
                                            color:'black',
                                            zIndex:100
                                        }}
                                        onClick={()=>handleDeleteImage(item)}
                                        >
                                            <Close/>
                                        </IconButton>
                                    </Box>
                                ))
                            }
</Box>
                       </Box>
                    
                        }

                        <Box textAlign={'center'}>
                                {loading ?
                            <CircularProgress/>:
                            <Button onClick={() => submitHandle()} variant='contained' sx={{
                                mt: 2,
                                backgroundImage:(theme)=> theme.palette.gradientColors[4],
                                width: '120px',
                                ':hover': {
                                   
                                    opacity: .8
                                }
                            }} >Create</Button>    
                            }
                        </Box>
                    </FormControl>
                </Card>
            </Box>
        </Container>
    )
}