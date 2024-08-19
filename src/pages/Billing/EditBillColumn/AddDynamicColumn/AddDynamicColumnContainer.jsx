import { useState } from "react";
import AddDynamicColumn from "./AddDynamicColumn";

const AddDynamicColumnContainer = ({ data, updateData }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedData, setSelectedData] = useState();

  const handleMenuClick = (event, data) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
    setSelectedData(data);
  };

  const handleMenuClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleHideClick = async () => {
    const updatedColumns = data.map((column) =>
      column.id === selectedData.id ? { ...column, isShown: false } : column
    );
    updateData(updatedColumns);

    setOpen(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedData = Array.from(data).map((column) => ({ ...column }));
    const [removed] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, removed);
    reorderedData.forEach((column, index) => {
      column.position = index + 1;
    });

    updateData(reorderedData);
  };

  return (
    <>
      <AddDynamicColumn
        handleDragEnd={handleDragEnd}
        data={data}
        handleMenuClick={handleMenuClick}
        open={open}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        handleHideClick={handleHideClick}
      />
    </>
  );
};
export default AddDynamicColumnContainer;
