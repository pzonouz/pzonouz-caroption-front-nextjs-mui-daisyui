import { AppBar, Toolbar } from "@mui/material";
import MainMenu from "../components/Navigation/MainMenu";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MainMenu />
      {children}
    </div>
  );
};

export default layout;
