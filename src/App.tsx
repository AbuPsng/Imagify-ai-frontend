import { lazy, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AuthForm from "./component/AuthForm";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import { AppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home"));
const Result = lazy(() => import("./pages/Result"));
const BuyCredits = lazy(() => import("./pages/BuyCredits"));
const Checkout = lazy(() => import("./pages/Checkout"));

const App = () => {
  const data = useContext(AppContext);

  return (
    <div className="px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50 ">
      <Navbar />
      {data?.showLogin && <AuthForm />}
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredits />} />
        <Route path="/pay" element={<Checkout />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
