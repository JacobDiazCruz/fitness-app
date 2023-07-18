import { CalendarSchedule } from "@/utils/calendarTypes";
import { deleteRequest, getRequest, postRequest, putRequest } from ".";
    
interface CreateScheduleParams { 
  data: CalendarSchedule;
  type: string;
};

export const createCalendarSchedule = async ({ data, type }: CreateScheduleParams) => {
  const payload = {
    url: `/calendar/schedule/add?type=${type}`,
    data
  };
  const res = await postRequest(payload);
  return res.data;
};

export const editCalendarSchedule = async ({ id, data }: any) => {
  const payload = {
    url: `/calendar/schedule/edit/${id}`,
    data
  };
  const res = await putRequest(payload);
  return res.data?.data;
};

export const deleteCalendarSchedule = async (id: string) => {
  const payload = {
    url: `/calendar/schedule/delete/${id}`
  };
  const res = await deleteRequest(payload);
  return res;
};

export const listWeeklyCalendarSchedules = async (dates: string) => {
  const payload = {
    url: `/calendar/schedule/list?dates=${dates}`
  };
  try {
    const res = await getRequest(payload);
    if(res.data) {
      return res?.data?.data;
    } else {
      throw new Error(res);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};