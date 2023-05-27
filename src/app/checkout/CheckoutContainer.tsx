'use client';

import { useState } from "react";
import { Button, Card, ListItemIcon, ListItemText, Typography, List, ListItem, Divider } from "@mui/material";
import { Box } from "@mui/system";
import CheckIcon from '@mui/icons-material/Check';
import { theme } from '../../utils/mui';
import { ThemeProvider } from "@mui/material/styles";

interface Props {
  featuredPrice?: number;
  featuredLength?: string;
  packageList?: Array<string>;
};

export default function CheckoutContainer({
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
        <Typography variant="h5">Checkout</Typography>
        <Box sx={{ mt: 1 }}>
          <List>
            {list}
          </List>
          <Divider sx={{ my: 1 }}/>
          <List>
            <ListItem sx={{ justifyContent: 'space-between', px: 0 }}>
              <Typography variant="body2">
                Service charge
              </Typography>
              <Typography variant="body2">
                PHP 300
              </Typography>
            </ListItem>
            <ListItem sx={{ justifyContent: 'space-between', px: 0 }}>
              <Typography variant="caption" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                PHP 3,300
              </Typography>
            </ListItem>
          </List>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained"
            fullWidth
            onClick={() => console.log("get now")}
          >
            Pay now
          </Button>
        </Box>
      </Card>
    </ThemeProvider>
  );
}