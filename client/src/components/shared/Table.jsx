
import { Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { matBlack } from "../../constants/color";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "1rem 4rem",
          borderRadius: "1rem",
          margin: "auto",
          width: "100%",
          overflow: "hidden",
          height: "100%",
          boxShadow: "none",
          bgcolor: "#121a28",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h4"
          sx={{
            margin: "2rem",
            textTransform: "uppercase",
            color: "#e6edf7",
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{
            height: "80%",
          }}
          sx={{
            border: "none",
            color: "#dce8fa",
            "& .MuiDataGrid-cell": {
              borderColor: "rgba(255,255,255,0.08)",
            },
            "& .MuiDataGrid-row": {
              bgcolor: "rgba(255,255,255,0.01)",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid rgba(255,255,255,0.08)",
            },
            ".table-header": {
              bgcolor: matBlack,
              color: "#e6edf7",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;