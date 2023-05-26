import React from "react";
import SelectOrderOptions from "./SelectOrderOptions";
import CheckoutContainer from "./CheckoutContainer";

export default function Checkout() {
  return (
    <div
      style={{
        display: 'flex',
        gap: "30px",
        margin: "100px auto",
        width: '1200px'
      }}
    >
      <SelectOrderOptions
        orderOptions={[
          {
            price: 2000,
            title: 'Fitness Plan',
            description: 'I will be your online personal trainer for a month 24 7 on line'
          },
          {
            price: 2000,
            title: 'Fitness Plan',
            description: 'I will be your online personal trainer for a month 24 7 on line'
          }
        ]}
      />
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
  );
}