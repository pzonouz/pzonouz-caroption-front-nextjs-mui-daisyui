"use client";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, categoryType } from "@/app/schemas";
import React, { ChangeEvent, useEffect } from "react";

export const CreateCategory = () => {
  const {
    watch,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<categoryType>({ resolver: zodResolver(categorySchema) });
  const createCategoryHandler = (data: categoryType) => {
    console.log(data);
    const parsed = categorySchema.safeParse(data);
  };
  const show = watch("show");
  const updateShow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("show", e.target.checked);
  };
  return (
    <Box
      className="flex flex-col gap-2"
      component="form"
      onSubmit={handleSubmit(createCategoryHandler)}
    >
      <Box className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        <TextField
          {...register("name")}
          label="نام"
          error={!!errors?.name}
          size="small"
          helperText={errors?.name?.message}
        />
        <TextField
          {...register("description")}
          label="توضیح"
          error={!!errors?.description}
          size="small"
        />
        <TextField
          {...register("priority")}
          label="اولویت"
          error={!!errors?.priority}
          size="small"
        />
        <FormControlLabel
          control={<Switch value={show} onChange={updateShow} />}
          label="نمایش"
        />
      </Box>
      <Button
        component="button"
        type="submit"
        variant="contained"
        className="min-w-sm max-w-md w-full "
      >
        ثبت
      </Button>
    </Box>
  );
};
