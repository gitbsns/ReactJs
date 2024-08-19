import { Box, Grid, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AddDynamicColumn = ({
  handleDragEnd,
  data,
  handleMenuClick,
  open,
  anchorEl,
  handleMenuClose,
  handleHideClick,
}) => {
  return (
    <div classNames="dynamic-wrapper">
      <Box
        sx={{
          overflowX: "scroll",
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
        }}
      >
        {" "}
        <Box sx={{ display: "flex", maxWidth: "982px" }}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="columnList" direction="horizontal">
              {(provided) => (
                <Grid
                  container
                  wrap="nowrap"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {data?.map((column, index) => (
                    <Draggable
                      key={column.columnTitle}
                      draggableId={column.columnTitle}
                      index={index}
                    >
                      {(provided) => (
                        <Grid
                          item
                          key={index}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {column.isShown && (
                            <Box
                              sx={{
                                border: "1px solid #DCDCDC",
                              }}
                              component="div"
                              bgcolor="#FFFFFF"
                              height="41px"
                              display="flex"
                              justifyContent="space-between"
                              minWidth="222px"
                              alignItems="center"
                            >
                              <Typography sx={{ fontSize: "14px" }} pl={2}>
                                {column.columnTitle}{" "}
                              </Typography>
                              <MoreVertIcon
                                fontSize="small"
                                onClick={(event) =>
                                  handleMenuClick(event, column)
                                }
                              />
                            </Box>
                          )}
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Box>
      {open && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleHideClick}>
            <Box
              component="div"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              hide
            </Box>
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default AddDynamicColumn;
