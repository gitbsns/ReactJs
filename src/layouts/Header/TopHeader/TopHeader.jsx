import plexaarLogo from "assets/logos/plexaar.svg";
import expertLogo from "assets/logos/expert.svg";
import { GoBell } from "react-icons/go";
import { Avatar, Badge, Button, Divider, Dropdown, Tooltip } from "antd";
import { IoSettingsOutline } from "react-icons/io5";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const TopHeader = ({ items, imageURL, firstName }) => {
  return (
    <div className="p-0 fixed top-0 w-full bg-main pl-2 pr-5 flex items-center h-11 z-50">
      <div className="flex items-center justify-between w-full">
        <Link className="w-8" to="/">
          <img
            className="w-full object-cover object-center"
            src={plexaarLogo}
            alt="plexaar"
          />
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Tooltip placement="bottom" title="Notifications">
              <div className="p-[7px] flex">
                <Badge
                  className="cursor-pointer animate-pulse"
                  count={5}
                  size="small"
                  style={{
                    // background: "#ec2128",
                    background: "#404145",
                    border: "none",
                    boxShadow: "none",
                    fontSize: "10px",
                  }}
                >
                  <GoBell className="text-lg text-white cursor-pointer" />
                </Badge>
              </div>
            </Tooltip>
            <Tooltip placement="bottom" title="Settings">
              <Button className="p-2" type="text">
                <IoSettingsOutline className="text-lg animate-spin-slow hover:animate-none text-white" />
              </Button>
            </Tooltip>
          </div>
          <div className="flex items-center">
            <Divider className="bg-gray-200 h-6 mr-3" type="vertical" />
            <div className="flex items-center gap-2">
              <div className="w-7">
                <img
                  className="w-full object-cover object-center"
                  src={expertLogo}
                  alt="expert"
                />
              </div>
              <div className="flex flex-col text-white pe-3">
                <span className="text-[10px]">Admin</span>
                <span className="text-xs font-medium">
                  Expert Medical Center
                </span>
              </div>
              <Divider
                className="text-white bg-gray-200 h-6 mr-3"
                type="vertical"
              />
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottom"
                arrow
                trigger={["click"]}
              >
                <Avatar
                  className={`${
                    imageURL ? "ring-offset-1 ring-1" : ""
                  } cursor-pointer`}
                  src={imageURL}
                  alt={firstName}
                  size={imageURL ? 30 : 32}
                  icon={<UserOutlined />}
                />
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
