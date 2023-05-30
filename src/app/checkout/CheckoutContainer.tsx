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
    <li className="flex items-center py-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#21C79F" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <p className="ml-2">{item}</p>
    </li>
  ));

  return (
    <>
      <div className="bg-white rounded-lg p-6 w-[500px] h-[467px] sticky top-[5em]">
        <h5 className="font-bold">Checkout</h5>
        <div className="mt-2">
          <ul className="max-w-md space-y-1 list-inside mt-7">
            {list}
          </ul>
          <hr className="my-2" />
          <ul className="max-w-md space-y-1 list-inside mt-7">
            <li className="flex items-center justify-between py-2">
              <p>Service charge</p>
              <p>PHP 300</p>
            </li>
            <li className="flex items-center justify-between py-2">
              <p className="font-bold">Total</p>
              <p className="font-bold">PHP 3,300</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}