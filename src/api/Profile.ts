import { getRequest, patchRequest } from ".";

export const getProfile = async ({ 
  userId = "",
  profileId = "" 
}: { 
  userId?: string | null;
  profileId?: string | null;
}) => {
  const payload = {
    url: `/profile/get?userId=${userId}&profileId=${profileId}`
  };
  const res = await getRequest(payload);
  return res.data.data;
};

export const getProfileById = async ({ profileId = null }: { profileId: string | null }) => {
  const payload = {
    url: `/profile/get/${profileId}`
  };
  const res = await getRequest(payload);
  return res.data.data;
};

export const listCoaches = async () => {
  const payload = {
    url: `/profile/coaches/list`
  };
  const res = await getRequest(payload);
  return res.data.data;
};

export const editProfileDetails = async (data) => {
  const payload = {
    url: `/profile/details/edit`,
    data
  };
  const res = await patchRequest(payload);
  return res.data;
};

export const editProfileImage = async (data) => {
  let accessToken = localStorage.getItem("accessToken");
  const payload = {
    url: `/profile/upload-image`,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${accessToken}`
    },
    data
  };
  const res = await patchRequest(payload);
  return res.data;
};

export const editPortfolioImages = async (data) => {
  let accessToken = localStorage.getItem("accessToken");
  const payload = {
    url: `/profile/portfolio/edit`,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${accessToken}`
    },
    data
  };
  const res = await patchRequest(payload);
  return res.data;
};

export const editGalleryImages = async (data) => {
  let accessToken = localStorage.getItem("accessToken");
  const payload = {
    url: `/profile/gallery/edit`,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${accessToken}`
    },
    data
  };
  const res = await patchRequest(payload);
  return res.data;
};

export const getCoachProfile = async (profileId) => {
  const payload = {
    url: `/profile/coach/${profileId}`
  };
  const res = await getRequest(payload);
  return res.data.data;
};

export const becomeCoach = async ({ userId, data }) => {
  const payload = {
    url: `/profile/become-coach/${userId}`,
    data
  };
  const res = await patchRequest(payload);
  return res.data;
};