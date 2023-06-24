import { 
  getRequest, 
  postRequest,
  putRequest 
} from ".";

export const addClient = async (data) => {
  const payload = {
    url: `/client/add`,
    data
  };
  const res = await postRequest(payload);
  return res.data;
};

export const listClients = async () => {
  const payload = {
    url: `/client/list`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};