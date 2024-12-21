import React, { useEffect, useState } from 'react'
import { Box, Card, Container, Typography, FormControl,Button,IconButton, alpha, OutlinedInput, CircularProgress, Select, MenuItem, Modal} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addToast } from '../../features/toast/actions/toastAction'
import { editUser, getUser } from '../../features/user/actions/userActions'
import { getUserSelector, getLoadingSelector ,updateLoadingSelector} from '../../features/user/selectors/userSelectors'
import { useParams } from 'react-router-dom'
import { Close } from '@mui/icons-material'



export default function UpdateUser({showModel,setShowModel,userId}) {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [role,setRole] = useState('user')
    const [status,setStatus] = useState('active')
    const dispatch = useDispatch()
    const loading = useSelector(getLoadingSelector)
    const updateLoading = useSelector(updateLoadingSelector)
    const user = useSelector(getUserSelector)

    useEffect(()=>{
        if(userId){
            dispatch(getUser(userId))
        }
    },[userId,showModel]);

    useEffect(()=>{ 
        if(!updateLoading){
            setShowModel(false)
        }
    },[updateLoading])

    useEffect(()=>{
        if(user){
            setUsername(user.username)
            setEmail(user.email)
            setRole(user.role)
            setStatus(user.status)
        }
    }
    ,[user])

    

    const submitHandler = () => {
        if(!username || !email ){
            dispatch(addToast('Please fill all fields', 'error'))
        }

        const userData = {username, email, password, role, status}
        dispatch(editUser(userId,userData))
    }
return (
    <Modal open={showModel} onClose={() => setShowModel(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}  >
    <Box sx={{ position: 'relative', width: { xs: '90vw', sm: '95vw', md: '100%' }, maxWidth: '860px' }}>
    <Card sx={{ py: 2, px: 3 ,maxHeight:'80dvh',overflowY:'scroll' }}>
    <Typography variant='h4' sx={{ mt: 2, textAlign: 'center', fontWeight: 'fontWeightBold' }} >
            Update User
    </Typography>
    <IconButton onClick={() => setShowModel(false)}  sx={{position:'absolute',top:'15px',right:'15px',color:'text.primary'}} >
            <Close />
          </IconButton>

                    <FormControl  fullWidth   >
                            <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mb: 1,mt:3 }}>UserName</Typography>
                            <OutlinedInput
                                    value={username ?? ''}
                                    onChange={(e)=>setUsername(e.target.value)}
                                    placeholder="Ex: John"
                            />
                         
                         </FormControl>
                            <FormControl  fullWidth  >
                             <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mb: 1,mt:3 }}>Email</Typography>
                             <OutlinedInput
                                        value={email ?? ''}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        placeholder="Ex: example@example.com"
                             />
                            </FormControl>
                            <FormControl  fullWidth  >
                             <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mb: 1,mt:3 }}> New Password</Typography>
                             <OutlinedInput
                                        value={password ?? ''}
                                        onChange={(e)=>setPassword(e.target.value)}
                                        placeholder="New password"
                             />
                            </FormControl>
                            <FormControl  fullWidth  >
                             <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mb: 1,mt:3 }}>Role</Typography>
                             <Select value={role} onChange={(e)=>setRole(e.target.value)} >
                                <MenuItem value='user'>User</MenuItem>
                                <MenuItem value='admin'>Admin</MenuItem>
                             </Select>
                            </FormControl>
                            <FormControl  fullWidth sx={{mb:2}} >
                             <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'fontWeightSemiBold', mb: 1,mt:3 }}>Status</Typography>
                                <Select value={status} onChange={(e)=>setStatus(e.target.value)} >
                                    <MenuItem value={'active'}>Active</MenuItem>
                                    <MenuItem value={'inactive'}>Inactive</MenuItem>
                                </Select>
                            </FormControl>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center'    ,
                                mb:2
                            }} >
                               {updateLoading ? <CircularProgress /> : <Button variant='contained' sx={{ p: 1.2, backgroundImage:(theme)=> theme.palette.gradientColors[4], mt: 2 }} onClick={()=>submitHandler()} >Create User</Button>}
                            </Box>
            </Card>
    </Box>
</Modal>
)
}


