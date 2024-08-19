import DynamicListContainer from "components/DynamicList/DynamicListContainer";

const Billing = ({
  isError,
  isLoading,
  tableData,
  totalCount,
  itemsPerPage,
  page,
  handleChange,
  setItemsPerPage,
}) => {
  return (
    <>
      <DynamicListContainer
        isError={isError}
        isLoading={isLoading}
        tableData={tableData}
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        page={page}
        handleChange={handleChange}
        setItemsPerPage={setItemsPerPage}
      />
    </>
  );
};

export default Billing;
