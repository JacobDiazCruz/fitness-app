'use client';

import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { theme } from '../../utils/mui';
import { ThemeProvider } from "@mui/material/styles";

interface Props {
  imagePath: string;
  name: string;
  about: string;
};

export default function Profile({
  imagePath,
  name,
  about
}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ 
          borderRadius: '8px', 
          p: 3, 
          width: '100%',
          backgroundColor: '#FFF'
        }}
      >
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Avatar 
            alt="Trainer Profile"
            sx={{
              width: 70,
              height: 70
            }}
            src={imagePath}
          />
          <Box sx={{ ml: 2 }}>
            <Typography variant="body1">
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#424242' }}>
              Certified Online Trainer
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#171717', 
              lineHeight: '24px',
              width: '90%'
            }}
          >
            {about}
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}