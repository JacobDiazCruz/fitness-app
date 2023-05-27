'use client';

import { Box, Button, Input, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function PageActions() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <TextField
        sx={{
          backgroundColor: '#FFF'
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button 
        variant="contained" 
        startIcon={<AddIcon />}
      >
        Add New Exercise
      </Button>
    </Box>
  );
}