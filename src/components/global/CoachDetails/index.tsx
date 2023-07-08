'use client';

import { useQuery } from "react-query";
import { getCoachProfile } from "@/api/Profile";
import { useParams } from "next/navigation";
import { LoadingIcon } from "@/components/global/Icons";
import CoachDetailsWrapper from "./CoachDetailsWrapper";

export default function CoachDetails() {
  const params = useParams();

  // fetch coach profile
  const {
    isLoading,
    data: coach
  } = useQuery('coach', () => getCoachProfile(params.id), {
    refetchOnMount: true
  });

  if(isLoading) {
    return (
      <div className="flex flex-wrap items-center">
        <LoadingIcon />
      </div>
    );
  }

  const { 
    userId,
    firstName,
    lastName,
    profileImage,
    coachingDetails
  }  = coach;

  return (
    <CoachDetailsWrapper
      header={
        <CoachDetailsWrapper.Header
          thumbnailImage={profileImage.thumbnailImage}
          fullName={`${firstName} ${lastName}`}
        />
      }
      firstColumn={
        <>
          <CoachDetailsWrapper.Carousel galleryImages={coachingDetails.galleryImages} />
          <CoachDetailsWrapper.Profile
            thumbnailImage={profileImage.thumbnailImage}
            name={`${firstName} ${lastName}`}
            about={coachingDetails.about}
          />
          <CoachDetailsWrapper.Reviews reviewsList={[]}/>
          <CoachDetailsWrapper.Portfolio portfolioImages={coachingDetails.portfolioImages} />
        </>
      }
      secondColumn={
        <CoachDetailsWrapper.PricingCard
          coachUserId={userId}
          featuredLength="month"
          services={coachingDetails.services}
        />
      }
    />
  );
};