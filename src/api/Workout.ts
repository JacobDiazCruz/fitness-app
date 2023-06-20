import { 
  getRequest, 
  postRequest,
  putRequest 
} from ".";

export const addWorkout = async (data) => {
  const payload = {
    url: `/workout/add`,
    data
  };
  const res = await postRequest(payload);
  return res.data;
};

export const editWorkout = async ({ id, data }) => {
  const payload = {
    url: `/workout/edit/${id}`,
    data
  };
  const res = await putRequest(payload);
  return res.data;
};

export const listWorkouts = async () => {
  const payload = {
    url: `/workout/list`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};

export const getWorkout = async (id) => {
  const payload = {
    url: `/workout/${id}`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};