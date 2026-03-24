import { Box, Button, CircularProgress } from "@mui/material";
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
    <Box className="pb-5" width={widthSum}>
      <Button
        onClick={(e) => {
          e.preventDefault();
          window.print();
        }}
      >
        نسخه چاپی
      </Button>
      <List className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center print:hidden">
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
      <Box className="flex flex-row items-center print:border">
        {checkedColumns
          ?.sort((a, b) => a.order - b.order)
          ?.map((item) => (
            <Box
              width={item?.width}
              className={`bg-slate-600 text-white p-2 text-center flex flex-row items-center justify-center gap-2 print:border-l `}
              key={item?.headerName}
            >
              {item?.headerName}
            </Box>
          ))}
      </Box>
      <>
        {isLoading ? (
          <Box className=" h-36 grid place-items-center">
            <CircularProgress />
          </Box>
        ) : (
          rows?.map((row, rowIndex) => {
            return (
              <Box
                width={widthSum}
                key={row["name"] || row["id"]}
                className="flex flex-row items-stretch even:bg-slate-200 print:border-b"
              >
                {checkedColumns?.map((col) => (
                  <Box
                    key={col?.field}
                    width={col?.width}
                    minWidth={col?.width}
                    className="p-2 text-center print:border-l print:first:border-r"
                  >
                    {col?.renderCell
                      ? col.renderCell(row, rowIndex)
                      : col?.transformFunction
                        ? col.transformFunction(row[col.field])
                        : row[col.field]}
                  </Box>
                ))}
              </Box>
            );
          })
        )}
      </>
    </Box>
  );
};

export { SimpleDataGrid };
