import { assets } from "../constants";
import { motion } from "motion/react";

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-6 "
    >
      <h1 className="text-4xl md:text-3xl-font-semibold">Create AI Images</h1>
      <p className="text-gray-500 mb-8">Turn your imagination into visuals</p>
      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center max-w-[990px]">
        <img
          src={assets.sample_img_1}
          className="w-80 xl:w-96 rounded-lg"
          alt=""
        />

        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p>
            Easily bring your idea to life with our free AI image generator.
            Wheter you need stunning visuals or unique imagery, our tool
            transform your text into eye catching images with just a few clicks.
            Imagine it, describe it, and watch it come to life instantly.
          </p>
          <p>
            Simply type in a text prompt, and our cutting-edge AI will generate
            high-quality image in second, From product visuals to character
            designs and portraits, even concepts that don't yet exist can be
            visualized effortlessly. Powered by advanced AI technology, the
            creative possibilities are limitless.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;