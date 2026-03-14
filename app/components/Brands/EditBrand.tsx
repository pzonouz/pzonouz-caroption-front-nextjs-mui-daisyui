"use client";
import { BrandForm } from "./BrandForm";
import { useGetBrandQuery } from "@/app/lib/api";
import { setModalId, setModalOpen } from "@/app/lib/features/modals";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { Modal } from "@mui/material";
import { InsideModal } from "../Surface/ModalInside";

export const EditBrand = () => {
  const id = useAppSelector((state) => state?.modal?.id);
  const open = useAppSelector((state) => state?.modal?.open);
  const type = useAppSelector((state) => state?.modal?.type);
  const dispatch = useAppDispatch();
  const { data: brand } = useGetBrandQuery(id);
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
        <BrandForm brand={brand} />
      </InsideModal>
    </Modal>
  );
};
