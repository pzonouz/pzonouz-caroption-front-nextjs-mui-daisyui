import { Box, IconButton } from "@mui/material";
import React from "react";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import clsx from "clsx";

export const PaginationComponent = ({
  allCount,
  perPage,
  page,
  setPage,
}: {
  allCount: number;
  perPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const pagesArray = Array.from(
    {
      length: allCount % perPage ? allCount / perPage + 1 : allCount / perPage,
    },
    (_, i) => i + 1,
  );
  return (
    <Box
      className={clsx(
        "grid px-4",
        "grid-cols-10",
        "items-center",
        "justify-between m-3 w-full",
      )}
    >
      {pagesArray.length != 1 && (
        <IconButton
          disabled={page == 1}
          onClick={() => {
            setPage((prev) => prev - 1);
          }}
        >
          <ChevronRight />
        </IconButton>
      )}
      {pagesArray.map((p) => (
        <IconButton
          onClick={() => setPage(p)}
          key={p}
          className={clsx(
            p == page && "text-white bg-slate-500",
            " text-sm w-10",
          )}
        >
          {p}
        </IconButton>
      ))}
      {pagesArray?.length != 1 && (
        <IconButton
          disabled={page == pagesArray.length}
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          <ChevronLeft />
        </IconButton>
      )}
    </Box>
  );
};
