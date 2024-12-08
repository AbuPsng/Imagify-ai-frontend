import axios from "axios";
import { motion } from "motion/react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { assets } from "../constants";
import { AppContext } from "../context/AppContext";
import AuthInput from "./AuthInput";
import { AuthResponseDataType, AuthResponseType } from "../types";

const AuthForm = () => {
  const [state, setState] = useState("Login");

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const appContext = useContext(AppContext);

  console.log(appContext, "appcontext for checking url");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const { data }: { data: AuthResponseDataType } =
          await axios.post<AuthResponseType>(
            `${appContext?.backendUrl}/user/login`,
            {
              email,
              password,
            }
          );

        console.log(data, "from auth form");

        if (data.success && typeof data.message === "object") {
          appContext?.setToken(data?.message?.token);
          appContext?.setUser(data?.message?.user);
          localStorage.setItem("token", data?.message?.token);
          appContext?.setShowLogin(false);
          toast.success(`welcome back`);
        } else {
          appContext?.setShowLogin(false);
          if (typeof data.message === "string") {
            toast.error(data?.message);
          }
        }
      } else {
        const { data }: { data: AuthResponseDataType } =
          await axios.post<AuthResponseType>(
            `${appContext?.backendUrl}/user/register`,
            {
              name,
              email,
              password,
            }
          );

        if (data.success && typeof data.message === "object") {
          appContext?.setToken(data?.message?.token);
          appContext?.setUser(data?.message?.user);
          localStorage.setItem("token", data?.message?.token);
          appContext?.setShowLogin(false);
          toast.success(`Welcome`);
        } else {
          appContext?.setShowLogin(false);
          if (typeof data.message === "string") {
            toast.error(data?.message);
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleToggleBtwLoginAndSignUp = (message: string) => {
    setName("");
    setEmail("");
    setPassword("");
    setState(message);
  };

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center`}
    >
      <motion.form
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state !== "Login" ? "Sign Up" : "Sign In"}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state !== "Login" && (
          <AuthInput
            value={name}
            onChange={setName}
            icon={assets.user_icon}
            type="text"
            placeholder="Full Name"
          />
        )}

        <AuthInput
          value={email}
          onChange={setEmail}
          icon={assets.email_icon}
          type="email"
          placeholder="Email"
        />
        <AuthInput
          icon={assets.lock_icon}
          value={password}
          onChange={setPassword}
          type="password"
          placeholder="Password"
        />

        <div className="min-h-2">
          {state !== "Login" && (
            <p className="text-sm text-blue-600 my-4 cursor-pointer">
              Forgot Password
            </p>
          )}
        </div>

        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "Login" ? "Log In" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p
            onClick={() => handleToggleBtwLoginAndSignUp("SignUp")}
            className="mt-5 text-center"
          >
            Don't have an account?
            <span className="text-blue-600 cursor-pointer">Sign up</span>
          </p>
        ) : (
          <p
            onClick={() => handleToggleBtwLoginAndSignUp("Login")}
            className="mt-5 text-center"
          >
            Already have an account?
            <span className="text-blue-600 cursor-pointer">Sign In</span>
          </p>
        )}

        <img
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => appContext?.setShowLogin(false)}
        />
      </motion.form>
    </div>
  );
};

export default AuthForm;
