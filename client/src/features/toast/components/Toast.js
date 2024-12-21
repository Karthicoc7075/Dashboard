import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast,ToastContainer } from 'react-toastify';
import { removeToast } from '../actions/toastAction';
import { getThemeModeSelector } from '../../theme/selectors/themeSelectors';
  import { useMediaQuery } from '@mui/material';

const Toast = () => {
    const dispatch = useDispatch();
    const toasts = useSelector(state => state.toast.toasts);
    const [displayedToasts,setDisplayedToasts] = useState([])
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const themeMode = useSelector(getThemeModeSelector);
    const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

    console.log(prefersDarkMode);
     useEffect(() => {
       if (themeMode =='system') {
         setMode(prefersDarkMode ? 'dark' : 'light');
       } else {
         setMode(themeMode);
       }
     }, [prefersDarkMode, themeMode]);
  
    useEffect(() => {
      toasts.forEach(({ id, message, type }) => {
       if(!displayedToasts.includes(id)){
        toast[type](message, {
            style: { background:mode == 'dark' ? '#0A0A0A':'#ffffff' , color:mode == 'dark' ? '#F9FAFB':'#1A1A1A' },
            onClose: () => dispatch(removeToast(id)),
            autoClose: 4000
          });
          setDisplayedToasts(prev=>[...prev,id])
       }
      });
    }, [toasts,displayedToasts, dispatch]);
  
    return <ToastContainer/>
  };

export default Toast;