import Button from "@/components/global/Button";
import { CheckIcon } from "@/components/global/Icons";
import useCheckout from "@/hooks/checkout/useCheckout";
import Big from "big.js";
interface Props {
  selectedPlan: any;
  orderOptions: any;
}

export default function CheckoutContainer({
  selectedPlan,
  orderOptions = []
}: Props) {

  const {
    isLoadingCheckout,
    submitCheckout
  } = useCheckout();

  /**
   * @purpose To calculate total price and display it in the client
   * @returns total price
   * @note This is only for displaying purposes.
   */
  const getClientTotalPrice = () => {
    let totalPrice = new Big(0);
    
    orderOptions.map((service: any) => {
      if(service.isSelected) {
        const price = new Big(service.price.value);
        totalPrice = totalPrice.plus(price);
      }
    });
    return totalPrice.toString();
  };

  const OrderItem = ({ title, price } : { title: string; price: any }) => {
    return (
      <li className="flex justify-between py-2">
        <div className="flex items-center">
          <CheckIcon className="w-6 h-6 fill-green-500" />
          <p className="ml-2">{title}</p>
        </div>
        <p>{price.currency} {price.value}</p>
      </li>
    );
  };

  return (
    <div className="bg-neutral-100 rounded-lg p-8 w-[470px] h-fit sticky top-[5em]">
      <h5 className="font-bold">Checkout</h5>
      <div className="mt-2">
        <ul className="max-w-md space-y-1 list-inside mt-7">
          <li className="flex justify-between py-2">
            <div className="flex items-center">
              <CheckIcon className="w-6 h-6 fill-green-500" />
              <p className="ml-2">{selectedPlan?.name}</p>
            </div>
            <p>
              {selectedPlan?.price.currency} 
              {selectedPlan?.price.value}
            </p>
          </li>
        </ul>
        <hr className="my-2" />
        <ul className="max-w-md space-y-1 list-inside mt-7">
          <li className="flex items-center justify-between py-2">
            <p>Service charge</p>
            <p>PHP 300</p>
          </li>
          <li className="flex items-center justify-between py-2">
            <p className="font-bold">Total</p>
            <p className="font-bold">PHP {getClientTotalPrice()}</p>
          </li>
        </ul>
      </div>
      <Button 
        variant="contained" 
        className="w-full mt-5"
        onClick={() => submitCheckout(orderOptions)}
        loading={isLoadingCheckout}
      >
        Checkout
      </Button>
    </div>
  );
};