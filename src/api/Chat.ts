import { getRequest } from ".";
    
export const listChats = async () => {
  const payload = {
    url: `/chat/list`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};

export const getChat = async (roomId) => {
  const payload = {
    url: `/chat/${roomId}`
  };
  try {
    const res = await getRequest(payload);
    if(res.data) {
      return res?.data?.data;
    } else {
      throw new Error(res);
    }
  } catch (error) {
    throw new Error(error);
  }
};