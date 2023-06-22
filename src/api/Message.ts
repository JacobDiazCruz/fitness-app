import { 
  getRequest, 
  postRequest,
  putRequest 
} from ".";
  
export const listMessages = async (roomId) => {
  const payload = {
    url: `/messages/list/${roomId}`
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