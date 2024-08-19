import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBtnAction } from "slices/headerSlice";
import useFetch from "hooks/useFetch";
import endpoints from "api/endpoints";
import {
  setAddColumnPreferences,
  setAddDynamicRoute,
} from "slices/dynamicListSlice";
import ReactHelmet from "components/ReactHelmet/ReactHelmet";
import { useSelector } from "react-redux";
import Billing from "./Billing";

const BillingContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const { businssId: businessId, id: userId } = useSelector(
    (state) => state.auth.user
  );

  const { billAddColumnPreferences } = endpoints;
  const handleChange = (event, value) => setPage(value);

  const handlePath = () => navigate("/edit-bill-column");

  useEffect(() => {
    dispatch(setBtnAction(handlePath));
    dispatch(setAddColumnPreferences(billAddColumnPreferences));
  }, [dispatch]);

  const {
    data: dynamicInvoices,
    isLoading,
    isError,
    totalCount,
  } = useFetch(
    endpoints.billsDynamicList,
    {
      userId,
      businessId,
      pageSize: itemsPerPage,
      pageNo: page,
    },
    page
  );

  useEffect(() => {
    dispatch(setAddDynamicRoute("/create-billing"));
  }, []);

  return (
    <>
      <ReactHelmet title="Billing" />
      <Billing
        isError={isError}
        isLoading={isLoading}
        tableData={dynamicInvoices}
        totalCount={totalCount || 0}
        itemsPerPage={itemsPerPage}
        page={page}
        handleChange={handleChange}
        setItemsPerPage={setItemsPerPage}
      />
    </>
  );
};
export default BillingContainer;
