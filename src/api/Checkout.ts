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

export const createStripeCheckoutSession = async () => {
  const payload = {
    url: `/checkout/stripe/create-session`,
    data: {
      test: "value"
    }
  };
  const res: any = await postRequest(payload);
  return res.data.data;
};

export const createTransaction = async () => {
  const payload = {
    url: `/checkout/create/transaction`
  };
  const res: any = await postRequest(payload);
  return res.data.data;
}