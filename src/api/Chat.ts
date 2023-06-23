import { getRequest } from ".";
    
export const listChats = async () => {
  const payload = {
    url: `/chats/list`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};

export const getChat = async (roomId) => {
  const payload = {
    url: `/chat/${roomId}`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};