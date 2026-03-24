import { invoiceType, personType } from "@/app/schemas";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns-jalali";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const invoiceRes = await fetch(`${process.env.BACKEND_URL}/invoices/${id}`);
  const invoice: invoiceType = await invoiceRes?.json();
  const personRes = await fetch(
    `${process.env.BACKEND_URL}/persons/${invoice?.personId}`,
  );
  const person: personType = await personRes.json();
  const formattedDate = format(new Date(invoice?.date || ""), "yyyy/MM/dd");

  const FormatNumber = (value: string) =>
    value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <Box>
      <Box className="h-[calc(100vh-5rem)] border-2 border-solid w-[calc(100vw-2rem)] max-w-[14cm]  max-h-[20cm] mx-auto mt-5">
        <Box id="invoice-header" className="w-full">
          <Box id="invoice-titles">
            <Box className="text-3xl font-extrabold mt-5 text-center">
              کارآپشن
            </Box>
            <Box className="text-xl mt-2 text-center">
              {invoice?.type == "SELL" ? (
                <Box>فاکتور خرید</Box>
              ) : (
                <Box>فاکتور فروش</Box>
              )}
            </Box>
          </Box>
          <Box className="flex gap-1 justify-end items-center px-2">
            <Box>تاریخ:</Box>
            <Box className="">{formattedDate}</Box>
          </Box>
          <Box
            component="fieldset"
            sx={{
              border: "1px solid",
              borderRadius: 2,
              mx: 2,
              p: 1,
            }}
          >
            <Box
              component="legend"
              sx={{
                px: 1,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              اطلاعات مشتری
            </Box>
            <Box className="grid grid-cols-2">
              <Box className="flex gap-2">
                <Typography>نام مشتری:</Typography>
                <Typography>
                  {person?.name} {person?.firstName}
                </Typography>
              </Box>
              <Box className="flex gap-2">
                <Typography>شماره تماس:</Typography>
                <Typography>{person?.phoneNumber}</Typography>
              </Box>
            </Box>
            <Box className="flex gap-2">
              <Typography>آدرس:</Typography>
              <Typography>{person?.address}</Typography>
            </Box>
          </Box>
        </Box>
        <Box className="mx-4 mt-4" id="rows">
          <Box
            id="headers"
            className="flex flex-row border border-solid w-full"
          >
            <Box className="w-9">ردیف</Box>
            <Box className="w-32 border-r text-center">نام کالا</Box>
            <Box className="w-10 border-r text-center">تعداد</Box>
            <Box className="w-16 border-r text-center">فی</Box>
            <Box className="w-20 border-r text-center">تعداد*فی</Box>
            <Box className="w-12 border-r text-center">تخفیف</Box>
            <Box className="border-r text-center w-24">کل</Box>
          </Box>
          <Box id="rows" className=" border border-solid border-t-0 w-full">
            {invoice?.items?.map((item, index) => {
              console.log(item);
              return (
                <Box
                  key={item?.productId}
                  className="flex border-b text-center last:border-0"
                >
                  <Box className="w-9">{index + 1}</Box>
                  <Box className="w-32 border-r text-center">
                    {item?.productName}
                  </Box>
                  <Box className="w-10 border-r text-center">{item?.count}</Box>
                  <Box className="w-16 border-r text-center">
                    {FormatNumber(item?.price || "")}
                  </Box>
                  <Box className="w-20 border-r text-center">
                    {FormatNumber(
                      (
                        Number(item?.price?.replaceAll(",", "")) *
                        Number(item?.count?.replaceAll(",", ""))
                      ).toString(),
                    )}
                  </Box>
                  <Box className="w-12 border-r text-center">
                    {item?.discount || "0"}
                  </Box>
                  <Box className="border-r text-center w-24">کل</Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box id="invoice-footer"></Box>
      </Box>
    </Box>
  );
};
export default page;
