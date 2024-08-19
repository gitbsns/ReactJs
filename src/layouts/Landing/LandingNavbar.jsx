import landingMenu from "data/landingMenu";
import { NavLink } from "react-router-dom";

const LandingNavbar = () => {
  return (
    <nav>
      <ul className="flex gap-[80px] text-base">
        {landingMenu.map(({ to, textContent }) => (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-green font-medium hover:text-green"
                  : "hover:text-green"
              }
              to={to}
            >
              <span className="transition ease-in-out duration-300">
                {textContent}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default LandingNavbar;
