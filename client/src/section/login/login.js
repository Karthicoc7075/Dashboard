
import { Stack, TextField, Button, Container, FormLabel, Typography, CircularProgress, Box, FormControl } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/actions/authActions';
import { loadingSelector } from '../../features/auth/selectors/authSelector';
import { addToast } from '../../features/toast/actions/toastAction';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loading = useSelector(loadingSelector)
    const dispatch = useDispatch();

    const usernameChangeHandle = (event) => {
        setUsername(event.target.value);
    };

    const passwordChangeHandle = (event) => {
        setPassword(event.target.value);
    };

    const loginHandle = (e) => {
        //          if(!username || !password) {
        // alert('Please enter username and password');
        //         }
        e.preventDefault();
        if(username === '' || password === '') {
            dispatch(addToast('All fields are required', 'error'));
            return;
        }

        dispatch(login(username, password));
    };

    return (
        <Stack sx={{ background: 'background.default', height: '100dvh'}} >
            <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center' }} >
                <Stack sx={{
                    background: (theme) => theme.palette.background.paper,
                    mt: '8rem', maxWidth: '420px', width: '100%', p: 3,
                    boxShadow: (theme) => theme.shadows[4],
                    borderRadius: 2,
                }} >
                    <Typography variant='h3' sx={{
                        fontWeight: 'bold',
                        backgroundImage: (theme) => theme.palette.gradientColors[1],
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>Welcome back</Typography>

               <Box component={'form'}  onSubmit={(e)=>loginHandle(e)} >
                    <Typography variant='body2' sx={{ mb: 1, mt: 3, fontWeight: 'fontWeightSemiBold', }} >Username</Typography>
                    <TextField
                        sx={{
                            '& input:-webkit-autofill': {
                                WebkitBoxShadow: (theme) => theme.palette.mode == 'dark' ? '0 0 0 100px #000 inset' : '0 0 0 100px #FFF inset',
                                WebkitTextFillColor: (theme) => theme.palette.mode == 'dark' ? '#FFF' : '#000',
                                transition: 'background-color 5000s ease-in-out 0s',
                            },
                        }}
                        variant="outlined"
                        value={username}
                        onChange={usernameChangeHandle}
                        fullWidth
                    />
                    <Typography variant='body2' sx={{ mb: 1, mt: 3, fontWeight: 'fontWeightSemiBold' }} >Password</Typography>
                    <TextField
                        sx={{
                            '& input:-webkit-autofill': {
                                WebkitBoxShadow: '0 0 0 100px #000 inset',
                                WebkitTextFillColor: '#FFF',
                                transition: 'background-color 5000s ease-in-out 0s',
                            },
                        }}
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange= {passwordChangeHandle}
                        fullWidth
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }} >

                        {
                            loading ?
                                <CircularProgress />
                                :
                                <Button type='submit' variant="contained" sx={{ p: 1, width: '100%', backgroundImage: (theme) => theme.palette.gradientColors[1], }} >
                                    Login
                                </Button>
                        }
                    </Box>
                </Box>
                   
                </Stack>
            </Container>
        </Stack>
    );
}

export default Login;