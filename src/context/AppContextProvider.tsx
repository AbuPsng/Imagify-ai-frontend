import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import {
  AuthResponseDataType,
  AuthResponseType,
  ImageResponseDataType,
} from "../types";
import { useNavigate } from "react-router-dom";

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [credit, setCredit] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const tokenInLocal = localStorage.getItem("token");
    if (tokenInLocal) {
      setToken(tokenInLocal);
    }
  }, []);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleGenerateImage = async (prompt: string) => {
    if (credit && credit <= 0) {
      toast.error("No credit balance");
      return navigate("/buy");
    }
    try {
      const { data }: { data: ImageResponseDataType } = await axios.post(
        `${backendUrl}/image/generate-image`,
        { prompt },
        {
          headers: {
            token,
          },
        }
      );

      if (data.message?.success) {
        loadCreditsData();
        toast.success("Image created successfully");
        return data?.message?.resultImage;
      } else {
        toast.error(data.message.message);
        loadCreditsData();
      }
    } catch (error) {
      toast.error("Error while generating image");
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredit(undefined);
  };

  const loadCreditsData = async () => {
    try {
      const { data }: { data: AuthResponseDataType } =
        await axios.get<AuthResponseType>(`${backendUrl}/user/credits`, {
          headers: {
            token,
          },
        });

      if (data.success && typeof data.message === "object") {
        setUser(data?.message?.user);
        setCredit(data?.credits);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    token,
    setToken,
    credit,
    setCredit,
    backendUrl,
    loadCreditsData,
    handleGenerateImage,
    handleLogout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
