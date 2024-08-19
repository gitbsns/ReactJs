import { Tooltip } from "antd";
import styles from "./sidebar.module.css";
import { Link, useLocation } from "react-router-dom";
import sidebarMenu from "data/sidebarMenu";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className={`${styles.sidebar} top-[92px] rounded-tr-xl pt-2 bg-white`}>
      <ul className="pt-2 w-full flex flex-col pl-1">
        {sidebarMenu.map((el) => (
          <Tooltip key={el.key} placement="right" title={el.tooltip}>
            <Link to={el.path}>
              <li
                className={`w-full cursor-pointer py-2 mb-2 pr-1 hover:bg-main group transition-all duration-200 ease-in-out rounded-tl-md rounded-bl-md flex justify-center ${
                  pathname === el.path ? "bg-main" : ""
                }`}
              >
                <div className="w-[11px]">
                  <el.icon
                    className={`text-lg w-full group-hover:text-white ${
                      pathname === el.path ? "text-white" : "text-main"
                    }`}
                  />
                </div>
              </li>
            </Link>
          </Tooltip>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
