import { postRequest } from ".";

export const loginGoogle = async (data) => {
  console.log("loginGoogledata", data);
  const payload = {
    url: `/user/login/google`,
    data
  };
  const res = await postRequest(payload);
  return res.data;
};

export const logout = async (data) => {
  console.log("logoutdata", data);
  const payload = {
    url: `/user/logout`,
    data
  };
  const res = await postRequest(payload);
  return res.data;
};