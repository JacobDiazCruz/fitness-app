import { 
  getRequest, 
  postRequestv2,
  putRequestv2
} from ".";

export const addCoachingService = async (data: any) => {
  const payload = {
    url: `/coaching/services/add`,
    data
  };

  const { res, err }: any = await postRequestv2(payload);
  if(err) {
    throw err.response.data;
  };
  return res.data.data;
};

export const editCoachingService = async (profileId: string, data: any) => {
  const payload = {
    url: `/coaching/services/add/${profileId}`,
    data
  };

  const { res, err }: any = await putRequestv2(payload);
  if(err) {
    throw err.response.data;
  };
  return res.data.data;
};

export const getCoachingServices = async (profileId: string) => {
  const payload = {
    url: `/coaching/services/get/${profileId}`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};