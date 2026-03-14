import { Box, CircularProgress } from "@mui/material";
import { ColDef, SimpleDataGridProps } from "@/app/schemas";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

const SimpleDataGrid = ({ columns, rows, isLoading }: SimpleDataGridProps) => {
  const [checkedColumns, setCheckedColumns] = useState(columns);
  const handleToggle = (value: ColDef) => {
    setCheckedColumns((prev) =>
      !!prev.find((i) => i.field == value.field)
        ? prev.filter((v) => v?.field !== value?.field)
        : [...prev, value],
    );
  };
  const [widthSum, setWidthSum] = useState(
    checkedColumns?.reduce((acc, col) => {
      return acc + col?.width;
    }, 0),
  );
  useEffect(() => {
    setWidthSum(
      checkedColumns?.reduce((acc, col) => {
        return acc + col?.width;
      }, 0),
    );
  }, [checkedColumns]);
  return (
    <Box className="pb-5">
      <List className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center">
        {columns.map((item) => {
          const labelId = `checkbox-list-label-${item}`;

          return (
            <Box key={item?.field}>
              <ListItemButton onClick={() => handleToggle(item)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={
                      !!checkedColumns.find((i) => i.field == item?.field)
                    }
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>

                <ListItemText id={labelId} primary={item?.headerName} />
              </ListItemButton>
            </Box>
          );
        })}
      </List>
      <Box className="flex flex-row items-center w-full">
        {checkedColumns
          ?.sort((a, b) => a.order - b.order)
          ?.map((item) => (
            <Box
              width={item?.width}
              className={`bg-slate-600 text-white p-2 text-center flex flex-row items-center justify-center gap-2`}
              key={item?.headerName}
            >
              <Box>{item?.headerName}</Box>
            </Box>
          ))}
      </Box>
      <Box width={widthSum}>
        {isLoading ? (
          <Box className="w-full h-36 grid place-items-center">
            <CircularProgress />
          </Box>
        ) : (
          rows?.map((row, _) => {
            return (
              <Box
                key={row["name"]}
                className="flex flex-row items-center even:bg-slate-200 w-full"
              >
                {checkedColumns?.map((col, _) =>
                  col?.field == "actions" ? (
                    <Box
                      width={col?.width}
                      key={col?.field}
                      className="p-2 text-center"
                    >
                      {col?.renderCell(row)}
                    </Box>
                  ) : (
                    <Box
                      width={col?.width}
                      className=" p-2 text-center"
                      key={col?.field}
                    >
                      {col?.transformFunction
                        ? col?.transformFunction(row[col.field])
                        : row[col.field]}
                    </Box>
                  ),
                )}
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export { SimpleDataGrid };
