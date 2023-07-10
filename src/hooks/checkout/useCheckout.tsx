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
   * @param orderOptions 
   * @return totalPrice
   */
  const getServerTotalPrice = async (orderOptions: any) => {
    try {
      const totalPrice = await calculateTotalPriceMutation.mutateAsync({
        selectedOrders: orderOptions.filter((option: any) => option.isSelected)
      });
      return totalPrice;
    } catch(err) {
      console.log(err);
    }
  };

  /**
   * @purpose To checkout and get redirected on maya payment url
   * @param orderOptions 
   */
  const submitCheckout = async (orderOptions: any) => {
    try {
      const totalPrice = await getServerTotalPrice(orderOptions);
      
      const items = orderOptions
        .filter((option: any) => option.isSelected)
        .map((option: any) => ({
          amount: {
            value: option.price,
            details: {
              subtotal: option.price
            }
          },
          name: option.title,
          quantity: 1,
          totalAmount: {
            value: option.price
          }
        }));

      const payload = {
        buyer: {
          firstName,
          lastName
        },
        items,
        redirectUrl: {
          cancel: "https://developer-demos.maya.ph/checkout-demo/purchase/canceled?id=2409a31b-8817-411b-9b86-a52813142004",
          failure: "https://developer-demos.maya.ph/checkout-demo/purchase/failed?id=2409a31b-8817-411b-9b86-a52813142004",
          success: "https://developer-demos.maya.ph/checkout-demo/purchase/success?id=2409a31b-8817-411b-9b86-a52813142004"
        },
        requestReferenceNumber: "2409a31b-8817-411b-9b86-a52813142004",
        totalAmount: {
          currency: "PHP",
          value: totalPrice
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