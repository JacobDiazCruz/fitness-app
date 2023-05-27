'use client';

import { useState } from "react";
import { Box, Typography } from "@mui/material";
interface OrderOption {
  price: number;
  title: string;
  isSelected: boolean;
  description: string;
};

export default function SelectOrderOptions() {
  const [orderOptions, setOrderOptions] = useState<OrderOption>([
    {
      price: 2000,
      title: 'Fitness Plan',
      isSelected: false,
      description: 'I will be your online personal trainer for a month 24 7 on line'
    },
    {
      price: 3000,
      title: 'Nutrition Plan',
      isSelected: false,
      description: 'I will be your online personal trainer for a month 24 7 on line'
    },
    {
      price: 1000,
      title: 'Healthy Plan',
      isSelected: false,
      description: 'I will be your online personal trainer for a month 24 7 on line'
    }
  ]);

  return (
    <Box 
      sx={{
        backgroundColor: '#FFF',
        p: 3,
        width: '682px'
      }}
    >
      <Typography variant="h5">Select Order Options</Typography>
      {orderOptions.map((orderOption: OrderOption, key: number) => (
        <Box
          sx={{
            display: 'flex', 
            p: 2,
            mt: 2,
            borderRadius: '8px', 
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: orderOption.isSelected ? '#24282C' : '#D9D9D9',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
          onClick={() => {
            const newOrderOptions = [...orderOptions];
            newOrderOptions[key].isSelected = !orderOptions[key].isSelected;
            setOrderOptions(newOrderOptions);
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
              width: '30px',
              height: '30px',
              borderWidth: '1px',
              borderRadius: '100%',
              borderStyle: 'solid',
              display: 'flex',
              alignItems: 'center',
              borderColor: orderOption.isSelected ? '#24282C' : '#D9D9D9',
            }}
          >
            {orderOption.isSelected && (
              <Box
                sx={{
                  m: 'auto',
                  width: '20px',
                  height: '20px',
                  borderRadius: '100%',
                  backgroundColor: '#24282C'
                }}
              ></Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}