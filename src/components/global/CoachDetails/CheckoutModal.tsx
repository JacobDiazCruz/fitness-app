import { borderColor, primaryTextColor, secondaryBgColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import Button from "../Button";
import IconButton from "../IconButton";
import { IoMdClose } from "react-icons/io";
import useStripe from "@/hooks/checkout/useStripe";
import QuantityField from "../QuantityField";
import { useEffect, useState } from "react";
import FieldName from "../FieldName";
import Big from "big.js";

interface Props {
  onClose: () => void;
  selectedPlan: any;
  email: string;
  thumbnailImage: string;
  fullName: string;
};

export default function CheckoutModal({
  onClose,
  email,
  thumbnailImage,
  fullName,
  selectedPlan
}: Props) {

  const {
    handleStripeCheckout
  } = useStripe();

  const totalPrice = selectedPlan.totalPrice.value;
  const [sessionQuantity, setSessionQuantity] = useState<number>(30);
  const [currentTotalPrice, setCurrentTotalPriceValue] = useState<any>(0);

  useEffect(() => {
    if(!sessionQuantity) return 0;

    const bigTotalPrice = Big(totalPrice);
    const bigSessionsQuantity = Big(sessionQuantity);
    const total = bigTotalPrice.times(bigSessionsQuantity);
  
    const fifteenPercent = Big(0.15); // 15% represented as 0.15
    const totalPriceWith15Percent = total.times(fifteenPercent).plus(total);
  
    // Round off the total price to 2 decimal places
    const roundedTotalPrice = totalPriceWith15Percent.round(2);
  
    // Convert the total price to a string without cents
    const totalWithoutCents = roundedTotalPrice.toFixed(0);
  
    setCurrentTotalPriceValue(totalWithoutCents);

    return(() => {
      setCurrentTotalPriceValue(0);
    })
  }, [sessionQuantity]);

  const submitCheckout = () => {
    handleStripeCheckout({ 
      ...selectedPlan,
      sessionQuantity,
      totalPrice: {
        currency: "PHP",
        value: currentTotalPrice
      },
      fullName,
      thumbnailImage,
      email
    });
  };

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
          </div>
          <div className={`${secondaryTextColor} flex items-center mt-2`}>
            <div className={`${secondaryTextColor} text-[18px] font-light mr-2`}>
              &#x20B1; {selectedPlan?.totalPrice.value}
            </div>
            <div className={`${tertiaryTextColor} text-[14px]`}>/ session</div>
          </div>
          <div className={`${secondaryTextColor} mt-8 text-[16px] w-[130px]`}>
            <FieldName>
              Sessions Quantity
            </FieldName>
            <QuantityField
              value={sessionQuantity}
              onChange={(value: any) => setSessionQuantity(value)}
            />
          </div>
        </div>
        <div className={`${borderColor} border-t absolute bottom-0 py-8 px-6 w-full`}>
          <ul className="mb-5 text-[14px]">
            <li className={`${tertiaryTextColor} flex items-center justify-between py-2`}>
              <p className={`${secondaryTextColor} font-light`}>Subtotal</p>
              <p className={`${primaryTextColor} font-normal`}>
                PHP {currentTotalPrice}
              </p>
            </li>
            <li className={`flex items-center justify-between py-2`}>
              <p className={`${secondaryTextColor} font-light`}>Total</p>
              <p className={`${primaryTextColor} font-semibold`}>
                PHP {currentTotalPrice}
              </p>
            </li>
          </ul>
          <Button
            className="w-full"
            onClick={submitCheckout}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};