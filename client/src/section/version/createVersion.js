import { Box, Button, Card, CircularProgress, Container, FormControl, FormLabel, Menu, MenuItem, Modal, OutlinedInput, Select, Typography,IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { createVersion } from '../../features/version/actions/versionActions'
import { createLoadingSelector } from '../../features/version/selectors/versionSelectors'
import { addToast } from '../../features/toast/actions/toastAction'

export default function CreateVersion({showModel,setShowModel}) {
    const [title, setTitle] = useState(''); 
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(true);
    const loading = useSelector(createLoadingSelector);
    const dispatch = useDispatch();


    useEffect(() => {
        if (!loading) {
            setShowModel(false);
            setTitle('');
            setCode('');
            setDescription('');
            setStatus(true);
        }
    }, [loading]);

    const createVersionHandle = () => {
        if (title === '' || code === '' || description === '') {
            dispatch(addToast('All fields are required', 'error'));
            return;
        }
        const data = {
            title,
            code,
            description,
            status
        }
        dispatch(createVersion(data));
        
    }
return (
    <Modal open={showModel} onClose={() => setShowModel(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}  >
    <Box sx={{ position: 'relative', width: { xs: '90vw', sm: '95vw', md: '100%' }, maxWidth: '860px' }}>
    <Card sx={{ py: 2, px: 3 ,maxHeight:'80dvh',overflowY:'scroll' }}>
        <Typography variant='h4' sx={{ mt: 2, textAlign: 'center', fontWeight: 'fontWeightBold' }} > Create Version</Typography>
        
            <IconButton onClick={() => setShowModel(false)}  sx={{position:'absolute',top:'15px',right:'15px',color:'text.primary'}} >
            <Close />
          </IconButton>
                <FormControl fullWidth sx={{mb:2}}>
                    <FormLabel variant="subtitle1"  sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mt: 3, mb: 1 }}>Version Title</FormLabel>
                    <OutlinedInput value={title} onChange={(e) => setTitle(e.target.value)}/>
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mt: 3, mb: 1 }}>Version Code</FormLabel>
                    <OutlinedInput value={code} onChange={(e) => setCode(e.target.value)}/>
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mt: 3, mb: 1 }}>Version Description</FormLabel>
                    <OutlinedInput value={description} onChange={(e) => setDescription(e.target.value)}/>
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mt: 3, mb: 1 }}>Version Status</FormLabel>
                    <Select value={status} onChange={(e) => setStatus(e.target.value)} defaultValue={'active'} >
                        <MenuItem value={true}>Active</MenuItem>
                        <MenuItem value={false}>Inactive</MenuItem>
                    </Select>
                </FormControl>
                <Box  sx={{textAlign:'center',mt:2}}  >
                    {loading ?
                <CircularProgress  />:
                <Button variant='contained' sx={{backgroundImage:(theme)=> theme.palette.gradientColors[4],p:1.2}} onClick={createVersionHandle}>Create Version</Button>    
                }
                </Box>
            </Card>
        </Box>
    </Modal>
)
}