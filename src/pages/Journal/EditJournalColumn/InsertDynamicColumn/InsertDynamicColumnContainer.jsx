import InsertDynamicColumn from "./InsertDynamicColumn";

const InsertDynamicColumnContainer = ({ data, updateData }) => {
  const handleColumnClick = (columnTitle) => {
    updateData((prevData) =>
      prevData.map((columnData) => {
        if (columnData.columnTitle === columnTitle) {
          return { ...columnData, isShown: !columnData.isShown };
        }
        return columnData;
      })
    );
  };

  return (
    <>
      <InsertDynamicColumn data={data} handleColumnClick={handleColumnClick} />
    </>
  );
};
export default InsertDynamicColumnContainer;
