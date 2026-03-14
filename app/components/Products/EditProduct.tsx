"use client";
import { ProductForm } from "./ProductForm";
import { useGetProductQuery } from "@/app/lib/api";
import { setModalId, setModalOpen } from "@/app/lib/features/modals";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { Modal } from "@mui/material";
import { InsideModal } from "../Surface/ModalInside";

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
        dispatch(setModalId(""));
      }}
    >
      <InsideModal>
        <ProductForm product={product} />
      </InsideModal>
    </Modal>
  );
};
