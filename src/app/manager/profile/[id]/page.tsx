'use client';

import { ChangeEvent, useEffect, useState } from "react";
import Header from "@/app/manager/Header";
import { editProfileDetails, editProfileImage, getProfile } from "@/api/Profile";
import { useMutation, useQuery } from "react-query";
import AccountDetails from "./AccountDetails";
import useAlert from "@/contexts/Alert";
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

export interface Form {
  profileImage: string | null;
  firstName: string | null;
  lastName: string | null;
  contact: string | null;
};

export default function Profile() {
  const params = useParams();
  const { dispatchAlert }: any = useAlert();

  // uploader states
  const [showUploaderModal, setShowUploaderModal] = useState<boolean>(false);
  const [selectedHeaderTitle, setSelectedHeaderTitle] = useState<string>("");
  const [uploadType, setUploadType] = useState<'PORTFOLIO_UPLOAD' | 'GALLERY_UPLOAD'>("GALLERY_UPLOAD");

  // account details
  const [showEditAccountDetailsModal, setShowEditAccountDetailsModal] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>("+63");
  const [profileForm, setProfileForm] = useState<Form>({
    profileImage: null,
    firstName: null,
    lastName: null,
    contact: null
  });
  const [servicesList, setServicesList] = useState<CoachingService[]>([]);
  const [uploadedProfileImage, setUploadedProfileImage] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<Array<any>>([]);
  const [portfolioImages, setPortfolioImages] = useState<Array<any>>([]);
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);

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

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e?.target.files);
    const formData = new FormData();
  
    files.forEach((file) => {
      formData.append("files", file);
    });
    setUploadedProfileImage(files[0]);

    try {
      const res = await editProfileImageMutation.mutateAsync(formData);
      if(res?.data) {
        localStorage.setItem("thumbnailImage", res.data);
      }
    } catch (err) {
      console.log(err)
    }
  };

  const editProfileImageMutation = useMutation(editProfileImage);
  const editProfileDetailsMutation = useMutation(editProfileDetails);

  const submitProfileDetails = async () => {
    try {
      const res = await editProfileDetailsMutation.mutateAsync({
        ...profileForm,
        contact: {
          countryCode,
          number: profileForm?.contact
        },
        services: servicesList
      });
      setShowEditAccountDetailsModal(false);
      dispatchAlert({
        type: "SUCCESS",
        message: "Profile details edited successfully."
      });
      if(res) {
        refetchProfile();
      }
    } catch(err) {
      console.log(err);
    }
  };

  const submitForm = async () => {
    setIsLoadingForm(true);
    try {
      await submitProfileDetails();
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoadingForm(false);
      setGalleryImages([]);
      setPortfolioImages([]);
      refetchProfile();
      dispatchAlert({
        type: "SUCCESS",
        message: "Profile edited successfully"
      });
    }
  };

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
    if(profile) {
      setProfileForm(prev => ({
        ...prev,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        contact: profile?.contact?.number,
        about: profile?.coachingDetails?.about,
        profileImage: profile?.profileImage?.thumbnailImage,
        portfolioImages,
        galleryImages
      }));
    }
  }, [profile]);

  useEffect(() => {
    if(coachingServices?.length) {
      setServicesList(coachingServices);
    }
  }, [coachingServices]);

  return (
    <div className="profile-page">
      <Header
        pageTitle="Profile"
        showActionButtons
        handleSubmit={submitForm}
        isLoading={isLoadingForm}
      />
      <div className="profile">
        <AccountDetails
          profileForm={profile}
          setProfileForm={setProfileForm}
          uploadedProfileImage={uploadedProfileImage}
          handleFileChange={handleFileChange}
          setShowEditAccountDetailsModal={setShowEditAccountDetailsModal}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
        />
        <PermissionAccess roleAccess="Coach">
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
            onClose={() => setShowEditAccountDetailsModal(false)}
            profileForm={profileForm}
            setProfileForm={setProfileForm}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            handleSubmit={submitProfileDetails}
          />
        )}
      </div>
    </div>
  );
};