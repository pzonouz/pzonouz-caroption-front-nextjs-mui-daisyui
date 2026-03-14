import { categoryType } from "@/app/schemas";
import { Box, Link, Typography } from "@mui/material";
import Image from "next/image";

const Blocks = ({ categories }: { categories: categoryType[] }) => {
  return (
    categories && (
      <Box className="grid grid-cols-3 sm:grid-cols-4 sm:w-[90%] sm:mx-auto md:grid-cols-5 lg:grid-cols-6  mt-36 place-items-center gap-16 w-full">
        {categories?.map((c) => (
          <Link
            href={`${process.env.BASE_URL}/categories/${c?.slug}`}
            key={c.id}
            className="no-underline text-gray-800"
          >
            <Image
              src={`${process.env.BASE_URL}/${c.imageUrl}`}
              alt={c.name}
              width={100}
              height={100}
            />
            <Typography className="text-center">{c?.name}</Typography>
          </Link>
        ))}
      </Box>
    )
  );
};

export { Blocks };
