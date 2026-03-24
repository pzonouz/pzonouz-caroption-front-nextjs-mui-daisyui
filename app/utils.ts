"use client";
import {
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
} from "./lib/features/snackbar";
import { useAppDispatch } from "./lib/hooks";
import { invoiceItemType } from "./schemas";

export const Slugify = (str: string) =>
  str
    .toString()
    .trim()
    .toLowerCase()
    // .normalize("NFD")
    // .replace(/[\u0300-\u036f]/g, "")
    // .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(" ", "_");
export const SnackbarOpen = ({
  status,
  message,
}: {
  status: "success" | "error";
  message?: string;
}) => {
  const dispatch = useAppDispatch();
  dispatch(setSnackbarSeverity(status));
  if (message && status == "success") {
    dispatch(setSnackbarMessage("با موفقیت انجام شد"));
  }
  if (message && status == "error") {
    dispatch(setSnackbarMessage("با شسکت مواجه شد"));
  }
  dispatch(setSnackbarOpen(true));
};
export const NormalizeForFront = (inputObject: any, arrayFields?: string[]) => {
  if (!inputObject) return null;

  const entries = Object.entries(inputObject);
  const outputObject: any = {};

  entries.forEach(([key, value]) => {
    if (value == null) {
      // Check for null or undefined
      // If this is the specified array field, set to empty array
      if (arrayFields?.includes(key)) {
        outputObject[key] = [];
      } else {
        outputObject[key] = "";
      }
    } else {
      outputObject[key] = value; // Keep original value
    }
  });

  return outputObject;
};
export const NormalizeForBack = (inputObject: any) => {
  if (!inputObject) return null;
  const entiries = Object?.entries(inputObject);
  const outputObject: typeof inputObject = {};
  entiries?.map((_, index) => {
    outputObject[entiries[index]?.[0]] =
      entiries[index]?.[1] == "" ? null : entiries[index]?.[1];
  });
  return outputObject;
};
export const getInvoiceTotal = (rows: invoiceItemType[]) => {
  const total = rows?.reduce((acc, current) => {
    const price = Number(current?.price?.replaceAll(",", "")) || 0;
    const count = Number(current?.count?.replaceAll(",", "")) || 0;
    const discount = Number(current?.discount?.replaceAll(",", "")) || 0;
    const priceCountWithDiscount = price * count - discount;
    return acc + priceCountWithDiscount;
  }, 0);

  return FormatNumber(String(total));
};

export const FormatNumber = (value: string) =>
  value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const FormatNumbersInsideText = (value: string) => {
  // First, remove existing commas so we don't mess up the formatting
  const textWithoutCommas = value.replace(/,/g, "");

  // Find continuous blocks of digits and add commas to them
  return textWithoutCommas.replace(/\d+/g, (match) => {
    return match.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });
};
export const OperandToPesian = (operand: string) => {
  let output = "";
  switch (operand) {
    case "contains":
      output = "شامل";
      break;
    case "<":
      output = "کوچکتر از";
      break;
    case ">":
      output = "بزرگتر از";
      break;
    case "<=":
      output = "کوچکتر مساوی";
      break;
    case ">=":
      output = "بزرگترمساوی";
      break;
    case "=":
      output = "مساوی";
      break;
  }
  return output;
};
export const ConditionToEnglish = (condition: string) => {
  switch (condition) {
    case "بله":
      return true;
    case "خیر":
      return false;
    default:
      return condition;
  }
};
export const ConditionToPersian = (condition: string) => {
  switch (condition) {
    case "true":
      return "بله";
    case "false":
      return "خیر";
    default:
      return condition;
  }
};
export const ToEnglishDigits = (value: string) =>
  value.replace(/[۰-۹٠-٩]/g, (d) =>
    ("۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩".indexOf(d) % 10).toString(),
  );

export const PriceCount = (price: string, count: string): string => {
  return FormatNumber(
    (
      Number(count?.replaceAll(",", "")) * Number(price?.replaceAll(",", ""))
    ).toString(),
  );
};

export const Total = (discount: string, priceCount: string): string => {
  return FormatNumber(
    (
      Number(priceCount?.replaceAll(",", "")) -
      Number(discount?.replaceAll(",", ""))
    ).toString(),
  );
};
