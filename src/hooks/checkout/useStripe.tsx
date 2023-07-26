import { createStripeCheckoutSession } from '@/api/Checkout';
import useAlert from '@/contexts/Alert';
import { ResponseError } from '@/utils/types';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from 'react-query';

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

  const handleStripeCheckout = async (planDetails: any) => {
    const stripe = await getStripe();
    const session = await createStripeCheckoutSessionMutation.mutateAsync({
      totalPrice: planDetails.totalPrice,
      coachDetails: {
        name: planDetails.fullName,
        email: planDetails.email,
        thumbnailImage: planDetails.thumbnailImage
      }
    });
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id
    });
    console.warn(error.message);
  }

  return {
    handleStripeCheckout
  }
};