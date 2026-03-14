import { CardComponent } from "@/app/components/shared/CardComponent";
import { productType } from "@/app/schemas";
import { Box } from "@mui/material";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const categoryRes = await fetch(
    `${process.env.BACKEND_URL}/category_by_slug/search?q=${decodedSlug}`,
  );
  const category = await categoryRes.json();
  const productsRes = await fetch(
    `${process.env.BACKEND_URL}/products_in_category/${category?.id}`,
  );
  const products: productType[] = await productsRes.json();
  return (
    <Box className="mt-36 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 place-items-center">
      {products.map((p) => (
        <CardComponent<productType> key={p?.id} item={p} />
      ))}
    </Box>
  );
};
export default page;
