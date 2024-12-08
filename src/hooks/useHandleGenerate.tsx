import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const useHandleGenerator = () => {
  const data = useContext(AppContext);

  const navigate = useNavigate();
  return () => {
    if (data?.user) {
      navigate("/result");
    } else {
      data?.setShowLogin(true);
    }
  };
};
