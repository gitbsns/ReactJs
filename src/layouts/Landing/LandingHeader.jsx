import ondelLogo from "assets/logos/ondel.svg";
import { Link, NavLink } from "react-router-dom";
import { Button } from "antd";
import LandingNavbar from "./LandingNavbar";

const LandingHeader = ({ handleLogin }) => {
  return (
    <div className="bg-white flex items-center border-b-[1px] border-[#c4c4c4] h-[13vh] fixed top-0 z-50 w-full">
      <div className="grid grid-cols-4 container px-12 2xl:px-0">
        <div className="col-span-1 w-40">
          <Link className="w-full" to="/">
            <img className="w-full" src={ondelLogo} alt="ondel" />
          </Link>
        </div>
        <div className="col-span-3 gap-[80px] flex items-center justify-end">
          <LandingNavbar />
          <Button
            className="px-10 text-xs landing-btn bg-green text-white py-5 font-medium text-[13px]"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};
export default LandingHeader;
