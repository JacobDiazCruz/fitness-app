import axios from "axios";
import { 
  postRequest
} from ".";
  
export const calculateTotalPrice = async ({ 
  selectedOrders
}: {
  selectedOrders: any
}) => {
  const payload = {
    url: `/checkout/calculate/total`,
    data: selectedOrders
  };
  const res: any = await postRequest(payload);
  return res.data.data?.totalPrice;
};

export const mayaCheckout = async (data: any) => {
  const res = await axios({
    method: 'POST',
    url: `https://pg-sandbox.paymaya.com/checkout/v1/checkouts`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Basic cGstQkNRNVBsVHJwYVZlQTJrWVdlQmcwWmFPb3p3TGVaN0NOVEVsbkphMjdKQzo='
    },
    data
  })
  return res.data;
}