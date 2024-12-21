import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const H_MOBILE= 72;
const   H_DESKTOP= 80
const   WIDTH= 280
const SPACING = 20;

export default function Main({ children, sx, ...other }) {
    const theme = useTheme()
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${WIDTH}px)`,
        })
      }}
    >
      {children}
    </Box>
  );
}