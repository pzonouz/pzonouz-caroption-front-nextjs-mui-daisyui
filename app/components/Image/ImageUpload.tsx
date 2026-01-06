import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const ImageUploadComponent = ({
  setFileName,
}: {
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [file, setFile] = useState<File | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
        setFileName(res);
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
  return (
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
  );
};
export { ImageUploadComponent };
