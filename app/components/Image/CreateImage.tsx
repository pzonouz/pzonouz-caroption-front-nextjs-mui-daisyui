import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ImageShow } from "./ImageShow";
import { imageType } from "@/app/schemas";
import { useCreateImageMutation } from "@/app/lib/api";
import { translateErrors } from "@/app/lib/errorProcess";
import { useSnackbarOpen } from "@/app/lib/CustomHooks/useSnackbarOpen";

const CreateImage = ({ open }: { open: boolean }) => {
  const [image, setImage] = useState<imageType>({
    name: "",
    imageUrl: "",
  });
  const [file, setFile] = useState<File | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [createImage, { isLoading }] = useCreateImageMutation();
  const uploadFile = (file: File) => {
    const form = new FormData();
    form.append("file", file);
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload-file`, {
      method: "POST",
      body: form,
    })
      .then((res) => res.text())
      .then((res) => {
        setLoading(false);
        setImage({
          name: "",
          imageUrl: `media/${res}`,
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    if (file) {
      uploadFile(file);
    }
  }, [file]);

  const snackbarOpen = useSnackbarOpen();
  return (
    open && (
      <div className="p-2 mb-6">
        <Button loading={loading} variant="contained" component="label">
          آپلود
          <input
            type="file"
            hidden
            onChange={(e) => {
              setFile(e?.target?.files?.[0]);
            }}
          />
        </Button>
        {image?.imageUrl && (
          <div className="w-1/2">
            <ImageShow image={image} />
          </div>
        )}

        <Box className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
          <TextField
            name="name"
            variant="outlined"
            size="small"
            label="نام تصویر"
            value={image?.name}
            onChange={(e) => {
              setImage((prev) => {
                if (prev) {
                  return { ...prev, name: e.currentTarget?.value };
                } else {
                  return { name: "", imageUrl: "" };
                }
              });
            }}
          />
          <Button
            loading={isLoading}
            onClick={() => {
              createImage(image)
                .unwrap()
                .then(() => {
                  setFile(null);
                  setImage({ name: "", imageUrl: "" });
                  snackbarOpen({ status: "success" });
                })
                .catch((err) => {
                  snackbarOpen({
                    status: "success",
                    message: translateErrors(err),
                  });
                });
            }}
            variant="contained"
            size="small"
          >
            اضافه کردن
          </Button>
        </Box>
      </div>
    )
  );
};
export { CreateImage };
