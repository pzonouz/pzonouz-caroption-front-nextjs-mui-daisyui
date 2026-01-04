"use client";
import { CategoryForm } from "./CategoryForm";
import { useGetCategoryQuery } from "@/app/lib/api";
import { setModalOpen } from "@/app/lib/features/modals";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { Box, Modal } from "@mui/material";

export const EditCategory = () => {
  const id = useAppSelector((state) => state?.modal?.id);
  const open = useAppSelector((state) => state?.modal?.open);
  const type = useAppSelector((state) => state?.modal?.type);
  const dispatch = useAppDispatch();
  const { data: category } = useGetCategoryQuery(id);
  return (
    <Modal
      open={Boolean(open) && type == "Edit"}
      component="div"
      onClose={() => {
        dispatch(setModalOpen(false));
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 "
      >
        <CategoryForm category={category} />
      </Box>
    </Modal>
  );
};
