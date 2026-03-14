"use client";
import { CategoryForm } from "./CategoryForm";
import { useGetCategoryQuery } from "@/app/lib/api";
import { setModalOpen } from "@/app/lib/features/modals";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { Box, Modal } from "@mui/material";
import { InsideModal } from "../Surface/ModalInside";

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
      <InsideModal>
        <CategoryForm category={category} />
      </InsideModal>
    </Modal>
  );
};
