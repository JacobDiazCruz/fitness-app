'use client';

import { calculateTotalPrice, mayaCheckout } from "@/api/Checkout";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import useLocalStorage from "../useLocalStorage";

const useCheckout = () => {
  const router = useRouter();
  const calculateTotalPriceMutation = useMutation(calculateTotalPrice);
  const mayaCheckoutMutation = useMutation(mayaCheckout);

  const firstName = useLocalStorage("firstName");
  const lastName = useLocalStorage("lastName");

  /**
   * @purpose To calculate total price in the server
   * @param planId 
   * @return totalPrice
   */
  const getServerTotalPrice = async (planId: string) => {
    try {
      const totalPrice = await calculateTotalPriceMutation.mutateAsync({
        planId
      });
      return totalPrice;
    } catch(err) {
      console.log(err);
    }
  };

  /**
   * @purpose To checkout and get redirected on maya payment url
   * @param planId 
   */
  const submitCheckout = async (selectedPlan: any, planId: string) => {
    try {
      const serverPriceDetails = await getServerTotalPrice(planId);

      const payload = {
        buyer: {
          firstName,
          lastName
        },
        items: [
          {
            amount: {
              value: selectedPlan.totalPrice.value,
              details: {
                subtotal: selectedPlan.totalPrice.value
              }
            },
            name: selectedPlan.name,
            quantity: 1,
            totalAmount: {
              value: selectedPlan.totalPrice.value
            }
          }
        ],
        redirectUrl: {
          cancel: "http://localhost:3000/checkout/payment/canceled?id=2409a31b-8817-411b-9b86-a52813142004",
          failure: "http://localhost:3000/checkout/payment/failed?id=2409a31b-8817-411b-9b86-a52813142004",
          success: "http://localhost:3000/checkout/payment/success?id=2409a31b-8817-411b-9b86-a52813142004"
        },
        requestReferenceNumber: "2409a31b-8817-411b-9b86-a52813142004",
        totalAmount: {
          currency: "PHP",
          value: serverPriceDetails.totalPrice
        }
      };

      // mutate checkout
      const res = await mayaCheckoutMutation.mutateAsync(payload);
      router.push(res.redirectUrl);
    } catch(err) {
      console.log(err);
    }
  };

  return {
    isLoadingCheckout: mayaCheckoutMutation.isLoading,
    submitCheckout
  };
};

export default useCheckout;