import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AppContextType } from "../types";
import { AppContext } from "../context/AppContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const appContext = useContext<AppContextType | undefined>(AppContext);

  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    console.log(elements, "element");
    console.log(stripe, "stripe");

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONTEND_SERVER}/result`,
        payment_method_data: {
          billing_details: {
            name: appContext?.user?.name,
            email: "night@gmail.com",
            address: {
              line1: "kana line 1",
              line2: "kana line 1",
              city: "Shillong",
              state: "Meghalaya",
              postal_code: "793001",
              country: "IN",
            },
          },
        },
      },
      redirect: "if_required",
    });

    console.log(paymentIntent, "paymentIntern");

    if (error) {
      console.log(error);
      setIsProcessing(false);
      return toast.error(error.message || "Something went wrong");
    }

    if (paymentIntent.status === "succeeded") {
      console.log("Placing order");
      appContext?.loadCreditsData();
      toast.success("Credit purchase successfully");
      navigate("/result");
    }

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen flex items-center  justify-center">
      <form onSubmit={submitHandler}>
        <PaymentElement />

        <button
          className="bg-black text-white w-full mt-6 py-4 rounded-md"
          type="submit"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

const Checkout = () => {
  const location = useLocation();

  console.log(stripePromise);

  const clientSecret: string | undefined = location.state;

  if (!clientSecret) return <Navigate to="/shipping" />;

  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
