import { useDispatch } from "react-redux";
import TopHeader from "./TopHeader";
import { useSelector } from "react-redux";
import { logout } from "slices/authSlice";

const TopHeaderContainer = () => {
  const dispatch = useDispatch();
  const { imageURL, firstName } = useSelector((state) => state.auth.user);

  const handleLogout = () => dispatch(logout());

  const items = [
    {
      key: "1",
      label: <div onClick={handleLogout}>Logout</div>,
    },
  ];

  return (
    <>
      <TopHeader items={items} imageURL={imageURL} firstName={firstName} />
    </>
  );
};
export default TopHeaderContainer;
