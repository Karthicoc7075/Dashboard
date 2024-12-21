import React, { useState,useEffect } from 'react'
import { Container, Grid, Typography, Card, CardMedia, Button, Box, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import DeleteModel from "../../components/model/deleteModel";
import { useDispatch, useSelector } from "react-redux";
import { getAllLanguages,deleteLanguage} from "../../features/language/actions/languageActions";
import { getAllLanguageSelector, loadingSelector, deleteLoadingSelector } from "../../features/language/selectors/languageSelectors";
import UpdateModel from "./updateLanguage";
import CreateModel from "./createLanguage";



export default function ViewLanguage() {
    const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [deleteId, setDeleteId] = useState(null)
  const [updateId, setUpdateId] = useState(null)
  const languages = useSelector(getAllLanguageSelector);
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const deleteLoading = useSelector(deleteLoadingSelector);

  useEffect(() => {
    if (languages.length === 0) {
      dispatch(getAllLanguages());
    }

  }, []);


  useEffect(()=>{
    if(!deleteLoading){
      setShowDeleteModel(false)
    }
  },[deleteLoading])

  const deleteHandle = () => {
    dispatch(deleteLanguage(deleteId));
    setDeleteId(null);
  }

  const createHandle = () => {
    setShowCreateModel(true);
    }

    return (
        <Container maxWidth="xl"   >
                  
<Box sx={{display:'flex',my:2}}>
                <Typography variant='h5' sx={{ flexGrow: 1 }} >Languages</Typography>
                <Button variant='contained'  sx={{ p: 1.2,backgroundImage:(theme)=> theme.palette.gradientColors[1], }} onClick={createHandle}   >ADD LANGUAGE</Button>
            </Box>
            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }} >
        <CircularProgress />
      </Box> :
            <Grid container spacing={2} sx={{ mt: 1 }}  >
                {
                    languages.map((item, index) => (
                        <LanguageItem key={index} item={item} setShowDeleteModel={setShowDeleteModel} setShowUpdateModel={setShowUpdateModel} setUpdateId={setUpdateId} setDeleteId={setDeleteId} />
                    ))
                }
            </Grid>
} 
 <UpdateModel showModel={showUpdateModel} setShowModel={setShowUpdateModel}  languageId={updateId} />
<CreateModel showModel={showCreateModel} setShowModel={setShowCreateModel} />
<DeleteModel 
           showModel={showDeleteModel}
            setShowModel={setShowDeleteModel}
            deleteHandle={deleteHandle}
            data='Language'
            desc="Deleting this language will delete all news associated with this language.Are you sure you want to delete this lanague?"
            loading={deleteLoading}
           />
        </Container>
    )
}



function LanguageItem({ item,setShowDeleteModel,setShowUpdateModel,setUpdateId,setDeleteId }){
    const [loader, setLoader] = useState(true)
    const deleteButtonClick = () => {
        setShowDeleteModel(true);
        setDeleteId(item._id);
      }

    const updateButtonClick = () => {
        setUpdateId(item._id);
        setShowUpdateModel(true);
        }
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Card
                sx={{
                    p:1.5,
                    boxShadow: (theme) => theme.shadows[6],
                    borderRadius: 2,
                    height: '100%',
                }}
            >
                <Box
                    component={'img'}
                    src={item.image}
                    onLoad={() => setLoader(false)}
                    sx={{
                        width: 1,
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: 1,
                        display: loader ? 'none' : 'block'
                    }} />
                {loader && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                    <CircularProgress />
                </Box>}

                <Typography variant='subtitle1' sx={{ textAlign: 'center', my: 2 }} >{item.languageName}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}  >
                    <Button onClick={updateButtonClick} variant='contained' sx={{   backgroundImage:(theme)=> theme.palette.gradientColors[1], }} >
                        Edit
                    </Button>
                    <Button   onClick={deleteButtonClick}  variant='contained' sx={{ p: 1.2, backgroundImage:(theme)=> theme.palette.gradientColors[0], }} >
                        Delete
                    </Button>


                </Box>
            </Card>

        </Grid>
    )
}

