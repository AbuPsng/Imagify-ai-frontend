import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../constants/index.ts";
import { AppContext } from "../context/AppContext.tsx";
import { AppContextType } from "../types/index.ts";

const Navbar = () => {
  const data = useContext<AppContextType | undefined>(AppContext);

  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-28 md:w-32 lg:w-40" />
      </Link>

      <div>
        {data?.user ? (
          <div className="flex items-center gap-3 md:gap-2">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1/5 sm:py-3 rounded-full hover:scale-105 transition-all"
            >
              <img src={assets.credit_star} className="w-5" alt="" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credits left : {data?.credit}
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">
              {data?.user?.name}
            </p>
            <div className="relative group" onClick={data?.handleLogout}>
              <img
                src={assets.profile_icon}
                className="w-10 drop-shadow"
                alt=""
              />
              <div className="absolute hidden group-hover:block top-14 right-0 z-10 text-black">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li className="py-1 px-2 cursor-pointer pr-10">Logut</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 md:gap-5">
            <Link to="/buy" className="cursor-pointer">
              Pricing
            </Link>
            <button
              onClick={() => data?.setShowLogin(true)}
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
