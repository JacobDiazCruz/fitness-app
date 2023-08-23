import { 
  getRequest, 
  getRequestv2, 
  postRequest
} from ".";

export const addClient = async (data: any) => {
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

export const getCurrentClientCoaching = async () => {
  const payload = {
    url: `/client/get-coaching-service`
  };

  const { res, err }: any = await getRequestv2(payload);
  if(err) {
    throw err.response.data;
  };
  return res.data.data;
};