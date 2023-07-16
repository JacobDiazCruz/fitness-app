import { 
  getRequest, 
  patchRequest, 
  postRequest,
  putRequest 
} from ".";

export const addProgram = async (data) => {
  const payload = {
    url: `/program/add`,
    data
  };
  const res = await postRequest(payload);
  return res.data;
};

export const addProgramWorkouts = async (data) => {
  const payload = {
    url: `/program/workouts/add`,
    data
  };
  const res = await postRequest(payload);
  return res.data;
};

export const listProgramWorkouts = async ({
  programId,
  weekId
}: {
  programId: string,
  weekId: string
}) => {
  const payload = {
    url: `/program/workouts/list?programId=${programId}&weekId=${weekId}`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};

export const editProgramWorkout = async ({
  id,
  data
}: {
  id?: string;
  data?: any;
}) => {
  const payload = {
    url: `/program/workouts/edit/${id}`,
    data
  };
  const res = await putRequest(payload);
  return res.data;
};

export const assignProgramToClient = async ({ id, client }) => {
  const payload = {
    url: `/program/assign/${id}`,
    data: client
  };
  const res = await patchRequest(payload);
  return res.data;
};

export const editProgram = async ({ id, data }) => {
  const payload = {
    url: `/program/edit/${id}`,
    data
  };
  const res = await putRequest(payload);
  return res.data;
};

export const listPrograms = async (type) => {
  const payload = {
    url: type ? `/program/list?type=${type}` : `/program/list/`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};

export const getProgram = async (id) => {
  const payload = {
    url: `/program/${id}`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};

export const getProgramWorkout = async (id: string) => {
  const payload = {
    url: `/program/workout/${id}`
  };
  const res = await getRequest(payload);
  return res.data?.data;
};