"use client";
import { setModalOpen } from "@/app/lib/features/modals";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { Box, Modal } from "@mui/material";
import { ParameterForm } from "./ParameterForm";
import { useGetParameterQuery } from "@/app/lib/api";
import { InsideModal } from "../Surface/ModalInside";

export const EditParameter = () => {
  const id = useAppSelector((state) => state?.modal?.id);
  const open = useAppSelector((state) => state?.modal?.open);
  const type = useAppSelector((state) => state?.modal?.type);
  const { data: parameter, isSuccess } = useGetParameterQuery(id);
  const dispatch = useAppDispatch();
  return (
    <Modal
      open={Boolean(open) && type == "Edit" && isSuccess}
      component="div"
      onClose={() => {
        dispatch(setModalOpen(false));
      }}
    >
      <InsideModal>
        <ParameterForm key={id} parameter={parameter} />
      </InsideModal>
    </Modal>
  );
};
