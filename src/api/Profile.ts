import { getRequest, patchRequest } from ".";

export const getProfile = async (userId) => {
  const payload = {
    url: `/profile/${userId}`
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