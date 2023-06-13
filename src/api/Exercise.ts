import { getRequest, postRequest } from ".";

export const addExercise = async (data) => {
  const payload = {
    url: `/exercise/add`,
    data
  };
  const res = await postRequest(payload);
  return res.data;
};

export const listExercises = async () => {
  const payload = {
    url: `/exercise/list`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};

export const uploadFiles = async (data) => {
  let accessToken = localStorage.getItem("accessToken");
  const payload = {
    url: `/exercise/files/upload`,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${accessToken}`
    },
    data
  };
  const res = await postRequest(payload);
  return res.data;
};