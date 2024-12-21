import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { DarkMode, Light, LightMode, MenuOpen } from "@mui/icons-material";
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import { alpha } from "@mui/material/styles";
import {  Settings } from "@mui/icons-material";
import { Menu, MenuItem, Switch, Typography, useMediaQuery } from "@mui/material";
import { getAuthSelector } from "../../features/auth/selectors/authSelector";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import {logout} from '../../features/auth/actions/authActions'
import { Link } from "react-router-dom";
import { setTheme } from "../../features/theme/actions/themeActions";
import { getThemeModeSelector } from "../../features/theme/selectors/themeSelectors";
export default function Header({ onOpenSidebar }) {

const [ themeAnchorEl, setThemeAnchorEl] = useState(null);
  const [settingAnchorEl, setSettingAnchorEl] = useState(null);
  const themeMode = useSelector(getThemeModeSelector);
  const theme = useTheme();
const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
const auth = useSelector(getAuthSelector);
const dispatch = useDispatch()

  const openSettingMenu = Boolean(settingAnchorEl);
  const openThemeMenu = Boolean(themeAnchorEl); 

  const handleSettingClick = (event) => {
    setSettingAnchorEl(event.currentTarget);
  };

  const handleThemeClick = (event) => {
    setThemeAnchorEl(event.currentTarget);
  }

  const handleThemeMode = (mode) => {

    dispatch(setTheme(mode))
    handleThemeModelClose()
  }

  const handleThemeModelClose = () => {
    setThemeAnchorEl(null);
  }

  const handleSettingModelClose = () => {
    setSettingAnchorEl(null);
  };

  const Logout = () => {
    dispatch(logout())
  }


  const handleLogout = () => {
    Logout()
   handleSettingModelClose()
  }


  useState(() => {
    const token = auth.token;
    if (token) {
      const decode = jwtDecode(token);
      const expireDate =new Date(decode.exp * 1000)
      if(expireDate < new Date()){
        Logout()
      }
    }
  }, [auth.token]);



  const renderContent = (
    <>
      <Typography
        variant="h6"
        noWrap
        sx={{ fontWeight: "fontWeightSemiMedium", color: "text.primary" }}
      >
        Admin panel
      </Typography>

      <Box sx={{ flexGrow: 1 }} />
      {!lgUp && (
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color:(theme)=>theme.palette.text.primary }}>
          <MenuOpen />
        </IconButton>
      )}
       <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton onClick={handleThemeClick} sx={{
          color:(theme)=>theme.palette.text.primary
        }} >
          {themeMode==='system' ? <DesktopWindowsOutlinedIcon/>: themeMode =='light' ?   <LightMode/> : <DarkMode/>}
        </IconButton>
      </Stack>
      <Menu
            id="basic-menu"
            anchorEl={themeAnchorEl}
            open={openThemeMenu}
            onClose={handleThemeModelClose}
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            sx={{
              '& .MuiMenu-paper': {
                py:.6,
                px:1.4,
                boxShadow: (theme) => theme.shadows[10],
                borderRadius: 2,
              }
            
            }}
          >
            <MenuItem component={Link}   onClick={()=>handleThemeMode('light')}  sx={{gap:1,mb:.8,bgcolor:theme=> themeMode =='light' &&  theme.palette.grey[300],borderRadius:1}} ><LightMode/> Light</MenuItem>
            <MenuItem component={Link}  onClick={()=>handleThemeMode('dark')} sx={{gap:1,mb:.8,bgcolor:theme=> themeMode =='dark' &&  theme.palette.grey[0],borderRadius:1}}  ><DarkMode/> Dark</MenuItem>
            <MenuItem component={Link}  onClick={()=>handleThemeMode('system')}sx={{gap:1,mb:.8,bgcolor:theme=> themeMode =='system' &&  theme.palette.grey[0],borderRadius:1}}  ><DesktopWindowsOutlinedIcon/> System</MenuItem>
          </Menu>
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton onClick={handleSettingClick} sx={{
          color:(theme)=>theme.palette.text.primary
        }} >
          <Settings  />
        </IconButton>
      </Stack>

      <Menu
            id="basic-menu"
            anchorEl={settingAnchorEl}
            open={openSettingMenu}
            onClose={handleSettingModelClose}
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            sx={{
              '& .MuiMenu-paper': {
                py:.6,
                px:1.4,
                boxShadow: (theme) => theme.shadows[10],
                borderRadius: 2,
              }
            
            }}
          >
            <MenuItem component={Link} to='/setting' onClick={handleSettingModelClose} sx={{mb:.8,borderRadius:1}} >Setting</MenuItem>
            <MenuItem onClick={handleLogout} sx={{mb:.8,borderRadius:1}}>Logout</MenuItem>
          </Menu>
    </>
  );

  return (
    <AppBar
      sx={{
        width: "calc(100% - 2rem)",
        margin: "1rem",
        borderRadius: "1rem",
        height: 64,
        boxSizing: "border-box",
        zIndex: theme.zIndex.appBar + 1,
        backdropFilter: `blur(${6}px)`,
        WebkitBackdropFilter: `blur(${6}px)`,
        backgroundColor: (theme) => theme.palette.mode =='light' ? alpha(theme.palette.grey[0],0.8):  theme.palette.background.paper,
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        boxShadow: (theme) => theme.shadows[4],
        ...(lgUp && {
          width: `calc(100% - ${280 + 1}px - 2rem)`,
          height: 68,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
