import { Box } from "@mui/material";

export const InsideModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-[30rem] overflow-y-scroll "
    >
      {children}
    </Box>
  );
};
