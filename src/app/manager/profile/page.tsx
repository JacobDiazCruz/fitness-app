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
import { editProfileImage, getCoachProfile, getProfile } from "@/api/Profile";
import { useMutation, useQuery } from "react-query";
import TextArea from "@/components/global/TextArea";
import AccountDetails from "./AccountDetails";
import MyServices from "./MyServices";

export interface Form {
  profileImage: string | null;
  firstName: string | null;
  lastName: string | null;
  contact: string | null;
}

export interface Services {
  title: string | null;
  description: string | null;
  price: number | null;
}

export default function Profile() {
  const userId = useLocalStorage('userId');
  const [enableAccountEdit, setEnableAccountEdit] = useState(false);
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
  const [uploadedProfileImage, setUploadedProfileImage] = useState<any>("");

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

  // edit profile image mutation
  const editProfileImageMutation = useMutation(editProfileImage, {
    onSuccess: async (data) => {
      return data;
    },
    onError: (err) => {
      console.log(err);
    }
  });

  useEffect(() => {
    if(profile) {
      setProfileForm(prev => ({
        ...prev,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        profileImage: profile?.profileImage?.thumbnailImage
      }));
    }
  }, [profile]);

  return (
    <div className="profile-page">
      <Header
        pageTitle="Profile"
        showActionButtons
      />
      <div className="profile">
        <AccountDetails 
          profileForm={profileForm}
          setProfileForm={setProfileForm}
          uploadedProfileImage={uploadedProfileImage}
          handleFileChange={handleFileChange}
        />
        <MyServices
          servicesList={servicesList}
          setServicesList={setServicesList}
        />
        <FormContainer
          formTitle="Gallery"
          formIcon={<svg t="1685420066688" class="m-auto icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2413" width="30" height="30"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z" p-id="2414" fill="#ffffff"></path><path d="M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z" p-id="2415" fill="#ffffff"></path></svg>}
          formDescription="The images that will be uploaded here will be displayed in a carousel at the top of your profile."
        >
          <Uploader />
        </FormContainer>
      </div>
    </div>
  );
}