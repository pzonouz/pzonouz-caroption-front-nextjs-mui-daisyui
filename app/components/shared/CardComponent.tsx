import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
interface BaseItem {
  id?: string | null | undefined;
  imageUrl?: string | null | undefined;
  name: string | null | undefined;
  description?: string | null | undefined;
  slug?: string | null | undefined;
}
interface Props<T extends BaseItem> {
  item: T;
}

export const CardComponent = <T extends BaseItem>(props: Props<T>) => {
  const { item } = props;
  return (
    <Link href={`/products/${item?.slug}`}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt={item?.name}
          height="140"
          image={`${process.env.BASE_URL}/${item?.imageUrl}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {item?.description}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          {/* <IconButton aria-label="share"> */}
          {/*   <ShareIcon /> */}
          {/* </IconButton> */}
        </CardActions>
      </Card>
    </Link>
  );
};
