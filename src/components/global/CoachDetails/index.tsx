'use client';

import { useQuery } from "react-query";
import { getCoachProfile } from "@/api/Profile";
import { useParams } from "next/navigation";
import { LoadingIcon } from "@/components/global/Icons";
import CoachDetailsWrapper from "./CoachDetailsWrapper";
import { getCoachingServices } from "@/api/CoachingService";
import CheckoutModal from "./CheckoutModal";
import { useEffect, useState } from "react";
import useCoachingPlan from "@/contexts/CoachingPlan/useCoachingPlan";

export default function CoachDetails() {
  const params = useParams();

  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);

  // fetch coach profile
  const {
    isLoading,
    data: coach
  } = useQuery('coach', () => getCoachProfile(params.id), {
    refetchOnMount: true
  });

  useEffect(() => {
    if(coach) {
      localStorage?.setItem("coachUserId", coach.userId)
    }
  }, [coach]);

  const {
    coachingPlans,
    selectedPlan,
    setSelectedPlan,
    isLoadingCoachingPlans
  }: any = useCoachingPlan();

  // fetch coach services
  const {
    isLoading: isLoadingCoachingServices,
    data: coachingServices
  } = useQuery('coachingServices', () => getCoachingServices(params.id), {
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
    email,
    lastName,
    profileImage,
    coachingDetails
  }  = coach;

  if(isLoadingCoachingServices) {
    return <></>;
  }

  return (
    <>
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
            coachingPlans={coachingPlans}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            isLoadingCoachingPlans={isLoadingCoachingPlans}
            openCheckoutModal={() => setShowCheckoutModal(true)}
            featuredLength="month"
            services={coachingServices}
          />
        }
      />

      {showCheckoutModal && (
        <CheckoutModal
          onClose={() => setShowCheckoutModal(false)}
          thumbnailImage={profileImage?.thumbnailImage}
          fullName={`${firstName} ${lastName}`}
          email={email}
          selectedPlan={selectedPlan}
        />
      )}
    </>
  );
};