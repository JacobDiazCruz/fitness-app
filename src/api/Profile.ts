import { getRequest } from ".";

export const getProfile = async (userId) => {
  const payload = {
    url: `/profile/${userId}`
  };
  const res = await getRequest(payload);
  return res.data.data;
};