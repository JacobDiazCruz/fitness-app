import { 
  getRequest, 
  postRequest,
  putRequest 
} from ".";
  
export const listMessages = async ({ roomId, limit }) => {
  const payload = {
    url: `/message/list?roomId=${roomId}&limit=${limit}`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};