"use client";
import { ProductForm } from "./ProductForm";
import { useGetProductQuery } from "@/app/lib/api";
import { setModalOpen } from "@/app/lib/features/modals";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { Box, Modal } from "@mui/material";

export const EditProduct = () => {
  const id = useAppSelector((state) => state?.modal?.id);
  const open = useAppSelector((state) => state?.modal?.open);
  const type = useAppSelector((state) => state?.modal?.type);
  const dispatch = useAppDispatch();
  const { data: product } = useGetProductQuery(id);
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
        <ProductForm product={product} />
      </Box>
    </Modal>
  );
};
