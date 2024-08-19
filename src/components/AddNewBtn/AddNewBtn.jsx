import { Button } from "antd";
import { BiSolidPlusSquare } from "react-icons/bi";

const AddNewBtn = ({ click }) => {
  return (
    <Button
      className="border border-main px-6 py-4 bg-main-lightest rounded-lg flex items-center"
      onClick={click}
    >
      <BiSolidPlusSquare className="text-main text-base" />
      <span className="-ml-[3px] text-xs">Add New</span>
    </Button>
  );
};
export default AddNewBtn;
