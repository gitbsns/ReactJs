import heroImg from "assets/images/hero.svg";
import { Button } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Typewriter } from "react-simple-typewriter";

const Hero = ({ handleLogin }) => {
  return (
    <div className="h-[87vh] flex items-center mt-[13vh]">
      <div className="grid grid-cols-2">
        <div className="col-span-1 animate__animated animate__fadeInLeft">
          <div className="font-semibold text-[40px]">
            {/* Experienced <span className="text-green">mobile and web</span>{" "}
            applications and website builders measuring. */}
            <Typewriter
              words={[
                "Experienced mobile and web applications and website builders measuring.",
              ]}
              loop={true}
              cursor
              cursorStyle
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
          <div className="text-grey text-base mt-5">
            ONDEL is a team of experienced mobile and web applications and
            website builders measuring dozens of completed projects. We build
            and develop mobile applications for several top platforms, including
            Android & IOS.
          </div>
          <Button
            className="px-16 mt-16 landing-btn bg-green text-white py-6 font-medium text-base"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
        <div className="flex justify-end items-center h-full animate__animated animate__fadeInRight">
          <div className="cols-span-1">
            <div className="w-full max-w-[500px] 2xl:min-w-[600px] mx-auto">
              <LazyLoadImage
                className="w-full object-cover object-center"
                src={heroImg}
                alt="hero-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
