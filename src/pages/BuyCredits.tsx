import axios from "axios";
import { motion } from "motion/react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { assets, plans } from "../constants";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const BuyCredits = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (planId: string) => {
    try {
      if (!appContext?.user) {
        return appContext?.setShowLogin(true);
      }

      const response = await axios.post(
        `${appContext?.backendUrl}/user/pay`,
        { planId },
        {
          headers: {
            token: appContext?.token,
            "Content-Type": "application/json",
          },
        }
      );

      const clientSecret = response?.data?.message?.clientSecret;
      if (clientSecret) {
        navigate("/pay", { state: clientSecret });
      } else {
        toast.error("Client secret not received.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while processing the payment.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6 ">
        Our Plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose the plan
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item) => (
          <div
            key={item.id}
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 max-w-[250px] text-gray-600 hover:scale-[1.05] transition-all duration-300 "
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">{item.price}</span>/
              {item.credits} credits
            </p>
            <button
              onClick={() => handleSubmit(item.id)}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-44"
            >
              {appContext?.user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredits;
