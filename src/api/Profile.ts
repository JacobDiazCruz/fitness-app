import { getRequest, patchRequest } from ".";

export const getProfile = async (userId) => {
  const payload = {
    url: `/profile/${userId}`
  };
  const res = await getRequest(payload);
  return res.data.data;
};

export const becomeCoach = async ({ profileId, data }) => {
  const payload = {
    url: `/profile/${profileId}`,
    data
  };
  const res = await patchRequest(payload);
  return res.data;
};