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
import ProfileCoachingServices from "./ProfileCoachingServices";
import CoachingPlans from "./CoachingPlans/CoachingPlans";
export interface Form {
  profileImage: string | null;
  firstName: string | null;
  lastName: string | null;
  contact: string | null;
};

export default function Profile() {
  const params = useParams();

  // uploader states
  const [showUploaderModal, setShowUploaderModal] = useState<boolean>(false);
  const [selectedHeaderTitle, setSelectedHeaderTitle] = useState<string>("");
  const [uploadType, setUploadType] = useState<'PORTFOLIO_UPLOAD' | 'GALLERY_UPLOAD'>("GALLERY_UPLOAD");
  const [showEditAccountDetailsModal, setShowEditAccountDetailsModal] = useState<boolean>(false);

  const [servicesList, setServicesList] = useState<CoachingService[]>([]);
  const [plansList, setPlansList] = useState([
    {
      name: "Basic",
      totalPrice: {
        currency: "PHP",
        value: 344
      },
      description: "I will create a professional Diet or a Workout plan and give you some extra tips",
      services: ["12381238123", "12381238123", "12381238123"]
    },
    {
      name: "Premium",
      totalPrice: {
        currency: "PHP",
        value: 122
      },
      description: "I will create a professional Diet or a Workout plan and give you some extra tips",
      services: ["12381238123"]
    },
    {
      name: "Premium",
      totalPrice: {
        currency: "PHP",
        value: 122
      },
      description: "I will create a professional Diet or a Workout plan and give you some extra tips",
      services: ["12381238123"]
    }
  ]);

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

  const {
    data: coachingServices,
  } = useQuery('coachingServices', () => getCoachingServices(params.id), {
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

  useEffect(() => {
    if(coachingServices?.length) {
      setServicesList(coachingServices);
    }
  }, [coachingServices]);

  return (
    <div className="profile-page">
      <Header pageTitle="Profile" />
      <div className="profile">
        <AccountDetails
          profile={profile}
          setShowEditAccountDetailsModal={setShowEditAccountDetailsModal}
        />
        <PermissionAccess roleAccess="Coach">
          <CoachingPlans 
            plansList={plansList}
            servicesList={servicesList}
            setPlansList={setPlansList}
            setServicesList={setServicesList}
            handleEdit={() => setShowEditServicesModal(true)}
          />
          <ProfileCoachingServices
            servicesList={servicesList}
            setServicesList={setServicesList}
            handleEdit={() => setShowEditServicesModal(true)}
          />
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