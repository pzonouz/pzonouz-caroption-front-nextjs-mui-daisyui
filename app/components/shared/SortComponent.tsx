import { Box } from "@mui/material";
import UpWard from "@mui/icons-material/ArrowUpward";
import DownWard from "@mui/icons-material/ArrowDownward";
import { GridColDef } from "@mui/x-data-grid";

const SortComponent = ({
  item,
  gridOptions,
}: {
  item: GridColDef;
  index: number;
  gridOptions: GridOptions | undefined;
}) => {
  const sortedField = gridOptions?.sort?.find((i) => i.name == item?.field);
  return (
    <Box>
      {sortedField?.direction == "ASC" && <UpWard />}
      {sortedField?.direction == "DSC" && <DownWard />}
    </Box>
  );
};
export { SortComponent };
