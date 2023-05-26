'use client';

import { useState } from 'react';
import { theme } from '../../utils/mui';
import { ThemeProvider } from "@mui/material/styles";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function TrainerRating() {
  const [value, setValue] = useState<number | null>(4);

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" sx={{ alignItems: 'center' }}>
        <Typography mr={1} variant="body2" color="#21C79F">
          5.0
        </Typography>
        <Rating
          name="read-only"
          value={value}
          readOnly
          sx={{
            color: '#21C79F',
            fontSize: '1.1rem'
          }}
        />
        <Typography
          ml={1} 
          variant="body2"
          color="#7D7979" 
          fontWeight={200}
        >
          (200)
        </Typography>
      </Box>
    </ThemeProvider>
  );
}