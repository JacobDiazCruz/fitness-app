import { borderColor, primaryTextColor, secondaryBgColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import Button from "../Button";
import IconButton from "../IconButton";
import { IoMdClose } from "react-icons/io";
import useCheckout from "@/hooks/checkout/useCheckout";
import { createTransaction, createWebhookUrl } from "@/api/Checkout";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import useStripe from "@/hooks/checkout/useStripe";

interface Props {
  onClose: () => void;
  selectedPlan: any;
  thumbnailImage: string;
  fullName: string;
};

export default function CheckoutModal({
  onClose,
  thumbnailImage,
  fullName,
  selectedPlan
}: Props) {

  const router = useRouter();

  const { 
    submitCheckout,
    isLoadingCheckout
  } = useCheckout();

  const {
    handleStripeCheckout
  } = useStripe();

  return (
    <>
      <div
        className="fixed inset-0 w-full h-full dark:dark:bg-neutral-600 bg-darkTheme-950 opacity-70 z-[600]"
        onClick={onClose}
      ></div>
      <div className={`${secondaryBgColor} ${borderColor} z-[700] border w-[400px] fixed top-0 right-0 h-[100vh]`}>
        <div className={`${borderColor} border-b sticky top-0 px-6 py-4 w-full flex items-center justify-between`}>
          <div className={`${secondaryTextColor} text-[18px] font-semibold`}>
            Checkout
          </div>
          <IconButton onClick={onClose}>
            <IoMdClose className={`${secondaryTextColor} w-5 h-5`}/>
          </IconButton>
        </div>
        <div className="overflow-auto px-6 py-8">
          <div className="flex gap-[15px] items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src={thumbnailImage}
                className="object-cover w-full h-full"
              />
            </div>
            <div className={`${primaryTextColor} text-[14px]`}>
              {fullName}
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div className={`${primaryTextColor} text-[18px] font-normal`}>
              {selectedPlan?.name}
            </div>
            <div className={`${tertiaryTextColor} text-[18px] font-light`}>
            {selectedPlan?.totalPrice.currency} {selectedPlan?.totalPrice.value}
            </div>
          </div>
          <div className={`${secondaryTextColor} text-[14px] font-light mt-3`}>
            {selectedPlan?.description}            
          </div>
        </div>
        <div className={`${borderColor} border-t absolute bottom-0 py-8 px-6 w-full`}>
          <ul className="mb-5 text-[14px]">
            <li className={`${tertiaryTextColor} flex items-center justify-between py-2`}>
              <p className={`${secondaryTextColor} font-light`}>Subtotal</p>
              <p className={`${primaryTextColor} font-normal`}>PHP {selectedPlan.totalPrice.value}</p>
            </li>
            <li className={`flex items-center justify-between py-2`}>
              <p className={`${secondaryTextColor} font-light`}>Total</p>
              <p className={`${primaryTextColor} font-semibold`}>
                PHP {selectedPlan.totalPrice.value}
              </p>
            </li>
          </ul>
          <Button
            className="w-full"
            loading={isLoadingCheckout}
            onClick={async () => {
              await handleStripeCheckout();
              // await createTransaction();
              // router.push('/checkout/payment/success')
              // submitCheckout(selectedPlan, selectedPlan._id);
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};