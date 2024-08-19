import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "hooks/useFetch";
import api from "api/axios";
import endpoints from "api/endpoints";
import ReactHelmet from "components/ReactHelmet/ReactHelmet";
import { useSelector } from "react-redux";
import EditJournalColumn from "./EditJournalColumn";
import usePost from "hooks/usePost";

const EditJournalColumnContainer = () => {
  const [sortedData, setSortedData] = useState([]);
  const { businssId: businessId, id: userId } = useSelector(
    (state) => state.auth.user
  );
  const { postData } = usePost();

  const navigate = useNavigate();

  const {
    data: { userColumnPreferences: columnNames },
    isLoading: columnNamesLoading,
    isError: columnNamesError,
  } = useFetch(endpoints.journalPreferencesList, {
    userId,
    businessId,
  });

  useEffect(() => {
    if (columnNames) {
      const data = columnNames.slice().sort((a, b) => a.position - b.position);
      setSortedData(data);
    }
  }, [columnNames]);

  const handlePost = async (columns) => {
    const { isSuccess } = await postData(
      endpoints.journalAddColumnPreferences,
      {
        userId: userId,
        columns,
        createdBy: userId,
      }
    );

    if (isSuccess) {
      navigate("/general-journal");
    }
  };

  const handleSaveChanges = async () => {
    const dataWithoutServiceNameAndColumnName = sortedData.reduce(
      (uniqueData, item) => {
        const existingItem = uniqueData.find(
          (uniqueItem) => uniqueItem.position === item.position
        );

        const updatedItem = { ...item, columnId: item.columnId };
        delete updatedItem.id;

        if (!existingItem) {
          uniqueData.push(updatedItem);
        }

        return uniqueData;
      },
      []
    );

    const classes = dataWithoutServiceNameAndColumnName
      .map((i) => {
        if (i.isShown === true) {
          return {
            columnId: i.columnId,
            isSticky: i.isSticky,
          };
        }
        return null;
      })
      .filter((it) => it !== null);
    handlePost(classes);
  };

  const showColumns = sortedData?.some((el) => el.isShown);

  return (
    <>
      <ReactHelmet title="Edit Journal Column" />
      <EditJournalColumn
        sortedData={sortedData}
        setSortedData={setSortedData}
        columnNamesLoading={columnNamesLoading}
        columnNamesError={columnNamesError}
        handleSaveChanges={handleSaveChanges}
        showColumns={showColumns}
      />
    </>
  );
};
export default EditJournalColumnContainer;
