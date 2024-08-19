import { Button, Tooltip } from "antd";
import calendexLogo from "assets/logos/calendex.svg";
import fourEllipsesIcon from "assets/icons/four-ellipses.svg";
import filterIcon from "assets/icons/filter.svg";
import sortIcon from "assets/icons/sort.svg";

const BottomHeader = ({
  textContent,
  btnAction,
  handleAdd,
  isShow,
  animationClass,
  handleAllInvoices,
  pathname,
}) => {
  return (
    <div className="p-0 fixed top-11 w-full bg-white pl-2 pr-5 flex items-center h-12 border-b-[1px] z-50">
      <div className="flex justify-between w-full">
        <div className="w-full flex items-center gap-6">
          <div className="w-8 cursor-pointer">
            <img
              className="w-full object-cover object-center"
              src={calendexLogo}
              alt="calendex"
            />
          </div>
          <span className={`font-medium text-lg ${animationClass}`}>
            {textContent}
          </span>
        </div>
        {pathname === "/create-invoice" ? (
          <Button
            className="btn-main py-2 px-8 text-xs"
            onClick={handleAllInvoices}
          >
            All Invoices
          </Button>
        ) : (
          ""
        )}
      </div>

      {isShow ? (
        <>
          <div className="flex items-center gap-2 me-2">
            <Tooltip placement="bottom" title="Sort">
              <div className="w-8">
                <img className="cursor-pointer" src={sortIcon} alt="sort" />
              </div>
            </Tooltip>
            <Tooltip placement="bottom" title="Filter">
              <div className="w-8">
                <img className="cursor-pointer" src={filterIcon} alt="filter" />
              </div>
            </Tooltip>
          </div>
          <div className="flex items-center gap-5">
            <Button className="btn-main py-2 px-8 text-xs" onClick={handleAdd}>
              Add
            </Button>

            <Tooltip placement="bottom" title="Preferences">
              <div className="cursor-pointer w-8" onClick={btnAction}>
                <img src={fourEllipsesIcon} alt="fourEllipsesIcon" />
              </div>
            </Tooltip>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default BottomHeader;
