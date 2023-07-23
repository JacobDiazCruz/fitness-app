import { 
  deleteRequest,
    getRequest, 
    postRequest,
    putRequest
  } from ".";
  
export const addCoachingPlan = async (data: any) => {
  const payload = {
    url: `/coaching/plans/add`,
    data
  };
  const res: any = await postRequest(payload);
  return res.data;
};

export const editCoachingPlan = async ({ planId, data }: { planId: string, data: any }) => {
  const payload = {
    url: `/coaching/plans/edit/${planId}`,
    data
  };
  const res: any = await putRequest(payload);
  return res.data;
};

export const listCoachingPlans = async (userId: string) => {
  const payload = {
    url: `/coaching/plans/list/${userId}`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};

export const getCoachingPlan = async (planId: string) => {
  const payload = {
    url: `/coaching/plans/get/${planId}`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};

export const deleteCoachingPlan = async (planId: string) => {
  const payload = {
    url: `/coaching/plans/delete/${planId}`
  };
  const res = await deleteRequest(payload);
  return res;
};