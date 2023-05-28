'use client';

import { useState } from "react";
import { Button, Card, ListItemIcon, ListItemText, Typography, List, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import CheckIcon from '@mui/icons-material/Check';
import { theme } from '../../utils/mui';
import { ThemeProvider } from "@mui/material/styles";
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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
    <>
      <div className="w-[500px] h-[467px] bg-white rounded-md p-6 sticky top-[5em]">
        <h3>{featuredPrice} / {featuredLength}</h3>
        <div className="mt-4">
          <button class="btn btn-dark w-full h-[53px]">
            Get now
          </button>
          <button class="btn btn-outlined w-full h-[53px] mt-3">
            Message
          </button>
        </div>
      </div>
      {/* <ThemeProvider theme={theme}>
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
              onClick={() => router.push('/checkout')}
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
      </ThemeProvider> */}
    </>
  );
}