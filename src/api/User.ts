import { getRequest, postRequest } from ".";

export const loginGoogle = async (data) => {
  const payload = {
    url: `/user/login/google`,
    data
  };
  const res = await postRequest(payload);
  return res.data.data;
};

export const logoutUser = async (data) => {
  const payload = {
    url: `/user/logout`,
    data
  };
  const res = await postRequest(payload);
  return res.data;
};

export const verifyUserToken = async () => {
  const payload = {
    url: `/user/verify-access`
  };
  try {
    const res = await getRequest(payload);
    if(!res.data) throw new Error("Failed to verify user token.");
    
    return res.data.data;
  } catch (err: any) {
    throw new Error(err);
  }
};