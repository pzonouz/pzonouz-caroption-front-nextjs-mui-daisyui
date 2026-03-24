import { InvoiceForm } from "./InvoiceForm";

export const CreateInvoice = ({ type }: { type: "SELL" | "BUY" }) => {
  return <InvoiceForm type={type} />;
};
