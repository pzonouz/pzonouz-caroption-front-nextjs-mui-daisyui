"use client";
import { useDeleteCategoryMutation } from "@/app/lib/api";
import { setModalOpen, setModalType } from "@/app/lib/features/modals";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { Box, Button, Modal, Typography } from "@mui/material";
import {
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
} from "@/app/lib/features/snackbar";

export const DeleteCategory = () => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const id = useAppSelector((state) => state?.modal?.id);
  const open = useAppSelector((state) => state?.modal?.open);
  const type = useAppSelector((state) => state?.modal?.type);
  const dispatch = useAppDispatch();
  return (
    <Modal
      open={Boolean(open) && type == "Delete"}
      component="div"
      onClose={() => {
        dispatch(setModalOpen(false));
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6"
      >
        <Typography className="text-lg font-semibold">آیا پاک شود؟</Typography>
        <Box className="flex flex-row items-center justify-between mt-10 mx-10">
          <Button
            onClick={() => {
              deleteCategory({ id: id }).then(() => {
                dispatch(setModalOpen(false));
                dispatch(setSnackbarOpen(true));
                dispatch(setSnackbarSeverity("success"));
                dispatch(setSnackbarMessage("با موفقیت انجام شد"));
              });
            }}
            variant="contained"
            color="error"
          >
            بله
          </Button>
          <Button
            onClick={() => {
              dispatch(setModalOpen(false));
            }}
            variant="contained"
            color="info"
          >
            خیر
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
