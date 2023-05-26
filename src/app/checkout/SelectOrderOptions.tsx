'use client';

import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  orderOptions: Array<OrderOption>;
};

interface OrderOption {
  price: number;
  title: string;
  description: string;
};

export default function SelectOrderOptions({ 
  orderOptions
}: Props) {
  return (
    <Box 
      sx={{
        backgroundColor: '#FFF',
        p: 3,
        width: '682px'
      }}
    >
      <Typography variant="h5">Select Order Options</Typography>
      {orderOptions.map((orderOption: OrderOption) => (
        <Box
          sx={{
            display: 'flex', 
            p: 2,
            mt: 2,
            borderRadius: '8px', 
            border: '1px solid #D9D9D9',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <Box>
            <Typography variant="body1" sx={{ color: '#636363', fontSize: '18px' }}>
              {orderOption.price}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 1 }}>
              {orderOption.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#7C7C7C', mt: 0.5, width: '80%' }}>
              {orderOption.description}
            </Typography>
          </Box>
          <Box
            sx={{
              borderRadius: '100%',
              width: '30px',
              height: '30px',
              border: '1px solid #D9D9D9'
            }}
          ></Box>
        </Box>
      ))}
    </Box>
  );
}