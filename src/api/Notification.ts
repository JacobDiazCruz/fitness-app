import { 
  getRequestv2, patchRequest, patchRequestv2
} from ".";

export const listNotifications = async () => {
  const payload = {
    url: `/notifications/list`
  };

  const { res, err }: any = await getRequestv2(payload);
  if(err) {
    throw err.response.data;
  };
  return res.data.data;
};

export const editNotifOrderStatus = async (data: any) => {
  const payload = {
    url: `/notifications/edit/order-status`,
    data
  };

  const { res, err }: any = await patchRequestv2(payload);
  if(err) {
    throw err.response.data;
  };
  return res.data.data;
};