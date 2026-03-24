"use client";
import { useGetInvoiceQuery } from "@/app/lib/api";
import { setModalOpen } from "@/app/lib/features/modals";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { Modal } from "@mui/material";
import { InsideModal } from "../Surface/ModalInside";
import { InvoiceForm } from "./InvoiceForm";

export const EditInvoice = () => {
  const id = useAppSelector((state) => state?.modal?.id);
  const open = useAppSelector((state) => state?.modal?.open);
  const type = useAppSelector((state) => state?.modal?.type);
  const dispatch = useAppDispatch();
  const { data: invoice } = useGetInvoiceQuery(id, { skip: !id });
  return (
    <Modal
      open={Boolean(open) && type == "Edit"}
      component="div"
      onClose={() => {
        dispatch(setModalOpen(false));
      }}
    >
      <InsideModal>
        <InvoiceForm type={invoice?.type || "SELL"} invoice={invoice} />
      </InsideModal>
    </Modal>
  );
};
