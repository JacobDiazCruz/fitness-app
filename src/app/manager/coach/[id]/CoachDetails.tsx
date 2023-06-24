'use client';

import Profile from "@/components/manager/coach/Profile";
import PricingCard from "@/components/manager/coach/PricingCard";
import Carousel from "@/components/manager/coach/Carousel";
import Reviews from "@/components/manager/coach/Reviews";
import MyPortfolio from "@/components/manager/coach/MyPortfolio";
import { useQuery } from "react-query";
import { getCoachProfile } from "@/api/Profile";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Container from "@/components/global/Container";
import { primaryBgColor, primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import Image from "next/image";
import IconButton from "@/components/global/IconButton";
import { ArrowLeftIcon } from "@/components/global/Icons";

export default function CoachDetails() {
  const params = useParams();
  const router = useRouter();

  // get exercise data
  const { 
    isLoading,
    isError,
    data: coach,
    error,
    refetch
  } = useQuery('coach', () => getCoachProfile(params.id), {
    refetchOnMount: true
  });

  return (
    <div className="coach-details">
      <div className={`${primaryBgColor} z-[100] flex w-full py-5 mb-6 sticky top-0`}>
        <button 
          className="mr-5"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className={`w-4 h-4 ${primaryTextColor}`} />
        </button>
        <div className="rounded-full relative overflow-hidden w-10 h-10">
          {coach?.profileImage?.thumbnailImage && (
            <Image
              alt="Trainer Image"
              src={coach?.profileImage?.thumbnailImage}
              style={{ objectFit: "cover" }}
              fill
            />
          )}
        </div>
        <div className="ml-3">
          <h4 className={`${primaryTextColor} font-semibold text-[14px]`}>
            {coach?.firstName} {coach?.lastName}
          </h4>
          <p className={`${secondaryTextColor} font-light text-[12px]`}>
            Certified Online Trainer
          </p>
        </div>
      </div>
      <div className="flex w-full gap-[30px]">
        <div className="w-[60%]">
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
          coachUserId={coach?.userId}
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
  );
}