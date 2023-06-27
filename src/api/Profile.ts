import { getRequest, patchRequest } from ".";

export const getProfile = async () => {
  const payload = {
    url: `/profile/get`
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