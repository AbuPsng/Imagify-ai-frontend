import GenerateBtn from "../component/GenerateBtn";
import Description from "../sections/Description";
import HeroSection from "../sections/HeroSection";
import Steps from "../sections/Steps";
import Testimonial from "../sections/Testimonial";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Steps />
      <Description />
      <Testimonial />
      <GenerateBtn />
    </div>
  );
};

export default Home;
