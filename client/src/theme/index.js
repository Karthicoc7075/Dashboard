import { useMemo,useState } from 'react';
import { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { getThemeModeSelector } from '../features/theme/selectors/themeSelectors';
import { useSelector } from 'react-redux';


export default function ThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const themeMode = useSelector(getThemeModeSelector);

  console.log(themeMode);
  
 
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

 console.log(prefersDarkMode);
  useEffect(() => {
    if (themeMode =='system') {
      setMode(prefersDarkMode ? 'dark' : 'light');
    } else {
      setMode(themeMode);
    }
  }, [prefersDarkMode, themeMode]);

  const memoizedValue = useMemo(
    () => ({
      palette: palette(mode),
      typography,
      shadows: shadows(mode),
    //   customShadows: customShadows(),
      shape: { borderRadius: 8 },
     
    }),
    [mode]
  );

  const theme = createTheme(memoizedValue);

//   theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
