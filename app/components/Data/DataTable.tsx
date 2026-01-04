"use client";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const DataTable = ({
  columns,
  rows,
  loading,
}: {
  columns: GridColDef[];
  rows: any[];
  loading: boolean;
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[8]}
        checkboxSelection
        // disableRowSelectionOnClick
        showToolbar
      />
    </Box>
  );
};
