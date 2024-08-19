import { Box, Grid, Typography } from "@mui/material";
import AddDynamicColumnContainer from "./AddDynamicColumn/AddDynamicColumnContainer";
import InsertDynamicColumnContainer from "./InsertDynamicColumn/InsertDynamicColumnContainer";
import { Button, Spin } from "antd";
import SomethingWentWrong from "components/SomethingWentWrong/SomethingWentWrong";

const EditInvoicesColumn = ({
  sortedData,
  setSortedData,
  columnNamesLoading,
  columnNamesError,
  handleSaveChanges,
  showColumns,
}) => {
  return (
    <div className="dynamic-wrapper">
      <div
        className="edit-invoice-columns"
        style={{ height: "100vh", overflow: "auto", paddingBottom: "220px" }}
      >
        {columnNamesError ? (
          <SomethingWentWrong />
        ) : columnNamesLoading ? (
          <div className="center-loader">
            <Spin size="large" />
          </div>
        ) : (
          <Grid className="" container rowSpacing={1.5}>
            {showColumns ? (
              <Grid item xs={12}>
                <Box component="div">
                  <Typography sx={{ fontSize: "14px" }} mb={1.5}>
                    Added Columns
                  </Typography>

                  <AddDynamicColumnContainer
                    data={sortedData}
                    updateData={setSortedData}
                  />
                </Box>
              </Grid>
            ) : (
              ""
            )}

            <Grid item xs={12}>
              <Box component="div">
                <Typography sx={{ fontSize: "14px" }} mb={1.5}>
                  Insert Columns
                </Typography>
                <InsertDynamicColumnContainer
                  data={sortedData}
                  updateData={setSortedData}
                />
              </Box>
            </Grid>
          </Grid>
        )}
        {sortedData?.length && !columnNamesError ? (
          <div className="w-full flex justify-end pt-1">
            <Button className="btn-main mt-5" onClick={handleSaveChanges}>
              Save & Continue
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default EditInvoicesColumn;
