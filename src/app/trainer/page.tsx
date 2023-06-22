'use client';

import Profile from "../../components/manager/coach/Profile";
import PricingCard from "../../components/manager/coach/PricingCard";
import Carousel from "../../components/manager/coach/Carousel";
import Reviews from "../../components/manager/coach/Reviews";
import MyPortfolio from "../../components/manager/coach/MyPortfolio";

export default function Trainer() {
  return (
    <div className="flex gap-[80px]">
      <div className="w-[63%]">
        <Carousel
          galleryImages={[
            {
              alt: "Gallery 1",
              src: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
            },
            {
              alt: "Gallery 2",
              src: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
            },
            {
              alt: "Gallery 3",
              src: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
            },
            {
              alt: "Gallery 4",
              src: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
            }
          ]}
        />
        <Profile 
          imagePath="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
          name="John Doe"
          about="I am Deniz Yozkan, a certified fitness trainer and a kyokushin karate international champion. I offer the highest quality personal training and self-development services!"
        />
        <Reviews
          reviewsList={[
            {
              name: "Avatar 1",
              imagePath: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png",
              rating: 5,
              dateAdded: "1 month",
              feedback: "Definitely one of the best coaches out there! Did what’s best to reach my current physique."
            },
            {
              name: "Avatar 1",
              imagePath: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png",
              rating: 5,
              dateAdded: "1 month",
              feedback: "Definitely one of the best coaches out there! Did what’s best to reach my current physique."
            }
          ]}
        />
        <MyPortfolio 
          portfolioImages={[
            {
              name: "Portfolio Image 1",
              imagePath: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png",
            },
            {
              name: "Portfolio Image 1",
              imagePath: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png",
            },
            {
              name: "Portfolio Image 1",
              imagePath: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png",
            },
            {
              name: "Portfolio Image 1",
              imagePath: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png",
            },
            {
              name: "Portfolio Image 1",
              imagePath: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png",
            },
            {
              name: "Portfolio Image 1",
              imagePath: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png",
            }
          ]}
        />
      </div>
      <PricingCard
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