import React,{useState,useEffect} from 'react'
import { Box,FormControl,FormLabel,OutlinedInput,Select,MenuItem,Button, CircularProgress, TextField } from '@mui/material'
import { useDispatch,useSelector } from 'react-redux'
import { getAppSettings,updateAppSettings } from '../../features/setting/actions/settingActions'
import { getAppSettingsLoadingSelector,getAppSettingsSelector,updateAppSettingsLoadingSelector } from '../../features/setting/selectors/settingSelectors'
import { addToast } from '../../features/toast/actions/toastAction'
import { upload } from '@testing-library/user-event/dist/upload'


function AppSetting() {
const [appName, setAppName] = useState('')
const [maintanceMode, setMaintanceMode] = useState(false)
const [firebaseLegacyServerKey, setFirebaseLegacyServerKey] = useState('')
const [appLink, setAppLink] = useState('')
const [privacyPolicy, setPrivacyPolicy] = useState('')
const loading = useSelector(getAppSettingsLoadingSelector)
const appSettings = useSelector(getAppSettingsSelector)
const updateLoading = useSelector(updateAppSettingsLoadingSelector)
const dispatch = useDispatch()


useEffect(() => {
  dispatch(getAppSettings())
}
, [])

useEffect(() => {
  if(appSettings){
    setAppName(appSettings.appName)
    setMaintanceMode(appSettings.maintanceMode)
    setFirebaseLegacyServerKey(appSettings.firebaseLegacyServerKey)
    setAppLink(appSettings.appLink)
    setPrivacyPolicy(appSettings.privacyPolicy)
  }
}
,[appSettings])


const handleUpdate = () => {


  console.log(appName,maintanceMode,firebaseLegacyServerKey,appLink,privacyPolicy);
  if(!appName === ''  || !firebaseLegacyServerKey === '' || !appLink === '' || !privacyPolicy === ''){
    return dispatch(addToast('All fields are required','error'))
  }

  const data = {
    appName,
    maintanceMode,
    firebaseLegacyServerKey,
    appLink,
    privacyPolicy
  }

  dispatch(updateAppSettings(appSettings._id,data))
}

  console.log(appSettings);


  return (
    <Box maxWidth={700}>
    {
      loading ?
      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:400}} >
        <CircularProgress />
        </Box>
      :
      <Box>
          <FormControl fullWidth>
        <FormLabel sx={{ mb: 1, mt: 2 }}>App Name</FormLabel>
        <OutlinedInput value={appName ?? '' } onChange={(e) => setAppName(e.target.value)} />
      </FormControl>
      <FormControl fullWidth>
        <FormLabel sx={{ mb: 1, mt: 2 }}>Maintenance Mode</FormLabel>
        <Select value={maintanceMode ?? false} onChange={(e) => setMaintanceMode(e.target.value)}>
          <MenuItem value={true}>On</MenuItem>
          <MenuItem value={false}>Off</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <FormLabel sx={{ mb: 1, mt: 2 }}>Firebase Legacy Server Key</FormLabel>
        <OutlinedInput value={firebaseLegacyServerKey ?? ''} onChange={(e) => setFirebaseLegacyServerKey(e.target.value)} />
      </FormControl>
      <FormControl fullWidth>
        <FormLabel sx={{ mb: 1, mt: 2 }}>App Link</FormLabel>
        <OutlinedInput value={appLink ?? ''} onChange={(e) => setAppLink(e.target.value)} />
      </FormControl>
      <FormControl fullWidth>
        <FormLabel sx={{ mb: 1, mt: 2 }}>Privacy Policy</FormLabel>
        <OutlinedInput
      multiline
      rows={4}
      variant="outlined"
      fullWidth
      placeholder="Type your text here..."
      value={privacyPolicy ?? ''}
      onChange={(e) => setPrivacyPolicy(e.target.value)}
    />

      </FormControl>
      <Box sx={{ my: 2, textAlign: 'center' }}>
{
  updateLoading ? <CircularProgress /> : <Button onClick={handleUpdate} sx={{backgroundImage:(theme)=> theme.palette.gradientColors[4],}} variant="contained" color="primary">Update</Button>
}
      </Box>
        </Box>
    }
    </Box>
  );
}

export default AppSetting