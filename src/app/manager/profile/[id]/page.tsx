'use client';

import { useEffect, useState } from "react";
import Header from "@/app/manager/Header";
import { getProfile } from "@/api/Profile";
import { useQuery } from "react-query";
import AccountDetails from "./AccountDetails";
import PermissionAccess from "@/components/global/PermissionAccess";
import EditServicesModal from "./EditServicesModal";
import { getCoachingServices } from "@/api/CoachingService";
import { useParams } from "next/navigation";
import { CoachingService } from "@/utils/coachTypes";
import UploaderModal from "./UploaderModal";
import EditAccountDetailsModal from "./EditAccountDetailsModal";
import ProfileGallery from "./ProfileGallery";
import ProfilePortfolio from "./ProfilePortfolio";
import CoachingPlans from "./CoachingPlans/CoachingPlans";
import CoachingPlanContextProvider from "@/contexts/CoachingPlan";
import CoachingServices from "./CoachingServices";
import CoachingServiceContextProvider from "@/contexts/CoachingService";
import { CoachingPlanProvider } from "@/contexts/CoachingPlan/useCoachingPlan";
export interface Form {
  profileImage: string | null;
  firstName: string | null;
  lastName: string | null;
  contact: string | null;
};

export default function Profile() {

  // uploader states
  const [showUploaderModal, setShowUploaderModal] = useState<boolean>(false);
  const [selectedHeaderTitle, setSelectedHeaderTitle] = useState<string>("");
  const [uploadType, setUploadType] = useState<'PORTFOLIO_UPLOAD' | 'GALLERY_UPLOAD'>("GALLERY_UPLOAD");
  const [showEditAccountDetailsModal, setShowEditAccountDetailsModal] = useState<boolean>(false);

  const [servicesList, setServicesList] = useState<CoachingService[]>([]);

  // edit modal states
  const [showEditServicesModal, setShowEditServicesModal] = useState<boolean>(false);

  // get exercise data
  const {
    isLoading,
    isError,
    data: profile,
    error,
    refetch: refetchProfile
  } = useQuery('profile', () => getProfile({ userId: localStorage?.getItem("userId") }), {
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });
  interface HandleShowUploaderModal {
    headerTitle: string;
    uploadType: 'PORTFOLIO_UPLOAD' | 'GALLERY_UPLOAD';
  };

  const handleShowUploaderModal = ({ 
    headerTitle,
    uploadType
  } : HandleShowUploaderModal) => {
    setSelectedHeaderTitle(headerTitle);
    setShowUploaderModal(true);
    setUploadType(uploadType);
  };

  return (
    <div className="profile-page">
      <Header pageTitle="Profile" />
      <div className="profile">
        <AccountDetails
          profile={profile}
          setShowEditAccountDetailsModal={setShowEditAccountDetailsModal}
        />
        <PermissionAccess roleAccess="Coach">
          
          <CoachingPlanProvider>
            <CoachingPlans />
          </CoachingPlanProvider>

          <CoachingServiceContextProvider>
            <CoachingServices handleEdit={() => setShowEditServicesModal(true)} />
          </CoachingServiceContextProvider>

          <div className="flex gap-[30px]">
            <ProfileGallery
              galleryImages={profile?.coachingDetails?.galleryImages}
              handleShowUploaderModal={handleShowUploaderModal}
            />
            <ProfilePortfolio
              portfolioImages={profile?.coachingDetails?.portfolioImages}
              handleShowUploaderModal={handleShowUploaderModal}
            />
          </div>
        </PermissionAccess>
        {showEditServicesModal && (
          <EditServicesModal
            initialServicesList={servicesList}
            onClose={() => setShowEditServicesModal(false)}
            refetchProfile={refetchProfile}
          />
        )}
        {showUploaderModal && (
          <UploaderModal
            headerTitle={selectedHeaderTitle}
            onClose={() => setShowUploaderModal(false)}
            uploadType={uploadType}
            existingServerFiles={
              uploadType === "PORTFOLIO_UPLOAD"
                ? profile?.coachingDetails?.portfolioImages
                : uploadType === "GALLERY_UPLOAD"
                ? profile?.coachingDetails?.galleryImages
                : null
            }
          />
        )}
        {showEditAccountDetailsModal && (
          <EditAccountDetailsModal
            profile={profile}
            onClose={() => setShowEditAccountDetailsModal(false)}
            refetchProfile={refetchProfile}
          />
        )}
      </div>
    </div>
  );
};