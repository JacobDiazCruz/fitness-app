import { 
  getRequest, 
  postRequest,
  putRequest 
} from ".";

export const addProgram = async (data) => {
  const payload = {
    url: `/program/add`,
    data
  };
  const res = await postRequest(payload);
  return res.data;
};

export const editProgram = async ({ id, data }) => {
  const payload = {
    url: `/program/edit/${id}`,
    data
  };
  const res = await putRequest(payload);
  return res.data;
};

export const listPrograms = async () => {
  const payload = {
    url: `/program/list`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};

export const getProgram = async (id) => {
  const payload = {
    url: `/program/${id}`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};