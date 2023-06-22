import { 
    getRequest, 
    postRequest,
    putRequest 
  } from ".";
    
  export const listChats = async () => {
    const payload = {
      url: `/chats/list`
    };
    const res = await getRequest(payload);
    return res.data?.data;
  };
  
  // export const getProgram = async (id) => {
  //   const payload = {
  //     url: `/program/${id}`
  //   };
  //   const res = await getRequest(payload);
  //   return res.data?.data;
  // };