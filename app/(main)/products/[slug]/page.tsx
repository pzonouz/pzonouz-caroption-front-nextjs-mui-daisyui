import { productType } from "@/app/schemas";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const productRes = await fetch(
    `${process.env.BACKEND_URL}/product_by_slug/search?q=${decodedSlug}`,
  );
  const product: productType = await productRes.json();
  return (
    <Box>
      <Box className="mt-32 flex flex-col sm:flex-row w-[90%] sm:w-[95%] mx-auto items-center sm:items-start">
        <Image
          src={`${process.env.BASE_URL}/${product?.imageUrl}`}
          alt={product?.name}
          width={400}
          height={400}
        />
        <Box>
          <Typography className="sm:mt-10">{product?.name}</Typography>
        </Box>
      </Box>
      <Box className="w-[90%] mx-auto">
        {product?.parameters?.map((item) => {
          const ppv = product.productParameterValues.find(
            (pp) => pp.parameterId == item?.id,
          );
          return (
            <Box
              key={item?.id}
              className="flex flex-row border-solid border-slate-500 border-b-2 w-full justify-between my-4 items-center"
            >
              <Typography>{item?.name}</Typography>
              {item?.type == "SL" && (
                <Typography>{ppv?.selectableValue}</Typography>
              )}
              {item?.type == "BL" && (
                <Typography>{ppv?.boolValue ? "دارد" : "ندارد"}</Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default page;
