import { 
  getRequestv2
} from ".";

export const listOrders = async () => {
  const payload = {
    url: `/orders/list`
  };

  const { res, err }: any = await getRequestv2(payload);
  if(err) {
    throw err.response.data;
  };
  return res.data.data;
};