import { 
  postRequest, postRequestv2
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

export const createStripeCheckoutSession = async (data: any) => {
  const payload = {
    url: `/checkout/stripe/create-session`,
    data
  };

  const { res, err }: any = await postRequestv2(payload);
  if(err) {
    throw err.response.data;
  };
  return res.data.data;
};

export const createStripeCustomer = async (data: any) => {
  const payload = {
    url: `/checkout/stripe/create-customer`,
    data
  };

  const { res, err }: any = await postRequestv2(payload);
  if(err) {
    throw err.response.data;
  };
  return res.data.data;
};

export const createTransaction = async () => {
  const payload = {
    url: `/checkout/create/transaction`
  };
  const res: any = await postRequest(payload);
  return res.data.data;
}