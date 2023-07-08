'use client';

import { ReactNode } from "react";
import CoachDetailsCarousel from "./CoachDetailsCarousel";
import CoachDetailsHeader from "./CoachDetailsHeader";
import CoachDetailsPortfolio from "./CoachDetailsPortfolio";
import CoachDetailsPricingCard from "./CoachDetailsPricingCard";
import CoachDetailsProfile from "./CoachDetailsProfile";
import CoachDetailsReviews from "./CoachDetailsReviews";

interface CoachDetailsWrapper {
  header: ReactNode;
  firstColumn: ReactNode;
  secondColumn: ReactNode;
};

export default function CoachDetailsWrapper({
  header,
  firstColumn,
  secondColumn
}: CoachDetailsWrapper) {
  return (
    <div className="coach-details">
      {header}
      <div className="flex flex-col md:flex-row w-full gap-[30px]">
        <div className="w-full md:w-[60%]">
          {firstColumn}
        </div>
        <div className="h-[467px] w-[380px] sticky top-[5em]">
          {secondColumn}
        </div>
      </div>
    </div>
  );
};

CoachDetailsWrapper.Carousel = CoachDetailsCarousel;
CoachDetailsWrapper.Header = CoachDetailsHeader;
CoachDetailsWrapper.Profile = CoachDetailsProfile;
CoachDetailsWrapper.Reviews = CoachDetailsReviews;
CoachDetailsWrapper.Portfolio = CoachDetailsPortfolio;
CoachDetailsWrapper.PricingCard = CoachDetailsPricingCard;