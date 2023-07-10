import { 
  getRequest, 
  postRequest,
  putRequest
} from ".";

export const addCoachingService = async (data: any) => {
  const payload = {
    url: `/coaching/services/add`,
    data
  };
  const res: any = await postRequest(payload);
  return res.data;
};

export const editCoachingService = async (data: any) => {
  const payload = {
    url: `/coaching/services/edit`,
    data
  };
  const res: any = await putRequest(payload);
  return res.data;
};

export const getCoachingServices = async (profileId: string) => {
  const payload = {
    url: `/coaching/services/get/${profileId}`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};