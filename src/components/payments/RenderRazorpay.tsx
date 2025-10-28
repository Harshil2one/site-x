import { useEffect, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTE } from "../../enums";
import { emptyCartItems } from "../../redux/actions/cart";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface IProps {
  orderDetails: {
    method: string;
    amount: number;
    orderId: string;
  };
  displayRazor: boolean;
  onFailure: (error: any) => void;
}

const loadScript = (src: any) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const RenderRazorpay = ({ orderDetails, displayRazor, onFailure }: IProps) => {
  const { orderId, amount, method } = orderDetails;
  const paymentId = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      console.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount * 100,
      name: "Bigbite",
      description: "Order Payment",
      order_id: orderId,
      method: {
        card: method === "card",
        netbanking: method === "netbanking",
        wallet: method === "wallet",
        paylater: method === "paylater",
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.contact,
      },
      handler: async function (response: any) {
        const data = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        try {
          await axiosInstance.post("/orders/capturePayment", data, {
            headers: {
              "x-razorpay-signature": import.meta.env.VITE_RAZORPAY_KEY_SECRET,
            },
          });
          navigate(PUBLIC_ROUTE.HOME);
          setTimeout(() => {
            dispatch(emptyCartItems(user.id));
          }, 1000);
        } catch (error: any) {
          console.error("Verification failed", error);
          onFailure(error?.metadata);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", (response: any) => {
      paymentId.current = response.error.metadata.payment_id;
      console.error("Payment failed:", response.error);
      onFailure(response?.error?.metadata);
    });

    rzp1.open();
  };

  useEffect(() => {
    displayRazor && displayRazorpay();
  }, [displayRazor]);

  return null;
};

export default RenderRazorpay;
