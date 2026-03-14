import { imageType } from "@/app/schemas";
import { Box } from "@mui/material";

const ImageShow = ({ image }: { image: imageType | null }) => {
  return (
    <Box>
      {image && (
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${image?.imageUrl}`}
          loading="lazy"
          className="w-56"
        />
      )}
    </Box>
  );
};
export { ImageShow };
