import { createStripeCheckoutSession, createStripeCustomer } from '@/api/Checkout';
import { getProfile } from '@/api/Profile';
import useAlert from '@/contexts/Alert';
import { ResponseError } from '@/utils/types';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation, useQuery } from 'react-query';

export default function useStripe() {
  let stripePromise: any;

  const {
    dispatchAlert
  }: any = useAlert();

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe("pk_test_51DO2SyBldNc76AkjLrOxc9zCM3Pt1Kxi5T2FVdPZE7wrP5F2xeRLFO5mNY9jegMkWOpltnglOouINVwxLaSkYIFL00jcnVLUnx");
    }
    return stripePromise;
  };

  const createStripeCheckoutSessionMutation = useMutation(createStripeCheckoutSession, {
    onError: (err: ResponseError) => {
      dispatchAlert({
        type: "ERROR",
        message: err.message
      })
    }
  });

  // fetch coach profile
  const { 
    data: customerProfile
  } = useQuery('customerProfile', () => getProfile({ userId: localStorage?.getItem("userId") }), {
    refetchOnMount: true
  });

  const handleStripeCheckout = async (planDetails: any) => {
    const stripe = await getStripe();
    // 1. create customer first
    // const customer = await createStripeCustomerMutation.mutateAsync({
    //   email: customerProfile?.email,
    //   name: `${customerProfile?.firstName} ${customerProfile?.lastName}`,
    //   metadata: {
    //     userId: customerProfile?.userId,
    //     profileId: customerProfile?._id
    //   }
    // });

    // 2. create invoice
    // 3. create checkout session
    const session = await createStripeCheckoutSessionMutation.mutateAsync({
      planId: planDetails._id,
      sessionQuantity: planDetails.sessionQuantity,
      coachDetails: {
        name: planDetails.fullName,
        email: planDetails.email,
        thumbnailImage: planDetails.thumbnailImage,
        userId: planDetails.ownerId
      },
      customerDetails: {
        name: `${customerProfile?.firstName} ${customerProfile?.lastName}`,
        email: customerProfile?.email,
        userId: customerProfile?.userId,
        profileId: customerProfile?._id
      }
    });
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id
    });
    console.warn(error.message);
  };

  return {
    handleStripeCheckout
  }
};