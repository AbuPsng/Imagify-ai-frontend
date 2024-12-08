import { motion } from "motion/react";
import React, { useContext, useState } from "react";
import { assets } from "../constants";
import { AppContext } from "../context/AppContext";
import { AppContextType } from "../types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageloaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const data = useContext<AppContextType | undefined>(AppContext);

  console.log(image, "image");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data?.user) {
      toast.success("Please login first");
      return navigate("/home");
    }
    setLoading(true);
    if (input && typeof data === "object") {
      const image = await data?.handleGenerateImage(input);
      if (image) {
        setIsImageLoaded(true);
        setImage(image);
      }
    }
    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div>
        <div className="relative">
          <img src={image} alt="" className="max-w-sm rounded" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? "w-full transition-all duration-[10]" : "w-0"
            } `}
          />
        </div>
        <div className="h-3">
          <p className={`${!loading && "hidden"}`}>Loading...</p>
        </div>
      </div>

      {!isImageloaded ? (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 text-[#e0e0e0] font-[300]"
          />
          <button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
          >
            Generate
          </button>
        </div>
      ) : (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <button
            onClick={() => setIsImageLoaded(false)}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </button>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
