import { Box, Grid, Typography } from "@mui/material";

const InsertDynamicColumn = ({ data, handleColumnClick }) => {
  return (
    <Grid
      className="dynamic-wrapper"
      container
      bgcolor="#FFF"
      border="#DCDCDC"
      sx={{ border: "1px solid #DCDCDC", borderRadius: "8px" }}
      xs={12}
    >
      {data?.map((columnData, index) => {
        const { isShown } = columnData;
        const borderColor = isShown ? "#fff" : "#0051CB";
        const bgColor = isShown ? "#0051CB" : "#fff";
        const color = isShown ? "#fff" : "#A4A4A4";

        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            p={1}
            key={columnData.columnTitle}
          >
            <Box
              onClick={() => handleColumnClick(columnData.columnTitle)}
              sx={{
                border: `1px solid ${borderColor}`,
                borderRadius: "8px",
                cursor: "pointer",
                transition:
                  "background-color 200ms ease-in-out, color 200ms ease-in-out",
                "&:hover": {
                  backgroundColor: "#0051CB",
                  "& .MuiTypography-root": {
                    color: "white",
                  },
                },
              }}
              component="div"
              bgcolor={bgColor}
              height="36px"
              minWidth="205px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography sx={{ color: color, fontSize: "14px" }}>
                {" "}
                {columnData.columnTitle}{" "}
              </Typography>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default InsertDynamicColumn;
