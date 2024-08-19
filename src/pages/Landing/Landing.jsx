import styles from "./landing.module.css";
import LandingHeader from "layouts/Landing/LandingHeader";
import Hero from "./Hero/Hero";

const Landing = ({ isShow, handleLogin }) => {
  return isShow ? (
    <div className={styles.landingWrapper}>
      <LandingHeader handleLogin={handleLogin} />
      <div className="container px-12 2xl:px-0">
        <Hero handleLogin={handleLogin} />
      </div>
    </div>
  ) : (
    ""
  );
};
export default Landing;
