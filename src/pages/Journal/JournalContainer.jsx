import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBtnAction } from "slices/headerSlice";
import useFetch from "hooks/useFetch";
import Journal from "./Journal";
import endpoints from "api/endpoints";
import {
  setAddColumnPreferences,
  setAddDynamicRoute,
} from "slices/dynamicListSlice";
import ReactHelmet from "components/ReactHelmet/ReactHelmet";
import { useSelector } from "react-redux";

const JournalContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const { businssId: businessId, id: userId } = useSelector(
    (state) => state.auth.user
  );

  const { journalAddColumnPreferences } = endpoints;

  const handleChange = (event, value) => setPage(value);

  const handlePath = () => navigate("/edit-journal-column");

  useEffect(() => {
    dispatch(setBtnAction(handlePath));
    dispatch(setAddColumnPreferences(journalAddColumnPreferences));
  }, [dispatch]);

  const {
    data: dynamicJournal,
    isLoading,
    isError,
    totalCount,
  } = useFetch(
    endpoints.journalDynamicList,
    {
      userId,
      businessId,
      pageSize: itemsPerPage,
      pageNo: page,
    },
    page
  );

  useEffect(() => {
    dispatch(setAddDynamicRoute(""));
  }, []);

  return (
    <>
      <ReactHelmet title="General Journal" />
      <Journal
        isError={isError}
        isLoading={isLoading}
        tableData={dynamicJournal}
        totalCount={totalCount || 0}
        itemsPerPage={itemsPerPage}
        page={page}
        handleChange={handleChange}
        setItemsPerPage={setItemsPerPage}
      />
    </>
  );
};
export default JournalContainer;
