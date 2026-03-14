"use server";

import { Box } from "@mui/material";
import { Blocks } from "../components/shared/Blocks";

const page = async () => {
  const parentCategoriesRes = await fetch(
    `${process.env.BACKEND_URL}/parent_categories`,
  );
  const parentCategories = await parentCategoriesRes.json();
  return (
    <Box>
      <Blocks categories={parentCategories} />
    </Box>
  );
};
export default page;
