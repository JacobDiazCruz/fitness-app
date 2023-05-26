'use client';

import { useState } from "react";
import { Button, Card, ListItemIcon, ListItemText, Typography, List, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import CheckIcon from '@mui/icons-material/Check';
import { theme } from '../../utils/mui';
import { ThemeProvider } from "@mui/material/styles";

interface Props {
  featuredPrice?: number;
  featuredLength?: string;
  packageList?: Array<string>;
};

export default function PricingCard({
  featuredPrice,
  featuredLength,
  packageList
}: Props) {

  const list = packageList?.map((item) => (
    <ListItem sx={{ py: 1, px: 0 }}>
      <ListItemIcon sx={{ minWidth: '33px' }}>
        <CheckIcon sx={{ color: '#21C79F' }} />
      </ListItemIcon>
      <Typography variant="body2">
        {item}
      </Typography>
    </ListItem>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Card 
        sx={{ 
          p: 3,
          width: '500px', 
          height: '467px',
          boxShadow: 0,
          position: 'sticky',
          top: '5em'
        }}
      >
        <Typography variant="h3">
          {featuredPrice} / {featuredLength}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained"
            fullWidth
            onClick={() => console.log("get now")}
          >
            Get now
          </Button>
        </Box>
        <Box>
          <Button
            variant="outlined"
            sx={{ mt: 1 }}
            fullWidth
            onClick={() => console.log("get now")}
          >
            Message
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">
            Package includes:
          </Typography>
          <List>
            {list}
          </List>
        </Box>
      </Card>
    </ThemeProvider>
  );
}