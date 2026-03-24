"use client";
import { useGetPersonQuery } from "@/app/lib/api";
import { setModalOpen } from "@/app/lib/features/modals";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { Modal } from "@mui/material";
import { InsideModal } from "../Surface/ModalInside";
import { PersonForm } from "./PersonForm";

export const EditPerson = () => {
  const id = useAppSelector((state) => state?.modal?.id);
  const open = useAppSelector((state) => state?.modal?.open);
  const type = useAppSelector((state) => state?.modal?.type);
  const dispatch = useAppDispatch();
  const { data: person } = useGetPersonQuery(id);
  return (
    <Modal
      open={Boolean(open) && type == "Edit"}
      component="div"
      onClose={() => {
        dispatch(setModalOpen(false));
      }}
    >
      <InsideModal>
        <PersonForm person={person} />
      </InsideModal>
    </Modal>
  );
};
