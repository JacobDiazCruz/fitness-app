'use client';

import { useEffect, useState } from "react";
import Button from "@/components/global/Button";
import TextField from "@/components/global/TextField";
import ManagerLayout from "../ManagerLayout";
import Uploader from "@/components/global/Uploader";
import FormContainer from "./FormContainer";
import Image from 'next/image';
import Header from "@/app/manager/Header";
import { AddIcon } from "@/components/global/Icons";
import useLocalStorage from "@/hooks/useLocalStorage";
import { editGalleryImages, editPortfolioImages, editProfile, editProfileDetails, editProfileImage, getCoachProfile, getProfile } from "@/api/Profile";
import { useMutation, useQuery } from "react-query";
import TextArea from "@/components/global/TextArea";
import AccountDetails from "./AccountDetails";
import MyServices from "./MyServices";
import useAlert from "@/contexts/Alert";
import PermissionAccess from "@/components/global/PermissionAccess";

export interface Form {
  profileImage: string | null;
  firstName: string | null;
  lastName: string | null;
  contact: string | null;
};

export interface Services {
  title: string | null;
  description: string | null;
  price: number | null;
};

export default function Profile() {
  const { dispatchAlert } = useAlert();
  const userId = useLocalStorage('userId');
  const [enableAccountEdit, setEnableAccountEdit] = useState(false);
  const [countryCode, setCountryCode] = useState<string>("+63");
  const [profileForm, setProfileForm] = useState<Form>({
    profileImage: null,
    firstName: null,
    lastName: null,
    contact: null
  });
  const [servicesList, setServicesList] = useState<Services[]>([
    {
      title: "",
      description: "",
      price: null
    }
  ]);
  const [uploadedProfileImage, setUploadedProfileImage] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<Array<any>>([]);
  const [portfolioImages, setPortfolioImages] = useState<Array<any>>([]);
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);

  // existing images
  const [existingGalleryImages, setExistingGalleryImages] = useState<Array<string>>([]);
  const [existingPortfolioImages, setExistingPortfolioImages] = useState<Array<string>>([]);

  // get exercise data
  const {
    isLoading,
    isError,
    data: profile,
    error,
    refetch
  } = useQuery('profile', () => getProfile({ userId: localStorage?.getItem("userId") }), {
    refetchOnMount: true
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
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
  const editPortfolioImagesMutation = useMutation(editPortfolioImages);
  const editGalleryImagesMutation = useMutation(editGalleryImages);

  const submitPortfolioImages = async () => {
    try {
      const formData = new FormData();
      portfolioImages.forEach((file) => {
        formData.append('files', file);
      });
      existingPortfolioImages.forEach((file) => {
        formData.append('existingFiles', file);
      });
      const res = await editPortfolioImagesMutation.mutateAsync(formData);
    } catch(err) {
      console.log(err);
    }
  };

  const submitGalleryImages = async () => {
    try {
      const formData = new FormData();
      galleryImages.forEach((file) => {
        formData.append('files', file);
      });
      existingGalleryImages.forEach((file) => {
        formData.append('existingFiles', file);
      });
      const res = await editGalleryImagesMutation.mutateAsync(formData);
    } catch(err) {
      console.log(err);
    }
  };

  const submitProfileDetails = async () => {
    try {
      const res = await editProfileDetailsMutation.mutateAsync({
        ...profileForm,
        contact: {
          countryCode,
          number: profileForm?.contact
        },
        services: servicesList
      })
    } catch(err) {
      console.log(err);
    }
  };

  const submitForm = async () => {
    setIsLoadingForm(true);
    try {
      await submitProfileDetails();
      await submitGalleryImages();
      await submitPortfolioImages();
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoadingForm(false);
      setGalleryImages([]);
      setPortfolioImages([]);
      refetch();
      dispatchAlert({
        type: "SUCCESS",
        message: "Profile edited successfully"
      });
    }
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
      setServicesList(profile?.coachingDetails?.services);
      setExistingGalleryImages(profile?.coachingDetails?.galleryImages);
      setExistingPortfolioImages(profile?.coachingDetails?.portfolioImages);
    }
  }, [profile]);

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
          profileForm={profileForm}
          setProfileForm={setProfileForm}
          uploadedProfileImage={uploadedProfileImage}
          handleFileChange={handleFileChange}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
        />
        <PermissionAccess roleAccess="Coach">
          <MyServices
            servicesList={servicesList}
            setServicesList={setServicesList}
          />
          <div className="flex gap-[30px]">
            <div className="flex-1">
              <FormContainer
                formTitle="Gallery"
                formIcon={<svg t="1685420066688" class="m-auto icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2413" width="30" height="30"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z" p-id="2414" fill="#ffffff"></path><path d="M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z" p-id="2415" fill="#ffffff"></path></svg>}
                formDescription="This will be displayed in a carousel at the top of your profile."
              >
                <Uploader 
                  id="gallery-uploader"
                  max={5}
                  initialFilesList={galleryImages}
                  existingFilesList={existingGalleryImages}
                  setExistingFilesList={setExistingGalleryImages}
                  setInitialFilesList={setGalleryImages}
                />
              </FormContainer>
            </div>
            <div className="flex-1">
              <FormContainer
                formTitle="Portfolio"
                formIcon={<svg t="1685420066688" class="m-auto icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2413" width="30" height="30"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z" p-id="2414" fill="#ffffff"></path><path d="M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z" p-id="2415" fill="#ffffff"></path></svg>}
                formDescription="Upload images of your client's transformation"
              >
                <Uploader
                  id="portfolio-uploader"
                  max={6}
                  initialFilesList={portfolioImages}
                  setInitialFilesList={setPortfolioImages}
                  existingFilesList={existingPortfolioImages}
                  setExistingFilesList={setExistingPortfolioImages}
                />
              </FormContainer>
            </div>
          </div>
        </PermissionAccess>
      </div>
    </div>
  );
}