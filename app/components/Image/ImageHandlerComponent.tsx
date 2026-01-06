import { IconButton, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { UseFormSetValue, FieldPath, FieldValues } from "react-hook-form";
import { imageType } from "@/app/schemas";
import { useDeleteImageMutation, useGetimagesQuery } from "@/app/lib/api";

type ImageHandlerProps<TForm extends FieldValues> = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  image: imageType | null;
  setImage: (img: imageType | null) => void; // ⭐ FIXED
  setValue: UseFormSetValue<TForm>;
  field: FieldPath<TForm>;
  classNames?: string;
};
// ⭐ Lambda + Generic + Correct Constraint
export const ImageHandlerComponent = <TForm extends FieldValues>({
  open,
  setOpen,
  image,
  setValue,
  field,
  classNames = "",
}: ImageHandlerProps<TForm>) => {
  const { data: images } = useGetimagesQuery();
  const [deleteImage] = useDeleteImageMutation();

  const handleSelectImage = (img: imageType) => {
    setValue(field, img.id as any);
    // @ts-ignore
    setValue("imageUrl" as any, img.imageUrl);
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div
        className={`${classNames} p-3 m-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 bg-white place-items-center h-screen overflow-y-scroll`}
      >
        {(images ?? []).map((item) => (
          <div
            key={item.id}
            className="relative cursor-pointer"
            onClick={() => handleSelectImage(item)}
          >
            <div className="absolute right-0 top-0">
              <IconButton
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteImage({ id: item.id });
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>

            <img
              className={`${
                image?.id === item.id
                  ? "border-4 border-green-500"
                  : "border-2 border-slate-300"
              } border-solid w-64 aspect-square`}
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.imageUrl}`}
              alt={item.name}
              loading="lazy"
            />

            <div
              className={`${
                image?.id === item.id
                  ? "border-4 border-green-500"
                  : "border-2 border-slate-300"
              } border-solid border-t-0 text-center`}
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
