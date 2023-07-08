'use client';

import React from "react";
import SelectOrderOptions from "../SelectOrderOptions";
import CheckoutContainer from "../CheckoutContainer";
import Steps from "../Steps";
import { ThemeProvider } from "@/contexts/Theme";

export default function CheckoutPayment() {
  return (
    <ThemeProvider>
      <div
        style={{
          margin: "100px auto",
          width: '1200px'
        }}
      >
        <Steps />
        <div
          style={{
            display: 'flex',
            gap: "30px",
            margin: "50px auto",
            width: '1200px'
          }}
        >
          <SelectOrderOptions/>
          <CheckoutContainer
            featuredPrice="$200"
            featuredLength="month"
            packageList={[
              '4-week custom workout program',
              'Nutrition and diet',
              'Mobility exercises'
            ]}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}