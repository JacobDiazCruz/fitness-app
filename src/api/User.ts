import { postRequest } from ".";

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