import {
  Box,
  Button,
  IconButton,
  NativeSelect,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { FilterOperand } from "@/app/schemas";
import Delete from "@mui/icons-material/Delete";
import {
  ConditionToEnglish,
  ConditionToPersian,
  FormatNumber,
  FormatNumbersInsideText,
  OperandToPesian,
  ToEnglishDigits,
} from "@/app/utils";

export const Filter = <T extends { name: string }>({
  fieldsMap,
  filters,
  setFilters,
}: {
  fieldsMap: T;
  filters:
    | { field: keyof T; operand: FilterOperand; condition: string }[]
    | undefined;
  setFilters: React.Dispatch<
    React.SetStateAction<
      { field: keyof T; operand: FilterOperand; condition: string }[]
    >
  >;
}) => {
  const [field, setField] = useState<keyof T>("name");
  const [operand, setOperand] = useState<FilterOperand>("contains");
  const [condition, setCondition] = useState("");
  return (
    <Box className="">
      <Box className="flex flex-row items-center px-2 gap-2">
        <NativeSelect
          value={field}
          onChange={(e) => {
            setField(e.currentTarget.value as keyof T);
          }}
        >
          {Object.keys(fieldsMap)?.map((item) => (
            <option key={item} value={item}>
              {fieldsMap[item as keyof T] as string}
            </option>
          ))}
        </NativeSelect>
        <NativeSelect
          value={operand}
          onChange={(e) => {
            setOperand(e.currentTarget.value as FilterOperand);
          }}
        >
          <option value="contains">شامل</option>
          <option value="=">مساوی</option>
          <option value="<">کوچکتراز </option>
          <option value="<=">کوچکترمساوی</option>
          <option value=">">بزرگتراز</option>
          <option value=">=">بزرگترمساوی</option>
        </NativeSelect>
        <TextField
          value={condition}
          onChange={(e) =>
            setCondition(
              FormatNumbersInsideText(ToEnglishDigits(e.target.value)),
            )
          }
          variant="standard"
        />
        <Button
          className="min-w-24"
          variant="contained"
          onClick={() => {
            if (
              filters?.find(
                (f) => f.condition == condition && f.operand == operand,
              )
            )
              return;
            setFilters((prev) => [
              ...prev,
              {
                field: field,
                operand: operand,
                condition: ConditionToEnglish(condition).toString() ?? "",
              },
            ]);
          }}
        >
          اضافه کردن
        </Button>
      </Box>
      <Box className="p-2">
        {filters?.map((item) => (
          <Box
            key={`${item?.condition} + ${item?.operand?.toString()}`}
            className="flex flex-row items-center"
          >
            <Box>{`${fieldsMap[item?.field] as string} ${OperandToPesian(item?.operand)} ${ConditionToPersian(item?.condition)}`}</Box>
            <IconButton
              color="error"
              onClick={() => {
                setFilters(
                  filters?.filter(
                    (f) =>
                      f?.field.toString() + f?.operand + f?.condition !=
                      item?.field?.toString() + item?.operand + item?.condition,
                  ),
                );
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
