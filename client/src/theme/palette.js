import { alpha } from '@mui/material/styles';



export const lightGrey = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

export const darkGrey = {
  0: '#0A0A0A',
  100: '#1A1A1A',
  200: '#2E2E2E',
  300: '#424242',
  400: '#5C5C5C',
  500: '#757575',
  600: '#909090',
  700: '#A0A0A0',
  800: '#B0B0B0',
  900: '#C0C0C0',

};


export const primary = {
  lighter: '#D0ECFE',
  light: '#73BAFB',
  main: '#1877F2',
  dark: '#0C44AE',
  darker: '#042174',
  contrastText: '#FFFFFF',
};

export const secondary = {
  lighter: '#EFD6FF',
  light: '#C684FF',
  main: '#8E33FF',
  dark: '#5119B7',
  darker: '#27097A',
  contrastText: '#FFFFFF',
};

export const info = {
  lighter: '#CAFDF5',
  light: '#61F3F3',
  main: '#00B8D9',
  dark: '#006C9C',
  darker: '#003768',
  contrastText: '#FFFFFF',
};

export const success = {
  lighter: '#C8FAD6',
  light: '#5BE49B',
  main: '#00A76F',
  dark: '#007867',
  darker: '#004B50',
  contrastText: '#FFFFFF',
};

export const warning = {
  lighter: '#FFF5CC',
  light: '#FFD666',
  main: '#FFAB00',
  dark: '#B76E00',
  darker: '#7A4100',
  contrastText: lightGrey[800],
};

export const error = {
  lighter: '#FFD1D1',  
  light: '#FF7F7F',     
  main: '#FF0000',      
  dark: '#CC0000',      
  darker: '#800000',    
  contrastText: '#FFFFFF', 
};

export const common = {
  black: '#000000',
  white: '#FFFFFF',
};

export const action = {
  hover: alpha(lightGrey[500], 0.08),
  selected: alpha(lightGrey[500], 0.16),
  disabled: alpha(lightGrey[500], 0.8),
  disabledBackground: alpha(lightGrey[500], 0.24),
  focus: alpha(lightGrey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

const base = (mode) => ({
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey: mode === 'light' ? lightGrey : darkGrey,
  common,
  divider: alpha(mode === 'light' ? lightGrey[500] : darkGrey[500], 0.2),
  action,
});

const lightGradientColors = [
  'linear-gradient(310deg, #ea0606 0%, #ff667c 100%)',
  'linear-gradient(310deg, #2152ff 0%, #21d4fd 100%)',
  'linear-gradient(310deg, #17ad37 0%, #98ec2d 100%)',
  'linear-gradient(310deg, #7928CA 0%, #FF0080 100%)',
  'linear-gradient(310deg, #627594 0%, #A8B8D8 100%)',
  'linear-gradient(310deg, #f53939 0%, #fbcf33 100%)',

  'linear-gradient(310deg, #369f9f 0%, #9bffff 100%)',
  'linear-gradient(310deg, #6927d3 0%, #eec5ff 100%)',
  'linear-gradient(310deg, #1b4e9b 0%, #98e7ff 100%)',
  'linear-gradient(310deg, #c18d16 0%, #daff45 100%)',


]

const darkGradientColors = [
  'linear-gradient(310deg, #d32f2f 0%, #e57373 100%)', 
  'linear-gradient(310deg, #002f6c 0%, #2196f3 100%)', 
  'linear-gradient(310deg, #004d40 0%, #00796b 100%)', 
  'linear-gradient(310deg, #4a148c 0%, #ab47bc 100%)', 
  'linear-gradient(310deg, #37474f 0%, #90a4ae 100%)', 
  'linear-gradient(310deg, #c62828 0%, #f57f17 100%)', 
  'linear-gradient(310deg, #00695c 0%, #004d40 100%)', 
  'linear-gradient(310deg, #4a148c 0%, #b388eb 100%)', 
  'linear-gradient(310deg, #003c8f 0%, #0288d1 100%)', 
  'linear-gradient(310deg, #f9a825 0%, #c0ca33 100%)', 
]




export function palette(mode) {
 const currentGrey = mode === 'light' ? lightGrey : darkGrey;
 const gradientColors =  mode === 'light' ? lightGradientColors : darkGradientColors;
 

  return {
    ...base(mode),
    mode,
    text: {
      primary: mode === 'light' ? currentGrey[800] : currentGrey[900],
      secondary: mode === 'light' ? currentGrey[600] : currentGrey[700],
      disabled: mode === 'light' ? currentGrey[500] : currentGrey[500],
    },
    background: {
      paper: mode === 'light' ? currentGrey[0] : currentGrey[0],
      default: mode === 'light' ? currentGrey[200] : currentGrey[200],
      neutral: mode === 'light' ? currentGrey[200] : currentGrey[200],
    },
    gradientColors: gradientColors,
    action: {
      ...base(mode).action,
      active: mode === 'light' ? currentGrey[600] : currentGrey[300],
    },
  };
}