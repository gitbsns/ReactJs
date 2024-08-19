import bottomHeaderPage from "data/bottomHeaderPage";
import BottomHeader from "./BottomHeader";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import pathNames from "data/pathNames";

const BottomHeaderContainer = () => {
  const [textContent, setTextContent] = useState("");
  const [animationClass, setAnimationClass] = useState("");
  const { btnAction } = useSelector((state) => state.header);
  const { addDynamicRoute } = useSelector((state) => state.dynamicList);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setTextContent(bottomHeaderPage[pathname] || "");
    return () => setTextContent("");
  }, [pathname]);

  useEffect(() => {
    setAnimationClass("animate__animated animate__fadeInRight");

    const timer = setTimeout(() => {
      setAnimationClass("");
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  const handleAdd = () => navigate(addDynamicRoute);

  const isShow = pathNames[pathname] || "";

  const handleAllInvoices = () => navigate("/invoices");

  return (
    <>
      <BottomHeader
        textContent={textContent}
        pathname={pathname}
        btnAction={btnAction}
        handleAdd={handleAdd}
        isShow={isShow}
        animationClass={animationClass}
        handleAllInvoices={handleAllInvoices}
      />
    </>
  );
};
export default BottomHeaderContainer;
