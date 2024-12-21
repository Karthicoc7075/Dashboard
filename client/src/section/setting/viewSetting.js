import {
    Box,
    Card,
    Container,
    Tab,
    Tabs,
    Typography,
    TabPanel,
    FormLabel,
    FormControl,
    OutlinedInput,
    Button,
    Select,
    Menu,
    MenuItem,
    TextareaAutosize,
    TextField,
  } from "@mui/material";
  import zIndex from "@mui/material/styles/zIndex";
  import React from "react";
  import AdsSetting from "./adsSetting";
  import AppSetting from "./appSetting";
  import MyProfile from "./myProfile";
import { useSelector } from "react-redux";
import { getAuthSelector } from "../../features/auth/selectors/authSelector";
  
  export default function ViewSetting() {
    const user = useSelector(getAuthSelector)
const role = user?.user.role
    console.log(role);
    
    const [value, setValue] = React.useState(0);
    const handleChange = (e, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: "bold", my: 2 }}>
          Settings
        </Typography>
        <Card sx={{ boxShadow: (theme) => theme.shadows[4], my: 2, p: 3 }}>
         {
            role==='admin' ?
            <Box
            sx={{
              display: "flex",
              width: "100%",
              p: 0.8,
              background: (theme) => theme.palette.background.neutral,
              borderRadius: 1,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              variant="fullWidth"
              sx={{
                width: "100%",
                "& .MuiTabs-indicator": {
                  backgroundColor:(theme)=> theme.palette.background.paper ,
                  height: "100%",
                  borderRadius: 1,
                  m: 0.3,
                  boxShadow: (theme) => theme.shadows[2],
                  transition: "all .6s ease",
                  zIndex: 2,
                },
                "& button:active": {
                  transition: "all .1s ease",
                },
              }}
            >
              <Tab label="My profile" sx={{ zIndex: 100 }} />
              <Tab label="App setting" sx={{ zIndex: 100 }} />
              <Tab label="Ads setting" sx={{ zIndex: 100 }} />
            </Tabs>
          </Box>:
          <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            p: 1.4,
            // background: (theme) => theme.palette.background.neutral,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            My profile
          </Typography>
        </Box>
         }
          <Box sx={{ display: "flex", justifyContent: "center", my: 2, px: 4 }}>
            {value === 0 && <MyProfile />}
            {value === 1 && <AppSetting />}
            {value === 2 && <AdsSetting />}
          </Box>
        </Card>
      </Container>
    );
  }




  