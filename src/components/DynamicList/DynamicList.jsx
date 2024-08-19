import classNames from "classnames";
import { FiPlusCircle } from "react-icons/fi";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Typography,
  Grid,
  Stack,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { RiMore2Fill } from "react-icons/ri";
import { Empty, Spin } from "antd";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SomethingWentWrong from "components/SomethingWentWrong/SomethingWentWrong";

const DynamicList = ({
  newArray,
  anchorEl,
  handleMenuClose,
  handleHideClick,
  selectedData,
  handleFreezeClick,
  getLeftStickyPos,
  open,
  handleMenuClick,
  handleUnFreezeClick,
  isError,
  isLoading,
  totalCount,
  itemsPerPage,
  page,
  handleChange,
  setItemsPerPage,
}) => {
  return (
    <>
      <div className="dynamic-wrapper">
        {isError ? (
          <SomethingWentWrong />
        ) : isLoading ? (
          <div className="center-loader">
            <Spin size="large" />
          </div>
        ) : newArray?.length === 0 ? (
          ""
        ) : (
          <Grid>
            <Grid className="table-around" item sm={12} md={12} lg={12}>
              <div
                className={`overflow-auto dynamic-table-wrapper ${
                  (newArray?.at(0)?.columnValue?.length < 10 ||
                    newArray?.at(0)?.columnValue?.length === 10) &&
                  "dynamic-table-height-handle"
                }`}
              >
                <table className="dynamic-table">
                  <thead>
                    <tr>
                      <th className="table-th-bg col1-th-sticky">
                        <div className="flex items-center justify-center col1-rec-div">
                          <span className="col1-rec" />
                          <span className="col1-plus">
                            <FiPlusCircle />
                          </span>
                        </div>
                      </th>
                      {newArray.map((el, i) => (
                        <th
                          key={el.columnTitle}
                          className={classNames({
                            "text-left text-nowrap": true,
                            "table-th-bg": true,
                            "sticky th-sticky": el.isSticky,
                          })}
                          style={{
                            left: !i ? "45px" : getLeftStickyPos(i),
                            width: `${
                              el.status === "image" ||
                              el.columnStatus === "image"
                                ? el.width
                                : el.width > el.bodyColWidth
                                ? el.width
                                : el.bodyColWidth
                            }px`,
                          }}
                        >
                          <div className="flex justify-between items-center th-sticky-div ps-3 pe-2">
                            <span>{el.columnTitle}</span>
                            <div
                              className="cursor-pointer"
                              onClick={(event) => handleMenuClick(event, el)}
                            >
                              <RiMore2Fill className="text-grey" />
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {!newArray.at(0)?.columnValue?.length ? (
                      <Empty
                        className="w-screen h-[60vh] flex flex-col justify-center"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      />
                    ) : (
                      ""
                    )}
                    {newArray.at(0)?.columnValue?.length !== 0
                      ? newArray.at(0)?.columnValue.map((item, rowIndex) => (
                          <tr key={rowIndex} className="text-left">
                            <td className="col1-td">
                              <div className="cursor-pointer col1-td-div flex p-0 justify-center items-center">
                                <RiMore2Fill className="text-black" />
                              </div>
                            </td>
                            {newArray.map((col, i) => (
                              <td
                                className={classNames({
                                  "td-dynamic": true,
                                  sticky: col.isSticky,
                                })}
                                style={{
                                  left: !i ? "45px" : getLeftStickyPos(i),
                                  background:
                                    (col.status === "status" ||
                                      col.columnStatus === "status") &&
                                    col.isShown &&
                                    (col?.columnValue[rowIndex]?.values ===
                                      "True" ||
                                      col?.columnValue[rowIndex]?.values ===
                                        "Active")
                                      ? "#B8D693"
                                      : col?.columnValue[rowIndex]?.values ===
                                          "False" ||
                                        col?.columnValue[rowIndex]?.values ===
                                          "Pending"
                                      ? "#E9B67A"
                                      : "",
                                  color:
                                    (col.status === "status" ||
                                      col.columnStatus === "status") &&
                                    col.isShown &&
                                    (col.columnValue[rowIndex]?.values ===
                                      "True" ||
                                      col.columnValue[rowIndex]?.values ===
                                        "Active" ||
                                      col.columnValue[rowIndex]?.values ===
                                        "False" ||
                                      col.columnValue[rowIndex]?.values ===
                                        "Pending")
                                      ? "white"
                                      : "",
                                  fontWeight:
                                    (col.status === "status" ||
                                      col.columnStatus === "status") &&
                                    col.isShown &&
                                    (col.columnValue[rowIndex]?.values ===
                                      "True" ||
                                      col.columnValue[rowIndex]?.values ===
                                        "Active" ||
                                      col.columnValue[rowIndex]?.values ===
                                        "False" ||
                                      col.columnValue[rowIndex]?.values ===
                                        "Pending")
                                      ? "500"
                                      : "",
                                }}
                                key={col.columnName}
                              >
                                <div className="td-div px-3 flex items-center">
                                  <div className="td-div-child">
                                    {col.status === "image" ||
                                    col.columnStatus === "image" ? (
                                      <Avatar
                                        component="image"
                                        alt=""
                                        src={
                                          col.isShown
                                            ? col.columnValue[rowIndex].values
                                            : ""
                                        }
                                        sx={{
                                          width: "24px",
                                          height: "24px",
                                          textAlign: "center",
                                        }}
                                      />
                                    ) : col.isShown ? (
                                      typeof col?.columnValue[rowIndex]
                                        ?.values === "string" ? (
                                        col?.columnValue[rowIndex]?.values
                                      ) : Array.isArray(
                                          col?.columnValue[rowIndex]?.values
                                        ) ? (
                                        col.columnValue[rowIndex].values
                                          .length > 0 ? (
                                          col.columnValue[rowIndex].values[0]
                                        ) : (
                                          ""
                                        )
                                      ) : (
                                        JSON.stringify(
                                          col?.columnValue[rowIndex]?.values
                                        )
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
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
                      fontSize="14px"
                    >
                      Hide
                    </Box>
                  </MenuItem>
                  <MenuItem>
                    {selectedData?.isSticky ? (
                      <Typography
                        sx={{ fontSize: "14px" }}
                        onClick={handleUnFreezeClick}
                      >
                        UnFreeze
                      </Typography>
                    ) : (
                      <Typography
                        sx={{ fontSize: "14px" }}
                        onClick={handleFreezeClick}
                      >
                        Freeze
                      </Typography>
                    )}
                  </MenuItem>
                </Menu>
              )}
            </Grid>
            <Grid item sm={12} md={12} lg={12} mt={4} mb={2}>
              <Box display="flex" justifyContent="space-between">
                <Stack spacing={2} className="">
                  <Pagination
                    sx={{
                      ".css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root": {
                        border: "none",
                        color: "#969696",
                        minWidth: "25px",
                        borderRadius: "0px",
                        position: "static",
                      },
                      ".css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
                        {
                          backgroundColor: "transparent",
                          color: "black",
                        },
                    }}
                    count={Math.ceil(totalCount / itemsPerPage)}
                    page={page}
                    onChange={handleChange}
                    variant="outlined"
                    siblingCount={9}
                    boundaryCount={0}
                    renderItem={(item) => (
                      <PaginationItem
                        {...item}
                        slots={{
                          previous: (props) => (
                            <ArrowBackIosIcon
                              {...props}
                              style={{ fontSize: "15px", fill: "#0051cb" }}
                            />
                          ),
                          next: (props) => (
                            <ArrowForwardIosIcon
                              {...props}
                              style={{
                                fontSize: "15px",
                                fill: "#0051cb",
                              }}
                            />
                          ),
                        }}
                      />
                    )}
                  />
                </Stack>
                <div>
                  <select
                    className="items_per_page_select"
                    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                    value={itemsPerPage}
                  >
                    <option disabled>Items Per page</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  &nbsp;&nbsp;&nbsp;
                  <span className="per-page-text">Per Page</span>
                </div>
              </Box>
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
};

export default DynamicList;
