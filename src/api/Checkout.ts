import axios from "axios";
import { 
  postRequest
} from ".";
  
export const calculateTotalPrice = async ({ 
  planId
}: {
  planId: string
}) => {
  const payload = {
    url: `/checkout/calculate/total`,
    data: { planId }
  };
  const res: any = await postRequest(payload);
  return res.data.data;
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
};

export const createWebhookUrl = async () => {
  const res = await axios({
    method: 'POST',
    url: `https://pg-sandbox.paymaya.com/payments/v1/webhooks`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Basic cGstQkNRNVBsVHJwYVZlQTJrWVdlQmcwWmFPb3p3TGVaN0NOVEVsbkphMjdKQzo='
    },
    data: {
      name: 'AUTHORIZED',
      callbackUrl: 'http://localhost:4000/checkout/maya/webhook'
    }
  });

  return res.data;
}