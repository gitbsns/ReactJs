import { useEffect, useState } from "react";
import DynamicList from "./DynamicList";
import { useSelector } from "react-redux";
import usePost from "hooks/usePost";

const DynamicListContainer = ({
  tableData,
  isError,
  isLoading,
  totalCount,
  itemsPerPage,
  page,
  handleChange,
  setItemsPerPage,
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedData, setSelectedData] = useState();
  const [listData, setListData] = useState([]);
  const { businssId: businessId, id: userId } = useSelector(
    (state) => state.auth.user
  );
  const { addColumnPreferences } = useSelector((state) => state.dynamicList);
  const { postData } = usePost();

  const handleMenuClick = (event, data) => {
    event.stopPropagation();
    setOpen(true);
    setAnchorEl(event.currentTarget);
    setSelectedData(data);
  };

  const handleMenuClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const shownColumns = listData.filter((column) => column.isShown);

  const sortedData = shownColumns.sort((a, b) => a.position - b.position);
  const stickyObjects = sortedData.filter((object) => object.isSticky);
  const nonStickyObjects = sortedData.filter((object) => !object.isSticky);

  const sortedStickyObjects = stickyObjects.sort(
    (object1, object2) => object1.position - object2.position
  );
  const sortedNonStickyObjects = nonStickyObjects.sort(
    (object1, object2) => object1.position - object2.position
  );

  const sortedObjects = sortedStickyObjects.concat(sortedNonStickyObjects);

  const getHeadTextWidth = (text, font) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;

    const metrics = context.measureText(text);
    return metrics.width;
  };

  const getBodyTextWidth = (text, font) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;

    const metrics = context.measureText(text);
    return metrics.width;
  };

  const fontSize = "14px";
  const fontFamily = "Roboto";

  const columnHeadWidths = {};
  const columnBodyWidths = {};

  sortedObjects.forEach((obj) => {
    const columnTitle = obj.columnTitle;
    const font = `${fontSize} ${fontFamily}`;
    const width = getHeadTextWidth(columnTitle, font);
    columnHeadWidths[columnTitle] = width;
  });

  const myVals = sortedObjects
    .map((obj) => {
      return obj.columnValue.map((col) => col.values);
    })
    .map((el) =>
      el.map((el) => ({
        length: typeof el === "string" && el.length,
        name: el,
      }))
    );

  const findLongestLengthObject = (array) => {
    if (array.length === 0) return null;
    return array.reduce((maxObject, currentObject) => {
      return currentObject.length > maxObject.length
        ? currentObject
        : maxObject;
    }, array[0]);
  };

  const bodyColumnsResult = myVals
    .map((array) => [findLongestLengthObject(array)?.name])
    .flat();

  const resultObjects = sortedObjects.map((obj, index) => {
    const value = bodyColumnsResult[index];

    return { ...obj, bodyColName: Array.isArray(value) ? value.at(0) : value };
  });

  resultObjects.forEach((obj) => {
    const columnBody = obj.bodyColName;
    const font = `${fontSize} ${fontFamily}`;
    const width = getBodyTextWidth(columnBody, font);
    columnBodyWidths[columnBody] = width;
  });

  const newArray = resultObjects.map((el) => {
    const headingColWidth = columnHeadWidths[el.columnTitle];
    const bodyColWidth = columnBodyWidths[el.bodyColName];

    return {
      ...el,

      width: headingColWidth + 40 > 210 ? 210 : headingColWidth + 40,
      bodyColWidth: bodyColWidth + 40 > 210 ? 210 : bodyColWidth + 40,
    };
  });

  const handlePost = async (columns) => {
    const { isSuccess } = await postData(addColumnPreferences, {
      userId,
      columns,
      createdBy: userId,
    });

    if (isSuccess) {
      setListData(updatedColumns);
    }
  };

  const handleHideClick = async () => {
    const updatedColumns = listData.map((column) => {
      if (
        (column.columnId && column.columnId === selectedData.columnId) ||
        (column.id && column.id === selectedData.id)
      ) {
        return { ...column, isShown: false };
      } else {
        return column;
      }
    });

    setListData(updatedColumns);

    setOpen(false);

    const dataWithoutServiceNameAndColumnName = updatedColumns.map((item) => {
      const updatedItem = { ...item, columnId: item.columnId };
      return updatedItem;
    });

    const columns = dataWithoutServiceNameAndColumnName
      .map((item) => {
        if (item.isShown === true) {
          return {
            columnId: item.columnId,
            isSticky: item.isSticky,
          };
        }
        return null;
      })
      .filter((it) => it !== null);

    handlePost(columns);
  };

  useEffect(() => {
    if (tableData) {
      const sorted = [...tableData].sort((a, b) => a?.position - b?.position);

      setListData(sorted);
    }
  }, [tableData]);

  const handleFreezeClick = async (columnName) => {
    const updatedColumns = listData.map((column) => {
      if (
        (column.id && column.id === selectedData.id) ||
        (column.columnId && column.columnId === selectedData.columnId)
      ) {
        return { ...column, isSticky: true };
      } else {
        return column;
      }
    });

    setListData(updatedColumns);
    setOpen(false);
    const dataWithoutServiceNameAndColumnName = updatedColumns.map((item) => {
      const updatedItem = { ...item, columnId: item.columnId };
      return updatedItem;
    });

    const columns = dataWithoutServiceNameAndColumnName
      ?.map((i) => {
        if (i.isShown === true) {
          return {
            columnId: i.columnId,
            isSticky: i.isSticky,
          };
        }
        return null;
      })
      .filter((it) => it !== null);

    handlePost(columns);
  };

  const handleUnFreezeClick = async () => {
    const updatedColumns = listData.map((column) =>
      column.id === selectedData.id ? { ...column, isSticky: false } : column
    );

    setListData(updatedColumns);
    setOpen(false);
    const dataWithoutServiceNameAndColumnName = updatedColumns.map((item) => {
      const { serviceName, columnName, customerId, ...rest } = item;

      const updatedItem = { ...rest, columnId: item.columnId };
      return updatedItem;
    });

    const columns = dataWithoutServiceNameAndColumnName
      .map((item) => {
        if (item.isShown === true) {
          return {
            columnId: item.columnId,
            isSticky: item.isSticky,
          };
        }
        return null;
      })
      .filter((it) => it !== null);

    console.log("unf", columns);

    handlePost(columns);
  };

  const getLeftStickyPos = (index) => {
    if (!index) return 0;

    const prevColumnsTotalWidth = newArray
      .slice(0, index)
      .reduce((curr, column) => {
        return (
          curr +
          (column.status === "image"
            ? column.width
            : column.width > column.bodyColWidth
            ? column.width
            : column.bodyColWidth)
        );
      }, 45);
    return prevColumnsTotalWidth;
  };

  return (
    <>
      <DynamicList
        newArray={newArray}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        handleHideClick={handleHideClick}
        selectedData={selectedData}
        handleFreezeClick={handleFreezeClick}
        getLeftStickyPos={getLeftStickyPos}
        open={open}
        handleMenuClick={handleMenuClick}
        handleUnFreezeClick={handleUnFreezeClick}
        isError={isError}
        isLoading={isLoading}
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        page={page}
        handleChange={handleChange}
        setItemsPerPage={setItemsPerPage}
      />
    </>
  );
};
export default DynamicListContainer;
