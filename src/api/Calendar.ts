import { CalendarItem } from "@/utils/calendarTypes";
import { getRequest, postRequest } from ".";
    
export const createCalendarItem = async (data: CalendarItem) => {
  const payload = {
    url: `/calendar/items/add`,
    data
  };
  const res = await postRequest(payload);
  return res.data;
};

export const listWeeklyCalendarItems = async (dates: string) => {
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