"use client";
import { setModalOpen } from "@/app/lib/features/modals";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { Box, Modal } from "@mui/material";
import { ParameterGroupForm } from "./ParameterGroupForm";
import { useGetParameterGroupQuery } from "@/app/lib/api";
import { InsideModal } from "../Surface/ModalInside";

export const EditParameterGroup = () => {
  const id = useAppSelector((state) => state?.modal?.id);
  const open = useAppSelector((state) => state?.modal?.open);
  const type = useAppSelector((state) => state?.modal?.type);
  const { data: parameterGroup } = useGetParameterGroupQuery(id);
  const dispatch = useAppDispatch();
  return (
    <Modal
      open={Boolean(open) && type == "Edit"}
      component="div"
      onClose={() => {
        dispatch(setModalOpen(false));
      }}
    >
      <InsideModal>
        <ParameterGroupForm parameterGroup={parameterGroup} />
      </InsideModal>
    </Modal>
  );
};
