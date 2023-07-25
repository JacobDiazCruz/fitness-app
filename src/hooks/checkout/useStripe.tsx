import { loadStripe } from '@stripe/stripe-js';

export default function useStripe() {
  let stripePromise: any;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe("pk_test_51DO2SyBldNc76AkjLrOxc9zCM3Pt1Kxi5T2FVdPZE7wrP5F2xeRLFO5mNY9jegMkWOpltnglOouINVwxLaSkYIFL00jcnVLUnx");
    }
    return stripePromise;
  };

  const handleStripeCheckout = async () => {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1NXi8pBldNc76AkjYMQio6xj",
          quantity: 1,
        },
      ],
      mode: 'subscription',
      successUrl: `http://localhost:3000/checkout/payment/success`,
      cancelUrl: `http://localhost:3000/checkout/payment/canceled`,
      customerEmail: localStorage?.getItem("email") ?? ""
    });
    console.warn(error.message);
  }

  return {
    handleStripeCheckout
  }
};