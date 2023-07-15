import { CalendarSchedule } from "@/utils/calendarTypes";
import { getRequest, postRequest } from ".";
    
interface CreateScheduleParams { 
  data: CalendarSchedule;
  type: string;
};

export const createCalendarSchedule = async ({ data, type }: CreateScheduleParams) => {
  const payload = {
    url: `/calendar/items/add?type=${type}`,
    data
  };
  const res = await postRequest(payload);
  return res.data;
};

export const listWeeklyCalendarSchedules = async (dates: string) => {
  const payload = {
    url: `/calendar/items/list?dates=${dates}`
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