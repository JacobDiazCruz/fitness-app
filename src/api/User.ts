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
  try {
    const payload = {
      url: `/user/check-token`
    };
    const res = await getRequest(payload);
    console.log("res.data", res.data);
    // return res.data;
    if(res.data) {
      return res.data;
    } else {
      throw new Error("Failed to verify user token.");
    }
  } catch (error) {
    throw new Error(error);
  }
};